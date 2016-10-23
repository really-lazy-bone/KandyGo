/*
 * Copyright 2016 MasterCard International.
 *
 * Redistribution and use in source and binary forms, with or without modification, are
 * permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of
 * conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 * Neither the name of the MasterCard International Incorporated nor the names of its
 * contributors may be used to endorse or promote products derived from this software
 * without specific prior written permission.
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING
 * IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
 *
 */
import UIKit
import CoreLocation
import MapKit
import Moya

class MachineInfoViewController : UIViewController {
    @IBOutlet weak var machineDistanceLabel: UILabel!
    @IBOutlet weak var machineAddressLabel: UILabel!
    @IBOutlet weak var showOnMapButton: UIButton!
    @IBOutlet weak var pairButton: UIButton!
    @IBOutlet var firstCandy: UILabel!
    @IBOutlet var secondCandy: UILabel!
    @IBOutlet var thirdCandy: UILabel!
    @IBOutlet var cashValue: UILabel!
    
    var kandyUserRequest: Cancellable?
    var user: User?
    var machine: Machine? {
        didSet {
            configureView()
        }
    }
    
    var pairCallback: (() -> Void)?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        fetchKandyUsers()
    }
    
    // MARK: - Action methods
    @IBAction func showOnMapButtonPressed(sender: UIButton) {
        guard let machine = machine else {
            return
        }
        
        let coordinate = CLLocationCoordinate2DMake(CLLocationDegrees(machine.latitude), CLLocationDegrees(machine.longitude))
        let mapItem = MKMapItem(placemark: MKPlacemark(coordinate: coordinate, addressDictionary:nil))
        mapItem.name = machine.name
        // TODO: Fix issue
        mapItem.openInMaps(launchOptions: [MKLaunchOptionsDirectionsModeKey : MKLaunchOptionsDirectionsModeDriving])
    }
    
    @IBAction func pairButtonPressed(_ sender: AnyObject) {
        if let pairCallback = pairCallback {
            pairCallback()
        }
    }
    
    func showAlert(title: String, message: String) {
        let vc = UIAlertController(title: title, message: message, preferredStyle: .alert)
        vc.addAction(UIAlertAction(title: "Dismiss", style: .cancel, handler: nil))
        
        present(vc, animated: true, completion: nil)
    }
    
    // MARK: - Private Methods
    func configureView() {
        guard let machine = self.machine else {
            self.machineAddressLabel.text = "<INVALID DEVICE>"
            self.machineDistanceLabel.text = "<INVALID DEVICE>"
            
            self.showOnMapButton.isEnabled = false
            self.pairButton.isEnabled = false
            
            return
        }
        
        self.machineAddressLabel.text = machine.address
        self.machineDistanceLabel.text = machine.formatDistance()
        
        self.showOnMapButton.isEnabled = true
        self.pairButton.isEnabled = true
    }
    
    func fetchKandyUsers(force: Bool = false) {
        if let request = kandyUserRequest, request.cancelled {
            if force {
                request.cancel()
            } else {
                return
            }
        }
    
        
        kandyUserRequest = KandyGoProvider.request(.getCandyUsers()) { [unowned self] result in
            switch result {
            case let .success(response):
                do {
                    print(try response.mapString())
                    self.user = try response.mapArray(type: User.self)[0]
                    if let kandies = self.user!.kandies {
                        self.firstCandy.text = "X" + kandies[0].count!.description
                        self.secondCandy.text = "X" + kandies[1].count!.description
                        self.thirdCandy.text = "X" + kandies[2].count!.description
                        var sum: Double = 0
                        sum += Double(kandies[0].count!)
                        sum += Double(kandies[1].count!)
                        sum += Double(kandies[2].count!)
                        let dollar: Double = sum/100.0
                        
                        let formatter = NumberFormatter()
                        formatter.numberStyle = .currency
                        
                        self.cashValue.text = "Cash Value: " + formatter.string(from: NSNumber(value: dollar))!
                    }
                } catch {
                    self.showAlert(title: "User", message: "Unable to fetch from server")
                }
                //self.tableView.reloadData()
            case let .failure(error):
                switch error {
                case .underlying(let nsError):
                    self.showAlert(title: "User", message: nsError.localizedDescription)
                    break
                default:
                    guard let   error = error as? CustomStringConvertible else {
                        return
                    }
                    self.showAlert(title: "User", message: error.description)
                }
            }
        }
    }
}
