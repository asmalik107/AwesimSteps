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
    let x = checkAuthorization();
    
    NSLog(x ? "Yes" : "No");
    
    callback([NSNull(), x]);
  }
  
  
  @objc func getSteps(startDate:NSDate, endDate:NSDate, callback:RCTResponseSenderBlock) -> Void {
  
    recentSteps(startDate, endDate: endDate) { steps, error in
      NSLog("steps");
      
      //callback("dfdf");
      
      
      callback([NSNull(), steps]);
  }
}

  func checkAuthorization() -> Bool {
    
    var isEnabled = true
    
    if HKHealthStore.isHealthDataAvailable()
    {
      // We have to request each data type explicitly
      
      let steps = Set(arrayLiteral:
        HKObjectType.characteristicTypeForIdentifier(HKCharacteristicTypeIdentifierDateOfBirth)!,
        HKObjectType.quantityTypeForIdentifier(HKQuantityTypeIdentifierStepCount)!
        )
      
      
      
      /*let newCompletion: ((Bool, NSError?) -> Void) = {
        (success, error) -> Void in
        
        if !success {
          print("You didn't allow HealthKit to access these write data types.\nThe error was:\n \(error!.description).")
          
          return
        }
      }
      
      
      healthKitStore.requestAuthorizationToShareTypes(healthKitTypesToWrite, readTypes: healthKitTypesToRead, completion: newCompletion)
      
 */
 
      // Now we can request authorization for step count data
      healthKitStore.requestAuthorizationToShareTypes(nil, readTypes: steps) { (success, error) -> Void in
        isEnabled = success
      }
    } else {
      isEnabled = false;
    }
    
    return isEnabled
  }
  
  @objc func getWeeklySteps(startDate:NSDate, endDate:NSDate, anchorDate:NSDate, callback:RCTResponseSenderBlock) -> Void {
    
    weeklySteps(startDate, endDate: endDate, anchorDate: anchorDate) { steps, error in
      NSLog("weeklysteps");
      
      //callback("dfdf");
      
      
      callback([NSNull(), steps]);
    }
  }
  
  
  func recentSteps(startDate:NSDate, endDate:NSDate, completion: (Double, NSError?) -> () )
  {
    // The type of data we are requesting (this is redundant and could probably be an enumeration
    let type = HKSampleType.quantityTypeForIdentifier(HKQuantityTypeIdentifierStepCount)
    
    // Our search predicate which will fetch data from now until a day ago
    // (Note, 1.day comes from an extension
    // You'll want to change that to your own NSDate
    let predicate = HKQuery.predicateForSamplesWithStartDate(startDate, endDate: endDate, options: .None)
    
    // The actual HealthKit Query which will fetch all of the steps and sub them up for us.
    let query = HKSampleQuery(sampleType: type!, predicate: predicate, limit: 0, sortDescriptors: nil, resultsHandler: { query, results, error in
      var steps: Double = 0
      
      if results?.count > 0 {
 /*     {
        for result in results as! [HKQuantitySample]
        {
          steps += result.quantity.doubleValueForUnit(HKUnit.countUnit())
        }
      }*/
      for s in results as! [HKQuantitySample]
      {
        // add values to dailyAVG
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
    //let startDate = NSDate().beginningOfDay().oneWeekAgo()
    let interval = NSDateComponents()
    interval.day = 1
    
    let predicate = HKQuery.predicateForSamplesWithStartDate(startDate, endDate: endDate, options: .StrictStartDate)
    
//    let query = HKStatisticsCollectionQuery(quantityType: type!, quantitySamplePredicate: predicate, options: [.CumulativeSum], anchorDate: NSDate().begginingOfDay(), intervalComponents:interval)

      let query = HKStatisticsCollectionQuery(quantityType: type!, quantitySamplePredicate: predicate, options: [.CumulativeSum], anchorDate: anchorDate, intervalComponents:interval)
    
    
    query.initialResultsHandler = { query, results, error in
      
      
      //let endDate = NSDate()
      //let startDate = NSDate().beginningOfDay().oneWeekAgo()
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