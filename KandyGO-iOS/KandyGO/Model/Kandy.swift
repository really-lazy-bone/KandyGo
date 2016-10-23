//
//  Kandy.swift
//  VendingDemo
//
//  Created by Daniel Choi on 10/22/16.
//  Copyright © 2016 Muhammad Azeem. All rights reserved.
//

import Foundation
import ObjectMapper

class Kandy: Mappable {
    var eventName: String?
    var eventDisplayName: String?
    var eventDescription: String?
    var candyType: String?
    var candyName: String?
    var candyImageName: String?
    var candyDescription: String?
    var candyConversionRate: Float?
    
    required init?(map: Map) {
        
    }
    
    func mapping(map: Map) {
        eventName <- map["eventName"]
        eventDisplayName <- map["eventDisplayName"]
        eventDescription <- map["eventDescription"]
        candyType <- map["candyType"]
        candyName <- map["candyName"]
        candyImageName <- map["candyImageName"]
        candyDescription <- map["candyDescription"]
        candyConversionRate <- map["candyConversionRate"]
    }
    
}
