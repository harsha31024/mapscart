import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingService} from '../shopping.service';
import { environment } from 'src/environments/environment';
// import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-all-products',
  templateUrl: './view-all-products.component.html',
  styleUrls: ['./view-all-products.component.css']
})
export class ViewAllProductsComponent implements OnInit {

  productData:any = [];
  categories:any=[];
  electronics:any=[];
  jewelery:any=[];
  mencloth:any=[];
  womencloth:any=[];

  hideproducts=true;
  hideelectronics=false;
  hidejwellery=false;
  hideMens=false;
  hideWomens=false;
  hideforSearch=false;
  hidevideo=true;

  selectedvalue:any;
  hideslide=true;

  isLoading= false;

  // categoryId:any=[];
  // categoryInfo:any=[];

  titleSearch:any;

  imageUrl=`${environment.apiUrl}`;
  image=this.imageUrl + 'img/';

  constructor(public router:Router, private shopSrvc: ShoppingService) { }

  ngOnInit(): void {
    console.log('jjj');
    this.getProductData();
    this.getCategoryList();
     this.getCatelectronic();
     this.getCatjwellery();
     this.getMens();
     this.getWomens();
  }
  LogoutUser(){
    localStorage.clear();
    this.router.navigate(["login"]);
  }

  getProductData(){
    this.shopSrvc.getProducts().subscribe((res:any)=>{
      console.log(res);
      this.productData = res;
     
      console.log('prod data', this.productData)
      
    })
  
  }

  // getProductData(){
  //   this.shopSrvc.getProducts().subscribe((res:any)=>{
  //     console.log(res);
  //     this.productData = res;
     
  //     console.log('prod data', this.productData)
  //     if(this.productData!=res){
  //       this.isLoading=true;
  //       this.hideproducts=false;
  //     }
  //     else if(this.productData=res){
  //       this.isLoading=false;
  //       this.hideproducts=true;
  //     }
  //   })
  
  // }

  
  getCategoryList(){
    this.shopSrvc.getCategories().subscribe((res:any)=>{
      console.log(res);
      this.categories=res;
      console.log('cat list',this.categories)
    })
  }
  getCatelectronic(){
    this.shopSrvc.getelectronics().subscribe((res:any)=>{
      console.log(res);
      this.electronics=res;
      console.log('electronics',this.electronics);
    })
  }

  getCatjwellery(){
    this.shopSrvc.getjwellery().subscribe((res:any)=>{
      console.log(res);
      this.jewelery=res;
      console.log('jwellery',this.jewelery);
    })
  }

  getMens(){
    this.shopSrvc.getMensCloth().subscribe((res:any)=>{
      console.log(res);
      this.mencloth=res;
      console.log('mens cloth',this.mencloth);
      
    })
  }

  getWomens(){
    this.shopSrvc.getWomensCloth().subscribe((res:any)=>{
      console.log(res);
      this.womencloth=res;
      console.log('womens cloth',this.womencloth);
    })
  }
  Search(){
    if(this.titleSearch!=""){
      
      this.productData=this.productData.filter((res:any)=>{
        return res.title.toLocaleLowerCase().match(this.titleSearch.toLocaleLowerCase());
       
     })
     this.hideproducts=false;
      this.hideforSearch=true;
      this.hideslide=false;
     

    }
    else if(this.titleSearch==""){
      
      this.hideproducts=true;
      this.hideforSearch=false;
      this.hideslide=true;
      
      this.ngOnInit();
    }
  

}
onselect(e:any){
  let val = e.target.value;
  console.log('this category',val);
  if(val=='electronics'){
    
    this.hideproducts=false;
    this.hideslide=false;
    this.hidejwellery=false;
    this.hideMens=false;
    this.hideWomens=false;
    this.hideelectronics=true;
    this.hidevideo=false;
    this.getCatelectronic();
    
  }
  else if(val=='jewelery'){
    this.hideproducts=false;
    this.hideslide=false;
    this.hideelectronics=false;
    this.hideMens=false;
    this.hideWomens=false;
    this.hidejwellery=true;
    this.hidevideo=false;
      this.getCatjwellery();
  }
  else if(val=="men's clothing"){
    this.hideproducts=false;
    this.hideslide=false;
    this.hideelectronics=false;
    this.hidejwellery=false;
    this.hideMens=false;
    this.hideWomens=false;
    this.hideMens=true;
    this.hidevideo=false;
    this.getMens();
  }
  else if(val=="women's clothing"){
    this.hideproducts=false;
    this.hideslide=false;
    this.hideelectronics=false;
    this.hidejwellery=false;
    this.hideMens=false;
    this.hideWomens=true;
    this.hidevideo=false;
    this.getWomens();
  }
  else if(val=="0"){
    this.hideproducts=true;
    this.hideelectronics=false;
    this.hidejwellery=false;
    this.hideMens=false;
    this.hideWomens=false;
    this.hideslide=true;
    this.hidevideo=true;
    this.getProductData();

  }

  
  }
  toggleLoading = () =>{
    this.hideslide=false;
    this.hideproducts=false;
    this.hidevideo=false;
    this.isLoading=true;
    setTimeout(()=>{
      this.isLoading=false;
    },4000)
  }

}
