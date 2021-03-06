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
import VendingSDK

class MachineViewController: UIViewController {
    @IBOutlet weak var machineNameLabel: UILabel!
    @IBOutlet weak var containerView: UIView!

    var machine: Machine?
    var currentVC: UIViewController?

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        guard self.machine != nil else {
            let vc = UIAlertController(title: "Error", message: "Machine information not available", preferredStyle: .alert)
            vc.addAction(UIAlertAction(title: "Dismiss", style: .cancel, handler: { _ in
                self.dismiss(animated: true, completion: nil)
            }))
            
            present(vc, animated: true, completion: nil)
            return
        }
        
        configureView()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    // MARK: - Navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if "vending" == segue.identifier {
            let vc = segue.destination as! VendingViewController
            vc.machine = machine
        }
    }
    
    // MARK: - Private Methods
    func configureView() {
        machineNameLabel.text = machine?.name
        
        containerView.subviews.forEach({ $0.removeFromSuperview() })
        
        currentVC = self.storyboard?.instantiateViewController(withIdentifier: "MachineInfoViewController")
        currentVC!.view.translatesAutoresizingMaskIntoConstraints = false
        addChildViewController(currentVC!)
        addSubview(subview: currentVC!.view, toView: containerView)

        let infoVC = currentVC as! MachineInfoViewController
        infoVC.machine = machine
        infoVC.pairCallback = {
            self.vendingFlow()
        }
    }

    func addSubview(subview: UIView, toView parentView: UIView) {
        parentView.addSubview(subview)
        
        var viewBindingsDict = [String: AnyObject]()
        viewBindingsDict["subview"] = subview
        parentView.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "H:|[subview]|",
                                                                 options: [], metrics: nil, views: viewBindingsDict))
        parentView.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "V:|[subview]|",
                                                                 options: [], metrics: nil, views: viewBindingsDict))
    }
    
    func cycleFromViewController(oldViewController: UIViewController, toViewController newViewController: UIViewController) {
        oldViewController.willMove(toParentViewController: nil)
        self.addChildViewController(newViewController)
        self.addSubview(subview: newViewController.view, toView:self.containerView!)
        newViewController.view.alpha = 0
        newViewController.view.layoutIfNeeded()
        UIView.animate(withDuration: 0.5, animations: {
            newViewController.view.alpha = 1
            oldViewController.view.alpha = 0
            }, completion: { finished in
                oldViewController.view.removeFromSuperview()
                oldViewController.removeFromParentViewController()
                newViewController.didMove(toParentViewController: self)
        })
    }
    
    func reset() {
        let newViewController = self.storyboard?.instantiateViewController(withIdentifier: "MachineInfoViewController") as! MachineInfoViewController
        newViewController.view.translatesAutoresizingMaskIntoConstraints = false
        self.cycleFromViewController(oldViewController: self.currentVC!, toViewController: newViewController)
        self.currentVC = newViewController
        
        newViewController.pairCallback = {
            self.vendingFlow()
        }
    }
    
    func vendingFlow() {
        let newViewController = self.storyboard?.instantiateViewController(withIdentifier: "VendingViewController") as! VendingViewController
        newViewController.machine = machine
        newViewController.delegate = self
        newViewController.view.translatesAutoresizingMaskIntoConstraints = false
        self.cycleFromViewController(oldViewController: self.currentVC!, toViewController: newViewController)
        self.currentVC = newViewController
    }
}

// MARK: - VendingFlow methods
extension MachineViewController : VendingFlow {
    func flowComplete() {
        reset()
    }
    
    func showReceipt(machineName: String, quantity: Int, amount: String, firstKandiesUsed: Int, secondKandiesUsed: Int, thirdKandiesUsed: Int) {
        let vc = storyboard?.instantiateViewController(withIdentifier: "ReceiptViewController") as! ReceiptViewController
        vc.machineName = machineName
        vc.quantity = quantity
        vc.amount = amount
        vc.firstKandiesUsed = firstKandiesUsed
        vc.secondKandiesUsed = secondKandiesUsed
        vc.thirdKandiesUsed = thirdKandiesUsed
        
        let nav = UINavigationController(rootViewController: vc)
        self.navigationController?.present(nav, animated: true, completion: nil)
    }
}
