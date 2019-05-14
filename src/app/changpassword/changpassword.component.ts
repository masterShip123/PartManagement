import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../shared/index.service';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { user } from '../shared/index.model';

@Component({
  selector: 'ngx-changpassword',
  templateUrl: './changpassword.component.html',
  styleUrls: ['./changpassword.component.scss']
})
export class ChangpasswordComponent implements OnInit {
 
  userName: string = "";
  password: string = "";
  data: string = "";
  private tbUser:user[];
  formData  : user;
  registerForm: FormGroup;
  source: LocalDataSource = new LocalDataSource();
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<ChangpasswordComponent>,
    private toastrService: NbToastrService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userName = JSON.parse(localStorage.getItem('currentUser'));
    this.service.getUserview(this.userName).subscribe((Response) => {
      this.tbUser = Response; 
        console.log("Test :"+JSON.stringify(this.tbUser[0].user_password));
         localStorage.setItem('passwordUser', JSON.stringify(this.tbUser[0].user_password));
        this.password = JSON.parse(localStorage.getItem('passwordUser'));
    }) 
  }
  changPass(newpassword){
    this.service.putChangPassWord(this.userName,newpassword);
    this.ref.close();
  }
  cancel() {
    this.ref.close();
  }

}
