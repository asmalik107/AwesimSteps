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
  
  let healthKitStore:HKHealthStore = HKHealthStore()
  
  
  /*  let a = 3;
   @objc func addEvent(name: String, location: String, date: NSNumber) -> Void {
   // Date is ready to use!
   }
   
   @objc func add(x:NSNumber, y:NSNumber, callback:RCTResponseSenderBlock)->Void{
   x.intValue+y.intValue;
   
   NSLog("stuff");
  
   
   callback([a]);
   }
   */
  
  @objc func authorize(callback:RCTResponseSenderBlock) -> Void {
    let authorized = checkAuthorization();
    
    NSLog(authorized ? "Yes" : "No");
    
    callback([NSNull(), authorized]);
  }
  
  
  @objc func getSteps(startDate:NSDate, endDate:NSDate, callback:RCTResponseSenderBlock) -> Void {
    recentSteps(startDate, endDate: endDate) { steps, error in
      NSLog("steps");
      callback([NSNull(), steps]);
    }
  }
  
  @objc func getWeeklySteps(startDate:NSDate, endDate:NSDate, anchorDate:NSDate, callback:RCTResponseSenderBlock) -> Void {
    weeklySteps(startDate, endDate: endDate, anchorDate: anchorDate) { steps, error in
      NSLog("weeklysteps");
      callback([NSNull(), steps]);
    }
  }
  
  func checkAuthorization() -> Bool {
    var isEnabled = true
    
    if HKHealthStore.isHealthDataAvailable()
    {
      
      let steps = Set(arrayLiteral:
        HKObjectType.characteristicTypeForIdentifier(HKCharacteristicTypeIdentifierDateOfBirth)!,
                      HKObjectType.quantityTypeForIdentifier(HKQuantityTypeIdentifierStepCount)!
      )

      healthKitStore.requestAuthorizationToShareTypes(nil, readTypes: steps) { (success, error) -> Void in
        isEnabled = success
      }
    } else {
      isEnabled = false;
    }
    
    return isEnabled
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
  
  
  func weeklySteps(startDate:NSDate, endDate:NSDate, anchorDate:NSDate, completion: (Array<Double>, NSError?) -> ()) {
    let type = HKSampleType.quantityTypeForIdentifier(HKQuantityTypeIdentifierStepCount)
    let interval = NSDateComponents()
    interval.day = 1
    
    let predicate = HKQuery.predicateForSamplesWithStartDate(startDate, endDate: endDate, options: .StrictStartDate)
    
    let query = HKStatisticsCollectionQuery(quantityType: type!, quantitySamplePredicate: predicate, options: [.CumulativeSum], anchorDate: anchorDate, intervalComponents:interval)
    
    
    query.initialResultsHandler = { query, results, error in
      if let myResults = results{
        var stepsArray: [Double] = []
        myResults.enumerateStatisticsFromDate(startDate, toDate: endDate) {
          statistics, stop in
          
          
          if let quantity = statistics.sumQuantity() {
            
            let date = statistics.startDate
            let steps = quantity.doubleValueForUnit(HKUnit.countUnit())
            print("\(date): steps = \(steps)")
            stepsArray.append(steps);
          }
          
        }
        completion(stepsArray, error)
      }
    }
    
    healthKitStore.executeQuery(query)
  }
  
  
  
  
  
  
  
}