//
//  KandyCount.swift
//  VendingDemo
//
//  Created by Daniel Choi on 10/22/16.
//  Copyright © 2016 Muhammad Azeem. All rights reserved.
//

import Foundation
import ObjectMapper

class KandyCount: Mappable {
    var kandy: Kandy?
    var count: Int?
    
    required init?(map: Map) {
        
    }
    // Mappable
    func mapping(map: Map) {
        kandy <- map["candyObject"]
        count <- map["count"]
    }
}
