import { HttpClientModule } from '@angular/common/http';
import {  NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
// mat-material
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

// flexbox
import { FlexLayoutModule } from '@angular/flex-layout';
// gmaps
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AgmCoreModule } from '@agm/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ShoppingService } from './shopping.service';
import { ViewAllProductsComponent } from './view-all-products/view-all-products.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { ViewproductsByCategoryComponent } from './viewproducts-by-category/viewproducts-by-category.component';
import { FooterComponent } from './footer/footer.component';
import { GooglemapsComponent } from './googlemaps/googlemaps.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ViewAllProductsComponent,
    SingleProductComponent,
    ViewproductsByCategoryComponent,
    FooterComponent,
    GooglemapsComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    FlexLayoutModule,
    MatSelectModule,
    GooglePlaceModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyCaKbVhcX_22R_pRKDYuNA7vox-PtGaDkI',
      libraries: ['places']
    }),
    
    ToastrModule.forRoot({
      timeOut:1600,
      progressBar: true,
      progressAnimation:'increasing',
      preventDuplicates: true
    })
  ],
  providers: [ShoppingService,ToastrService],
  bootstrap: [AppComponent],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
