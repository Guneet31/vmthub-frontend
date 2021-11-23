import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNftComponentComponent } from './create-nft-component/create-nft-component.component';
import { HomepageComponentComponent } from './homepage-component/homepage-component.component';

const routes: Routes = [
  { path: '', component: HomepageComponentComponent },
  {path:'home',component:HomepageComponentComponent},
  {path:'createnft',component:CreateNftComponentComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
