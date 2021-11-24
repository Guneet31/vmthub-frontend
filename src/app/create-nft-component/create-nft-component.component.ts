import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {ethers} from 'ethers';
declare global {
  interface Window {
    ethereum: any;
  }
}
declare var alcweb3:any;
export const web3 = alcweb3;


@Component({
  selector: 'app-create-nft-component',
  templateUrl: './create-nft-component.component.html',
  styleUrls: ['./create-nft-component.component.css']
})
export class CreateNftComponentComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup:FormGroup;
  fourthFormGroup: FormGroup;
  progressbar:boolean=false;
  formData = new FormData();
  constructor(private _formBuilder: FormBuilder,private http:HttpClient, private _router:Router) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdControl: ['', Validators.required],
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthControl: ['', Validators.required],
    });
  }

  processFile(event:any) {
    const file = event.target.files[0];
    this.formData.append('file',file,file.name);
  }
  onSubmit()
  {  this.progressbar=true;
    console.log(this.firstFormGroup.value.firstCtrl,this.secondFormGroup.value.secondCtrl,this.thirdFormGroup.value,this.fourthFormGroup.value.fourthControl);
    let jsonBody = {
      "tokenName":this.firstFormGroup.value.firstCtrl,
      "tokenDescription":this.secondFormGroup.value.secondCtrl,
      "Price":this.fourthFormGroup.value.fourthControl
    }
    this.formData.append('jsonBody',JSON.stringify(jsonBody));

    // stop progress bar after minting token
    this.http.post('http://localhost:3000/preMint',this.formData).subscribe(res=>{
      // console.log(res);
      if(res)
      {
        // call create Sale nft function
        this.createSale(res)
        
      }
    
    })
  }


  // create nft for sale
async createSale(parameters:any) {
  // above code omitted

const listingPrice = web3.utils.toWei('0.01', 'ether')

// contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
// transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice })
// // below code omitted
// listing price code ended
console.log("parameters",parameters);
const provider = new ethers.providers.Web3Provider((window as any).ethereum);
const signer = provider.getSigner()
let contract = new ethers.Contract(parameters.nft_contractAddress, JSON.parse(parameters.nft_abi), signer)
let transaction = await contract['createToken'](parameters.metaDataTokenURI)
let tx = await transaction.wait()
let event = tx.events[0]
let value = event.args[2]
let tokenId = value.toNumber()
const price = web3.utils.toWei('0.02', 'ether')

contract = new ethers.Contract(parameters.market_contractAddress,parameters.market_abi, signer)
transaction = await contract['createMarketItem'](parameters.nft_contractAddress, tokenId, price,{ value: listingPrice })
await transaction.wait()
this.progressbar=false;
this._router.navigate(['/home'])

}










}