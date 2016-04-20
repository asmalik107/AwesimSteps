//
//  ASHealthKit.swift
//  AwesimSteps
//
//  Created by ASIM MALIK on 04/04/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

import Foundation
import HealthKit


@objc(RNHealthKit)
class RNHealthKit: NSObject {
  
  var bridge: RCTBridge!
  let healthKitStore:HKHealthStore = HKHealthStore()
  
  @objc func authorize(callback:RCTResponseSenderBlock) {
    checkAuthorization(){ authorized, error in
    //  NSLog(authorized ? "Authorized: Yes" : "Authorized: No");
      callback([NSNull(), authorized]);
    }
  }
  
  
  @objc func getSteps(startDate:NSDate, endDate:NSDate, callback:RCTResponseSenderBlock) {
    recentSteps(startDate, endDate: endDate) { steps, error in
      //NSLog("retrieved steps");
      callback([NSNull(), steps]);
    }
  }
  
  @objc func getWeeklySteps(startDate:NSDate, endDate:NSDate, anchorDate:NSDate, callback:RCTResponseSenderBlock){
    weeklySteps(startDate, endDate: endDate, anchorDate: anchorDate) { steps, error in
      //NSLog("retrieved weeklysteps");
      callback([NSNull(), steps]);
    }
  }
  
  func checkAuthorization(completion: (Bool, NSError?) -> ()) {
    
    if HKHealthStore.isHealthDataAvailable()
    {
      
      let steps = Set(arrayLiteral:
        HKObjectType.characteristicTypeForIdentifier(HKCharacteristicTypeIdentifierDateOfBirth)!,
                      HKObjectType.quantityTypeForIdentifier(HKQuantityTypeIdentifierStepCount)!
      )

      healthKitStore.requestAuthorizationToShareTypes(nil, readTypes: steps) { (success, error) -> Void in
        var isEnabled = false
        
        if success  {
          isEnabled = success
        }
        completion(isEnabled, error);
      }
    }
    
    //return isEnabled
  }
  
  func recentSteps(startDate:NSDate, endDate:NSDate, completion: (Double, NSError?) -> () )
  {
    let type = HKSampleType.quantityTypeForIdentifier(HKQuantityTypeIdentifierStepCount)
    let predicate = HKQuery.predicateForSamplesWithStartDate(startDate, endDate: endDate, options: .None)
    
    let query = HKSampleQuery(sampleType: type!, predicate: predicate, limit: 0, sortDescriptors: nil, resultsHandler: { query, results, error in
      var steps: Double = 0
      
      if results?.count > 0 {
        for s in results as! [HKQuantitySample]
        {
          steps += s.quantity.doubleValueForUnit(HKUnit.countUnit())
          print(steps)
          print(s)
        }
      }
      completion(steps, error)
    })
    
    healthKitStore.executeQuery(query)
  }
  
  
  func weeklySteps(startDate:NSDate, endDate:NSDate, anchorDate:NSDate, completion: (Array<NSObject>, NSError?) -> ()) {
    let type = HKSampleType.quantityTypeForIdentifier(HKQuantityTypeIdentifierStepCount)
    let interval = NSDateComponents()
    interval.day = 1
    
    let predicate = HKQuery.predicateForSamplesWithStartDate(startDate, endDate: endDate, options: .StrictStartDate)
    
    let query = HKStatisticsCollectionQuery(quantityType: type!, quantitySamplePredicate: predicate, options: [.CumulativeSum], anchorDate: anchorDate, intervalComponents:interval)
    
    
    query.initialResultsHandler = { query, results, error in
      if let myResults = results{
        var stepsArray: [NSObject] = []
        let formatter = NSDateFormatter()
        formatter.dateFormat = "EEE"
        myResults.enumerateStatisticsFromDate(startDate, toDate: endDate) {
          statistics, stop in
          
          
          if let quantity = statistics.sumQuantity() {
            
            let date = statistics.startDate
            let steps = quantity.doubleValueForUnit(HKUnit.countUnit())
            print("\(date): steps = \(steps)")
            
            let ret =  [
              "steps": steps,
              "startDate" : date.timeIntervalSince1970,
              "endDate": statistics.endDate.timeIntervalSince1970,
              "day": formatter.stringFromDate(date)
            ]
            
            //stepsArray.append(steps);
            stepsArray.append(ret)
          }
          
        }
        
        completion(stepsArray, error)
      }
    }
    
    healthKitStore.executeQuery(query)
  }
  
  
  
  @objc func observeSteps() {
    let sampleType = HKObjectType.quantityTypeForIdentifier(HKQuantityTypeIdentifierStepCount)
    
    let query = HKObserverQuery(sampleType: sampleType!, predicate: nil) {
      query, completionHandler, error in
      
      if error != nil {
        
        // Perform Proper Error Handling Here...
        //print("*** An error occured while setting up the stepCount observer. \(error!.localizedDescription) ***")
        abort()
      } else {
       // NSLog("Observed Steps")
        // If you have subscribed for background updates you must call the completion handler here.
        // completionHandler();
        let startDate = self.beginningOfDay()
        let endDate = NSDate()
        
        self.recentSteps(startDate, endDate: endDate) { steps, error in
          //NSLog("Observed steps changed");
          
          self.bridge.eventDispatcher.sendAppEventWithName("StepChangedEvent", body: steps)
        }
      }
      
    }
    
    healthKitStore.executeQuery(query)
  }
  
  
  func beginningOfDay() -> NSDate {
    let calendar = NSCalendar.currentCalendar()
    let components = calendar.components([.Year, .Month, .Day], fromDate: NSDate())
    return calendar.dateFromComponents(components)!
  }
  
  
  
  
  
}