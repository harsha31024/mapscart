import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingService } from 'src/app/shopping.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  productData:any = [];
  categories:any=[];
  electronics:any=[];
  jewelery:any=[];
  mencloth:any=[];
  womencloth:any=[];

  titleSearch:any;

  hideproducts=true;
  hideelectronics=false;
  hidejwellery=false;
  hideMens=false;
  hideWomens=false;
  hideforSearch=false;

  selectedvalue:any;
  hideslide=true;

  isLoading= false;



  productId: any = [];
  productInfo: any = [];
  rating_rate:any=[];

  imageUrl=`${environment.apiUrl}`;
  image=this.imageUrl + 'img/';

  constructor( private prodSrvc: ShoppingService, 
              private _actroute:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.getProductData();
    this.getSingleProduct();
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
    this.prodSrvc.getProducts().subscribe((res:any)=>{
      console.log(res);
      this.productData = res;
     
      console.log('prod data', this.productData)
      
    })
  
  }
  getSingleProduct(){
    this._actroute.params.subscribe(data=>{
      console.log(data)
      this.productId=data.id;
    })

    this.prodSrvc.getProductById(this.productId).subscribe((res:any)=>{
      console.log(res);
      this.productInfo[0]=res;
    })

}

getCategoryList(){
  this.prodSrvc.getCategories().subscribe((res:any)=>{
    console.log(res);
    this.categories=res;
    console.log('cat list',this.categories)
  })
}
getCatelectronic(){
  this.prodSrvc.getelectronics().subscribe((res:any)=>{
    console.log(res);
    this.electronics=res;
    console.log('electronics',this.electronics);
  })
}

getCatjwellery(){
  this.prodSrvc.getjwellery().subscribe((res:any)=>{
    console.log(res);
    this.jewelery=res;
    console.log('jwellery',this.jewelery);
  })
}

getMens(){
  this.prodSrvc.getMensCloth().subscribe((res:any)=>{
    console.log(res);
    this.mencloth=res;
    console.log('mens cloth',this.mencloth);
    
  })
}

getWomens(){
  this.prodSrvc.getWomensCloth().subscribe((res:any)=>{
    console.log(res);
    this.womencloth=res;
    console.log('womens cloth',this.womencloth);
  })
}

onselect(e:any){
  let val = e.target.value;
  console.log('this category',val);
  if(val=='electronics'){
    //this.getCatelectronic();
    this.hideproducts=false;
    this.hideslide=false;
    this.hidejwellery=false;
    this.hideMens=false;
    this.hideWomens=false;
    this.hideelectronics=true;
    this.hideforSearch=false;
    this.getCatelectronic();
    
  }
  else if(val=='jewelery'){
    this.hideproducts=false;
    this.hideelectronics=false;
    this.hideMens=false;
    this.hideWomens=false;
    this.hidejwellery=true;
    this.hideforSearch=false;
      this.getCatjwellery();
  }
  else if(val=="men's clothing"){
    this.hideproducts=false;
    this.hideelectronics=false;
    this.hidejwellery=false;
    this.hideMens=false;
    this.hideWomens=false;
    this.hideMens=true;
    this.hideforSearch=false;
    this.getMens();
  }
  else if(val=="women's clothing"){
    this.hideproducts=false;
    this.hideelectronics=false;
    this.hidejwellery=false;
    this.hideMens=false;
    this.hideWomens=true;
    this.hideforSearch=false;
    this.getWomens();
  }

  
  }
  // getrating(){
  //   this.prodSrvc.getProducts().subscribe((res:any)=>{
  //     console.log(res);
  //     this.productData = res.response;
  //     console.log('prod data', this.productData)
  //     if(this.rating_rate >="rating.rate")
  //     {
        
  //     }
  //   })
  // }
  toggleLoading = () =>{
    this.isLoading=true;
    
    setTimeout(()=>{
      this.isLoading=false;
    },3000)
  }

  Search(){
    if(this.titleSearch!=""){
      
      this.productData=this.productData.filter((res:any)=>{
        return res.title.toLocaleLowerCase().match(this.titleSearch.toLocaleLowerCase());
       
     })
     this.hideproducts=false;
      this.hideforSearch=true;
      this.hideslide=false;
      this.hideelectronics=false;
      this.hidejwellery=false;
      this.hideMens=false;
      this.hideWomens=false;
     

    }
    else if(this.titleSearch==""){
      
      this.hideproducts=true;
      this.hideforSearch=false;
      this.hideelectronics=false;
      this.hidejwellery=false;
      this.hideMens=false;
      this.hideWomens=false;
      
      this.ngOnInit();
    }
  

}

}