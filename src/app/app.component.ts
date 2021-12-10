import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare global {
  interface Window {
      ethereum:any;
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nfthub-frontend';
  userWalletAddress:any;
  constructor(private _router: Router) {
  }




    menuRouteChange(route: string) {
      this._router.navigate([route]);
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
