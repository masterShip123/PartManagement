import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { makerList } from '../../../shared/index.model';

function emailDomainValidator(control: FormControl) {
  let email = control.value;
  if (email && email.indexOf("@") != -1) {
    let [_, domain] = email.split("@");
    if (domain !== "codecraft.tv") {
      return {
        emailDomain: {
          parsedDomain: domain
        }
      }
    }
  }
  return null;
}
@Component({
  selector: 'ngx-maker-add',
  templateUrl: './maker-add.component.html',
  styleUrls: ['./maker-add.component.scss']
})
export class MakerAddComponent implements OnInit {
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  preventDuplicates = false;
  currentUser : string;
  registerForm: FormGroup;
  source: LocalDataSource = new LocalDataSource();
  validEmail:boolean = false;
  
  checkPrimarykey : number = 0;
  showValid: boolean = false;
  private makerList: makerList[];

  private data: string[];
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<MakerAddComponent>,
    private toastrService: NbToastrService,private formBuilder: FormBuilder) { 
    
  }
  ngOnInit() {
    this.service.getDataSection();
    this.service.getDataMic();
    this.service.getDataUserType();
    this.service.getDataDepartment();
    this.service.getDataFactoryLine();
    this.service.getProvince();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.service.getLogin().subscribe((Response) =>{
        this.data = Response;
    });
    this.service.getMakerLineList().then((dataa) => {
      this.source.load(dataa);
      console.log(this.source.load(dataa));
    });
    this.registerForm = this.formBuilder.group({
      
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),emailDomainValidator]]
      
    });
  }
  cancel() {
    this.ref.close();
  }
  get f() { return this.registerForm.controls; }
 
  submit(makerid, makername, contactName, lastName, tel
    , email, address, province, StatusValue) {
    // console.log(empid+" "+idsection+" "+miccode+" "+usertype);
    this.service.getCheckToolList().then((dataa) => {
      this.makerList = dataa;
      for(let row of this.makerList){
        //  console.log("Datas : "+row.factory_ID+", "+factoryid)

         if(row.maker_ID == makerid){
          this.checkPrimarykey++; 
          
        }
      }
      console.log("T : "+this.checkPrimarykey)
      if(this.checkPrimarykey > 0 ){
        this.showValid = true;
        this.checkPrimarykey = 0;
      }else{
        this.service.postDataMaker(makerid, makername, contactName, lastName, tel, email, address, province, StatusValue)
        this.service.getMakerLineList().then((data) => {
          this.ref.close(this.source.load(data));
       });
      }
    
    });
    //  if(this.service.postDataMaker(makerid, makername, contactName, lastName, tel, email, address, province, StatusValue) != null){
    //    console.log("Succes");
    //  }
    //  this.service.getMakerLineList().then((data) => {
    //     this.ref.close(this.source.load(data));
    //  });
     
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  onChange(newValue) {
    const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (validEmailRegEx.test(newValue)) {
        this.validEmail = true;
    }else {
      this.validEmail = false;
    }

  }

}
