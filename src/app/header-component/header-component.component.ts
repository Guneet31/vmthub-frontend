import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare global {
  interface Window {
      ethereum:any;
  }
}
@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent implements OnInit {
  userWalletAddress:any;
  constructor(private _router:Router) { }
  
  ngOnInit() {
    if(localStorage.getItem('myAccount'))
    {
      this.userWalletAddress = localStorage.getItem('myAccount');
    } 
  }

  menuRouteChange(route: string) {
    this._router.navigate([route]);
  }
  openSettings()
  {
    this._router.navigate(['/settings']);
  }
  async connectUserWallet()
  {
    // Check if metamas is installed
    if (typeof window.ethereum !== 'undefined') {
      // if metaMask is installed
      console.log('MetaMask is installed!');
      // get user wallet address
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
        this.userWalletAddress = account;
       // this is the user public wallet address
      console.log("myAccount is---->>>>",account);
      localStorage.setItem('myAccount',account);
      // metamask deeplinking for ios|android app

    }

  }

}
