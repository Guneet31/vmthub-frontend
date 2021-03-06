import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponentComponent } from './homepage-component/homepage-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HeaderComponentComponent } from './header-component/header-component.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import { CreateNftComponentComponent } from './create-nft-component/create-nft-component.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatMenuModule} from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { NftDetailsComponentComponent } from './nft-details-component/nft-details-component.component';
import { PostComponentComponent } from './post-component/post-component.component';
import {MatCardModule} from '@angular/material/card';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { SignupComponentComponent } from './signup-component/signup-component.component';
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponentComponent,
    HeaderComponentComponent,
    CreateNftComponentComponent,
    NftDetailsComponentComponent,
    PostComponentComponent,
    SignupComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatMenuModule,
    HttpClientModule,
    MatCardModule,
    TextFieldModule,
    MatTooltipModule,
    MatDialogModule,
    MatDividerModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
