import { Route } from '@angular/compiler/src/core';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nft-details-component',
  templateUrl: './nft-details-component.component.html',
  styleUrls: ['./nft-details-component.component.css']
})
export class NftDetailsComponentComponent implements OnInit {
data:any;
columns:any = 2;
  constructor(private router:Router) {
  }
  ngOnInit(): void {
     this.data = history.state;
    console.log("data",this.data);
    console.log('NFT Details Component');
    const element = window.innerWidth;
    console.log(element);


    if (element < 950) {
      this.columns = 4;
    }

    if (element > 950) {
      this.columns = 2;
    }

  }

}
