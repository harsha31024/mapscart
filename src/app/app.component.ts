import { Component } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SHOPPINGCART';

  
  footer: boolean = true;
  sidebar:boolean=true;

  

  constructor(public active: ActivatedRoute,public router: Router) {
  this.router.events.forEach(event=>{
    console.log(event)
    if(event instanceof RoutesRecognized){
      if(event['url'] == '/login' || event['url']== '/'){
        this.footer=false;
      }
      
    }
  })
}
}