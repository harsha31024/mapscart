import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingService } from 'src/app/shopping.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-viewproducts-by-category',
  templateUrl: './viewproducts-by-category.component.html',
  styleUrls: ['./viewproducts-by-category.component.css']
})
export class ViewproductsByCategoryComponent implements OnInit {
  categoryId:any=[];
  categoryInfo:any=[];

  imageUrl=`${environment.apiUrl}`;
  image=this.imageUrl + 'img/';

  constructor(private _actroute: ActivatedRoute, private catSrvc: ShoppingService) { }

  ngOnInit(): void {
    this.getCatProduct()
  }

  getCatProduct(){
    this._actroute.params.subscribe(data=>{
      this.categoryId=data.id;
    })
    this.catSrvc.getProductsByCategory(this.categoryId).subscribe(plist=>{
      this.categoryInfo=plist;
    })
  }

}
