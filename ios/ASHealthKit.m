//
//  ASHealthKit.m
//  AwesimSteps
#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"
//#import "HealthKit.h"
//@import HealthKit;

@interface RCT_EXTERN_MODULE(RNHealthKit, NSObject)

  RCT_EXTERN_METHOD(addEvent:(NSString *)name location:(NSString *)location date:(nonnull NSNumber *)date)

  RCT_EXTERN_METHOD(add:(nonnull NSNumber*)x y:(nonnull NSNumber*)y callback:(RCTResponseSenderBlock) callback);

@end