//
//  User.swift
//  VendingDemo
//
//  Created by Daniel Choi on 10/22/16.
//  Copyright © 2016 Muhammad Azeem. All rights reserved.
//

import Foundation
import ObjectMapper

class User: Mappable {
    var id: String!
    var userName: String?
    var userDisplayName: String?
    var userProfile: String?
    var kandies: [KandyCount]?
    
    
    required init?(map: Map) {
        
    }
    // Mappable
    func mapping(map: Map) {
        id <- map["_id"]
        userName <- map["userName"]
        userDisplayName <- map["userDisplayName"]
        userProfile <- map["userProfile"]
        kandies <- map["candies"]
    }
}
