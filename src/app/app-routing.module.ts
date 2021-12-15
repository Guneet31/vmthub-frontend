import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { sign } from 'crypto';
import { CreateNftComponentComponent } from './create-nft-component/create-nft-component.component';
import { HomepageComponentComponent } from './homepage-component/homepage-component.component';
import { NftDetailsComponentComponent } from './nft-details-component/nft-details-component.component';
import { SignupComponentComponent } from './signup-component/signup-component.component';

const routes: Routes = [
  { path: '', component: HomepageComponentComponent },
  {path:'signup',component:SignupComponentComponent},
  {path:'home',component:HomepageComponentComponent},
  {path:'createnft',component:CreateNftComponentComponent},
  {path:'details',component:NftDetailsComponentComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
