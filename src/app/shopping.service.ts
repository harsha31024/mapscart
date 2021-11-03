import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  apiUrl=environment.apiUrl;

  constructor(private http:HttpClient) { }
  
  ValidateUser(username:any,password:any){
    if(username == "harsha" && password == "harsha")
    return true;
    else
    return false;

  }
  getProducts(){
    const url = "products"
    return this.http.get(this.apiUrl+(url));
  }
  getProductById(Pid:any){
    const url= "products/"+Pid;
    return this.http.get(this.apiUrl+(url));
  }
  getProductsByCategory(catId:any){
    const url="products?CategoryId="+catId;
    return this.http.get(this.apiUrl+(url))

  }
  getCategories(){
    const url="products/categories";
    return this.http.get(this.apiUrl+(url))
  }

  getelectronics(){
    const url="products/category/electronics";
    return this.http.get(this.apiUrl+(url))
  }

  getjwellery(){
    const url="products/category/jewelery";
    return this.http.get(this.apiUrl+(url))
  }

  getMensCloth(){
    const url="products/category/men's clothing";
    return this.http.get(this.apiUrl+(url))
  }

  getWomensCloth(){
    const url="products/category/women's clothing"
    return this.http.get(this.apiUrl+(url));
  }
  
  
}
