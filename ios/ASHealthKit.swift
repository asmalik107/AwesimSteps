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
  
  @objc func addEvent(name: String, location: String, date: NSNumber) -> Void {
    // Date is ready to use!
  }
  
  @objc func add(x:NSNumber, y: NSNumber, callback:RCTResponseSenderBlock)->Void{
    x.intValue+y.intValue;
    
    callback(["2"]);
  }

  
}