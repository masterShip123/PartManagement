import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { IndexService } from '../shared/index.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private tbUser:user[];
  showM: boolean = true;
  plainText:string;  
  encryptText: string;  
  encPassword: string;  
  decPassword:string;  
  conversionEncryptOutput: string;  
  conversionDecryptOutput:string;  
  constructor(private router: Router,private serin: IndexService) {
    this.serin.getLogin().subscribe((Response) => {
     this.tbUser = Response;
   });
   
 
}
// //The set method is use for encrypt the value.
// set(keys, value){
//   var key = CryptoJS.enc.Utf8.parse(keys);
//   var iv = CryptoJS.enc.Utf8.parse(keys);
//   var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
//   {
//       keySize: 128 / 8,
//       iv: iv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7
//   });

//   return encrypted.toString();
// }

// //The get method is use for decrypt the value.
// get(keys, value){
//   var key = CryptoJS.enc.Utf8.parse(keys);
//   var iv = CryptoJS.enc.Utf8.parse(keys);
//   var decrypted = CryptoJS.AES.decrypt(value, key, {
//       keySize: 128 / 8,
//       iv: iv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7
//   });

//   return decrypted.toString(CryptoJS.enc.Utf8);
// }
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
       localStorage.setItem('surname', JSON.stringify(this.tbUser[0].surname));
       localStorage.setItem('Username', JSON.stringify(this.tbUser[0].name));
       localStorage.setItem('sectionname', JSON.stringify(this.tbUser[0].sectionname));
       localStorage.setItem('Useremail', JSON.stringify(this.tbUser[0].email));
       localStorage.setItem('passwordUser', JSON.stringify(this.tbUser[0].user_password));
       localStorage.setItem('sectionID', JSON.stringify(this.tbUser[0].section_ID));
       if(this.tbUser[0].userType_ID == "UT4"){
        localStorage.setItem('UseremailUT4', JSON.stringify(this.tbUser[0].email));
        localStorage.setItem('passwordUserUT4', JSON.stringify(password));
       }else{
        localStorage.setItem('UseremailUT4', JSON.stringify("acs57011210007@gmail.com"));
        localStorage.setItem('passwordUserUT4', JSON.stringify("nuttawut"));
       }
       localStorage.setItem('Usertype', JSON.stringify(this.tbUser[0].userType_ID));
      
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
  sectionname: string;
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
