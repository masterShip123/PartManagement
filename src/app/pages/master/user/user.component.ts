import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Http } from '@angular/http';
import { SmartTableService } from '../../../@core/mock/smart-table.service';
import { SmartTableData } from '../../../@core/data/smart-table';
import { NbDialogService } from '@nebular/theme';
import { AdduserComponent } from '../adduser/adduser.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { ViewUserComponent } from '../view-user/view-user.component';
import { user } from '../../../shared/index.model';
import { disableBindings } from '@angular/core/src/render3';

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  settings = {
    actions : {
       add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'view',
          title: '<i class="nb-person "></i>'
        },
        {
          name: 'edit',
          title: '<i class="nb-edit"></i>'
        },
        {
          name: 'delete',
          title: '<i class="nb-trash"></i>'
        }

      ],
      position: 'right'
    },
    // add: {
    //   addButtonContent: '<i class="nb-plus"></i>',
    //   createButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    //   confirmCreate: 'true',
    // },
    // edit: {
    //   editButtonContent: '<i class="nb-edit"></i>',
    //   saveButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    //   confirmSave: true,
    // },
    // delete: {
    //   deleteButtonContent: '<i class="nb-trash"></i>',
    //   confirmDelete: true,
    // },
    // Colum ต้องให้ชื่อตรงกับ Model
    columns: {
      ID: {
        title: 'ID',
        type: 'number',
      },
      user_empID: {
        title: 'Emp ID',
        type: 'number',
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      section_name: {
        title: 'Section',
        type: 'string',
      },
      userType_name: {
        title: 'User Type',
        type: 'string',
      },
      value1: {
        title: 'Status',
        type: 'string',
      }
    }
  }
  private data: string[];
  private tbUser:user[];
  showMs: boolean = false;
  //private sele: string[];
  ngOnInit() {
    //this.sele = ["Flex"]
    
  }
  source: LocalDataSource = new LocalDataSource();
  currentUser : string
  constructor(private router: Router,public service: IndexService,public http: Http,private ser: SmartTableService,
    private dialogService: NbDialogService) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.service.getLogin().subscribe((Response) =>{
        this.data = Response;
    });
    //const data2 = this.service.getData();
    //this.source.load(data2);
    this.service.getUserList().then((dataa) => {
      this.source.load(dataa);
      console.log(this.source.load(dataa));
    });
    
  }
 
  onCustom(event){
    localStorage.setItem('userListEmpId', JSON.stringify(event.data.user_empID));
    // Username +""+empid
    
    localStorage.setItem('name', JSON.stringify(event.data.name));
    localStorage.setItem('section_name', JSON.stringify(event.data.section_name));
    localStorage.setItem('userType_name', JSON.stringify(event.data.userType_name));
    localStorage.setItem('value1', JSON.stringify(event.data.value1));
    localStorage.setItem('userID', JSON.stringify(event.data.name+""+event.data.user_empID));
   
    localStorage.setItem('password', JSON.stringify(event.data.user_password));
      localStorage.setItem('section_IDUser', JSON.stringify(event.data.section_ID));
      localStorage.setItem('activeFlag', JSON.stringify(event.data.activeFlag));
      localStorage.setItem('userType_ID', JSON.stringify(event.data.userType_ID));
      
      localStorage.setItem('email', JSON.stringify(event.data.email));
     
      localStorage.setItem('tel', JSON.stringify(event.data.tel));
      localStorage.setItem('surname', JSON.stringify(event.data.surname));

    // this.service.getUserview(JSON.parse(localStorage.getItem('userID'))).subscribe((Response) => {
    //   //console.log("Ship : "+Response.user_name); 
    //   this.tbUser = Response; 
    //   localStorage.setItem('password', JSON.stringify(this.tbUser[0].user_password));
    //   localStorage.setItem('section_IDUser', JSON.stringify(this.tbUser[0].section_ID));
    //   localStorage.setItem('activeFlag', JSON.stringify(this.tbUser[0].activeFlag));
    //   localStorage.setItem('userType_ID', JSON.stringify(this.tbUser[0].userType_ID));
    //   console.log(JSON.parse(localStorage.getItem('password')));
    //   localStorage.setItem('email', JSON.stringify(this.tbUser[0].email));
    //   console.log("EmailTest : "+JSON.parse(localStorage.getItem('email')));
    //   localStorage.setItem('tel', JSON.stringify(this.tbUser[0].tel));
    //   localStorage.setItem('surname', JSON.stringify(this.tbUser[0].surname));
      
    // }); 
    console.log(event.action);
    if(event.action == "delete"){
      
        console.log("LOG : "+event.data.user_empID);
        //event.confirm.resolve();
        this.service.onDeleteRowBtnClick2(event.data.user_empID).then((newdata) => {
          this.source.load(newdata);  
        //console.log("Shipp : "+data.password)
       });
        // this.service.getUserList().then((data) => {
        //   this.source.load(data);
        //   console.log("Shipp : "+data.password)
        //  });
     
    }else if(event.action == "edit"){
      this.dialogService.open(EditUserComponent).onClose.subscribe((res) => {
        console.log("Res : "+res);
        this.service.getUserList().then((newdata) => {
            this.source.load(newdata);  
           });
      });
    }else if(event.action == "view"){
      this.dialogService.open(ViewUserComponent)
    }
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      console.log("LOG : "+event.data.user_empID);
      event.confirm.resolve();
      this.service.onDeleteRowBtnClick2(event.data.user_empID);
      this.service.getUserList().then((data) => {
        this.source.load(data);
       });
       
    } else {
      event.confirm.reject();
    }
    
  }
  onAddUserlist(): void{
    this.dialogService.open(AdduserComponent).onClose.subscribe((res) => {
      console.log("Res : "+res);
      this.service.getUserList().then((newdata) => {
          this.source.load(newdata);  
         });
    });
  }
  onSaveConfirm(event): void {
  
      console.log("LOG : "+event.newData.user_empID);
      event.confirm.resolve();
      this.service.onEdit(event.newData.user_empID,event.newData.name,event.newData.section_name,event.newData.userType_name,event.newData.value1);
      this.service.getUserList().then((data) => {
        this.source.load(data);
       });
    
    
  }
}
