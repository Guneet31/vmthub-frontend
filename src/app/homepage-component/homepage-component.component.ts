import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import {ethers} from 'ethers';
import abi from '../contracts/HUB.sol/HUB.json';
import marketabi from '../contracts/HUB_marketplace.sol/NFTMarket.json';
import {AbiItem} from 'web3-utils'
import * as axios from 'axios';
import { Router } from '@angular/router';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CreateNftComponentComponent } from '../create-nft-component/create-nft-component.component';
declare global {
  interface Window {
    ethereum: any;
  }
}
declare var alcweb3:any;
export const web3 = alcweb3;

@Component({
  selector: 'app-homepage-component',
  templateUrl: './homepage-component.component.html',
  styleUrls: ['./homepage-component.component.css']
})
export class HomepageComponentComponent implements OnInit {
  columns:any = 1;
  dialogWidth:any = '400px';
  nftsForSale:any = [];
  isMobile:boolean = false;
  nftmarketaddress:any = "0xa093427ceA084F2fF80DCa9A03358760a1120a6d"
  nft_contractAddress:any = "0xc3F9e532B716EBdBd81dF897B716f9A41E689299"
  formData = new FormData();
  userWalletAddress:any;
  constructor(private _router:Router,private _ngZone: NgZone,public dialog: MatDialog) { }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  @ViewChild('videoPlayer') videoplayer: ElementRef;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit(): void {
    // code to check width of device

    const element = window.innerWidth;
    console.log(element);
    

    if (element < 950) {
      this.columns = 1;
      this.dialogWidth = '370px';
      this.isMobile = true;
    }

    if (element > 950) {
      this.columns = 1;
      this.dialogWidth = '500px';
      this.isMobile = false;
    }
    if(localStorage.getItem('myAccount'))
    {
      this.userWalletAddress = localStorage.getItem('myAccount');
    } 
    this.loadNfts();
  }
  onResize(event:any) {
    const element = event.target.innerWidth;
    console.log(element);


    if (element < 950) {
      this.columns = 1;
    }

    if (element > 950) {
      this.columns = 1;
    }

    
  }

// load all nfts of on marketplace contract on home page

async loadNfts()
{
 
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const signer = provider.getSigner()
    const tokenContract = new ethers.Contract(this.nft_contractAddress, abi.abi, provider)
    const marketContract = new ethers.Contract(this.nftmarketaddress, marketabi.abi, provider)
    const data = await marketContract['fetchMarketItems']()
    
    const items = await Promise.all(data.map(async (i:any) => {
    
     // console.log(i)
      const tokenUri = await tokenContract['tokenURI'](i.tokenId)
      if(tokenUri != "https://gateway.pinata.cloud/ipfs/QmbFMke1KXqnYyBBWxB74N4c5SBnJMVAiMNRcGu6x1AwQH")
      {
      const meta = await axios.default.get(tokenUri)
      
      var item= null;
      let price = web3.utils.fromWei(i.price.toString(), 'ether');
     if(meta.data.fileType){ 
       item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        contract: i.nftContract,
        description: meta.data.description,
        type: meta.data.fileType.includes("mov" || "mp4") ? "mov" || "mp4" : "jpg" || "png" || "jpeg",
      } }
    }
      return item
      
    }))
    this.nftsForSale = items.filter(i => i != undefined)
    console.log("items",items);
  }
// buy nft from marketplace 
  async buyNft(nft:any) {
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const signer = provider.getSigner()
    const contract = new ethers.Contract(this.nftmarketaddress, marketabi.abi, signer)
    const price = web3.utils.toWei(nft.price.toString(), 'ether');
    const transaction = await contract['createMarketSale'](this.nft_contractAddress, nft.tokenId, {
      value: price
    })
    await transaction.wait()
    this.loadNfts();
  }

  openDetails(route:any,nft:any) {
  this._router.navigate([route],{state:nft})
  }
  processFile(event:any) {
    const file = event.target.files[0];
    this.formData.append('file',file,file.name);
  }


toggleVideo(event: any) {
    this.videoplayer.nativeElement.play();
}

openDialog(): void {
  const dialogRef = this.dialog.open(CreateNftComponentComponent, {
    width: this.dialogWidth,
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
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
