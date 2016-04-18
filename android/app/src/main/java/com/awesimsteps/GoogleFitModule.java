package com.awesimsteps;

import android.app.Activity;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


public class GoogleFitModule extends ReactContextBaseJavaModule {

    private static final String REACT_MODULE = "RNGoogleFit";
    private ReactContext mReactContext;
    private GoogleFitManager googleFitManager;
    private Activity activity;

    public GoogleFitModule(ReactApplicationContext reactContext, Activity activity) {
        super(reactContext);

        this.mReactContext = reactContext;
        this.activity = activity;
    }


    @Override
    public String getName() {
        return REACT_MODULE;
    }

    @ReactMethod
    public void authorize() {
        if(googleFitManager == null) {
            googleFitManager = new GoogleFitManager(mReactContext, activity);
        }

        googleFitManager.authorize();
    }

    @ReactMethod
    public void observeSteps() {
        googleFitManager.getStepCounter().findFitnessDataSources();
    }

    @ReactMethod
    public void getWeeklySteps(double startDate, double endDate) {
        googleFitManager.getStepHistory().displayLastWeeksData((long)startDate, (long)endDate);
    }





}
