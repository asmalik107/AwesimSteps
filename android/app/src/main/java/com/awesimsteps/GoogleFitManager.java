package com.awesimsteps;

import android.app.Activity;
import android.content.Intent;
import android.content.IntentSender;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.util.Log;


import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.ReactContext;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.Scopes;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.common.api.ResultCallback;
import com.google.android.gms.common.api.Scope;
import com.google.android.gms.common.api.Status;
import com.google.android.gms.fitness.Fitness;


public class GoogleFitManager implements
        GoogleApiClient.ConnectionCallbacks,
        GoogleApiClient.OnConnectionFailedListener,
        ActivityEventListener {

    private ReactContext mReactContext;
    private GoogleApiClient mApiClient;
    private static final int REQUEST_OAUTH = 1;
    private static final String AUTH_PENDING = "auth_state_pending";
    private boolean authInProgress = false;
    private Activity activity;


    private StepHistory stepHistory;
    private StepCounter stepCounter;
    private StepSensor stepSensor;

    private static final String TAG = "GoogleFitManager";

    public GoogleFitManager(ReactContext reactContext, Activity activity) {

        Log.i(TAG, "Initializing GoogleFitManager" + authInProgress);
        this.mReactContext = reactContext;
        this.activity = activity;


        mReactContext.addActivityEventListener(this);


        this.stepCounter = new StepCounter(mReactContext, this, activity);
        this.stepHistory = new StepHistory(mReactContext, this);

        this.stepSensor = new StepSensor(mReactContext, activity);

        this.stepSensor.start(3);

    }

    public GoogleApiClient getGoogleApiClient() {
        return mApiClient;
    }

    public StepCounter getStepCounter() {
        return stepCounter;
    }

    public StepHistory getStepHistory() {
        return stepHistory;
    }


    public void authorize() {

        Log.i(TAG, "Authorizing");
        mApiClient = new GoogleApiClient.Builder(mReactContext.getApplicationContext())
                .addApi(Fitness.SENSORS_API)
                .addApi(Fitness.HISTORY_API)
                .addScope(new Scope(Scopes.FITNESS_ACTIVITY_READ))
                .addScope(new Scope(Scopes.FITNESS_BODY_READ_WRITE))
                .addConnectionCallbacks(this)
                .addOnConnectionFailedListener(this)
                .build();

        mApiClient.connect();
    }


    @Override
    public void onConnected(@Nullable Bundle bundle) {
        Log.i(TAG, "Connected");

        stepCounter.findFitnessDataSources();
    }


    @Override
    public void onConnectionSuspended(int i) {
        Log.i("AuthorizationMgr", "Connection Suspended");
    }

    @Override
    public void onConnectionFailed(@NonNull ConnectionResult connectionResult) {
        Log.i(TAG, "Failed AuthorizationMgr:" + connectionResult);
        if (!authInProgress) {
            try {
                authInProgress = true;
                connectionResult.startResolutionForResult(activity, REQUEST_OAUTH);
            } catch (IntentSender.SendIntentException e) {

            }
        } else {
            Log.i(TAG, "authInProgress");
        }

    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        Log.i(TAG, "onActivityResult" + requestCode);
        if (requestCode == REQUEST_OAUTH) {
            authInProgress = false;
            if (resultCode == Activity.RESULT_OK) {
                if (!mApiClient.isConnecting() && !mApiClient.isConnected()) {
                    mApiClient.connect();
                }
            } else if (resultCode == Activity.RESULT_CANCELED) {
                Log.e(TAG, "RESULT_CANCELED");
            }
        } else {
            Log.e(TAG, "requestCode NOT request_oauth");
        }

    }


    protected void stop() {
        Fitness.SensorsApi.remove(mApiClient, stepCounter)
                .setResultCallback(new ResultCallback<Status>() {
                    @Override
                    public void onResult(Status status) {
                        if (status.isSuccess()) {
                            mApiClient.disconnect();
                        }
                    }
                });
    }


}
