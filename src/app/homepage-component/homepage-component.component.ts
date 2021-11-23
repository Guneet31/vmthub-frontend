import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage-component',
  templateUrl: './homepage-component.component.html',
  styleUrls: ['./homepage-component.component.css']
})
export class HomepageComponentComponent implements OnInit {
  columns:any = 6;
  constructor() { }

  ngOnInit(): void {
    // code to check width of device
    const element = window.innerWidth;
    console.log(element);


    if (element < 950) {
      this.columns = 2;
    }

    if (element > 950) {
      this.columns = 6;
    }
  }
  onResize(event:any) {
    const element = event.target.innerWidth;
    console.log(element);


    if (element < 950) {
      this.columns = 2;
    }

    if (element > 950) {
      this.columns = 6;
    }

    
  }
}
