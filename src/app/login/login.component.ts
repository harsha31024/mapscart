import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ShoppingService } from '../shopping.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  

  constructor(public shopSrvc: ShoppingService,
              public router: Router,
              private formBuilder:FormBuilder,
              private toastr:ToastrService) { }

  ngOnInit(): void {
    this.loginfrm = this.formBuilder.group({
      uname:['',[Validators.required]],
      pwd:['',[Validators.required]]
    })
    console.log(this.loginfrm.value);
  }
  loginfrm = new FormGroup({
    uname: new FormControl(),
    pwd: new FormControl()
  })

  CheckUser(){
    this.submitted = true;
    if(this.loginfrm.invalid){
      return;
    }
    console.log(this.loginfrm.value);
    
    var res = this.shopSrvc.ValidateUser(this.loginfrm.value["uname"],this.loginfrm.value["pwd"]);
    
    if(res==true){
      localStorage.setItem("uname",this.loginfrm.value["uname"]);
      localStorage.setItem("pwd", this.loginfrm.value["pwd"]);
      this.toastr.success('login successfull','E-Cart')
      this.router.navigate(["products"]);
      
    //alert('login successfull');
    
      
    }
    else if(this.loginfrm.value["uname"]==null && this.loginfrm.value["pwd"]==null){
      
      //alert("please enter credentials")

      this.toastr.warning('Please Enter Credentials','E-Cart')
      
    }
    else{
      
      //alert("invalid user")
      this.toastr.error('invalid User','E-Cart')
     
    }
  }
  

}
