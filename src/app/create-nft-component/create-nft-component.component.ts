import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  constructor(private _formBuilder: FormBuilder,private http:HttpClient) {}

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
        this.progressbar=false;
      }
    
    })
  }


  // create nft for sale
  async createSale(parameters:any) {
  console.log(parameters);
}










}
