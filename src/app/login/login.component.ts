import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { IndexService } from '../shared/index.service';


@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private tbUser:user[];
  showM: boolean = true;
  constructor(private router: Router,private serin: IndexService) {
    this.serin.getLogin().subscribe((Response) => {
     this.tbUser = Response;
   });
   
 
}
private islog:boolean = false;
  ngOnInit() {
    if(JSON.parse(localStorage.getItem('currentUser')) != null){
      this.router.navigate(['../pages']);
    }
    this.showM = false;
  }
  checkLogin(username,password){
    this.serin.getwherelogin(username,password).subscribe((Response) => {
      //console.log("Ship : "+Response.user_name); 
      this.tbUser = Response; 
      
      console.log("Ship : "+this.tbUser.length); 
      if(this.tbUser.length >0){
          this.islog = true;  
         
       localStorage.setItem('currentUser', JSON.stringify(username));
       localStorage.setItem('passwordUser', JSON.stringify(password));
       localStorage.setItem('sectionID', JSON.stringify(this.tbUser[0].userType_ID));
          this.router.navigate(['../pages']);
        }else{
          this.showM = true;
          this.router.navigate(['./login']);
        }
        console.log(JSON.parse(localStorage.getItem('sectionID')));
    }) 
    // for(let i=0;i<this.tbUser.length;i++){
    //  if((username ==this.tbUser[i].user_name && password == this.tbUser[i].user_password)){  
    //    this.islog = true;  
    //    localStorage.setItem('currentUser', JSON.stringify(username));
    //    this.router.navigate(['../pages']);
    //  } 
    // }   
  }
 
}

interface user{
 
    user_ID: string;
          userType_ID : string;
          section_ID : string;
         user_name : string;
        user_password : string;
        user_empID: string;
         name: string;
       surname : string;
        tel : number;
        email : string;
        activeFlag : number;
        createDate : Date;
        createBy : string;
     updateDate : Date;
        updateBy : string;

}
