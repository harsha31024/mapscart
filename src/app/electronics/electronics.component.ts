import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingService } from '../shopping.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-electronics',
  templateUrl: './electronics.component.html',
  styleUrls: ['./electronics.component.css']
})
export class ElectronicsComponent implements OnInit {

  electronics:any;
  // hideelectronics=false;
  isLoading= false;

  imageUrl=`${environment.apiUrl}`;
  image=this.imageUrl + 'img/';

  constructor(public router:Router, private electSrvc: ShoppingService) { }

  ngOnInit(): void {
    console.log('jjj');
    this.getelectronic();
  }

  LogoutUser(){
    localStorage.clear();
    this.router.navigate(["login"]);
  }

  getelectronic(){
    this.electSrvc.getelectronics().subscribe((res:any)=>{
      console.log(res);
      this.electronics=res;
      console.log('electronics',this.electronics);
    })
  }

  toggleLoading = () =>{
    this.isLoading=true;
    
    setTimeout(()=>{
      this.isLoading=false;
    },3000)
  }


}
