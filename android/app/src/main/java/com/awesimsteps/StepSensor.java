package com.awesimsteps;


import android.app.Activity;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.support.annotation.Nullable;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class StepSensor implements SensorEventListener {

    private Activity activity;
    private ReactContext mReactContext;
    private android.hardware.SensorManager mSensorManager;
    private Sensor mStepCounter;
    private long lastUpdate = 0;
    private int delay;

    public StepSensor(ReactContext reactContext, Activity activity) {
        this.mReactContext = reactContext;
        this.activity = activity;


        mSensorManager = (android.hardware.SensorManager)reactContext.getSystemService(reactContext.SENSOR_SERVICE);
    }

    public int start(int delay) {
        this.delay = delay;
        if ((mStepCounter = mSensorManager.getDefaultSensor(Sensor.TYPE_STEP_COUNTER)) != null) {
            mSensorManager.registerListener(this, mStepCounter, android.hardware.SensorManager.SENSOR_DELAY_FASTEST);
            return (1);
        }
        return (0);
    }


    @Override
    public void onSensorChanged(SensorEvent sensorEvent) {
        Sensor mySensor = sensorEvent.sensor;



        if (mySensor.getType() == Sensor.TYPE_STEP_COUNTER) {
            WritableMap map = Arguments.createMap();

            long curTime = System.currentTimeMillis();
            //i++;
            if ((curTime - lastUpdate) > delay) {
                final Object o = sensorEvent.values[0];
                Log.i("History", "Data point:" + sensorEvent.values[0]);

                map.putDouble("steps", sensorEvent.values[0]);
                sendEvent(this.mReactContext, "StepSensorChangedEvent", map);

                activity.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        Toast.makeText(mReactContext.getApplicationContext(), "" + o, Toast.LENGTH_SHORT).show();
                    }
                });
                lastUpdate = curTime;
            }
        }
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {

    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

}
