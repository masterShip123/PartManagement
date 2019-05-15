import { Component, OnInit } from '@angular/core';
import { userTypeList } from '../../../shared/index.model';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { Http } from '@angular/http';
import { SmartTableService } from '../../../@core/mock/smart-table.service';
import { NbDialogService } from '@nebular/theme';
import { UserTypeViewComponent } from '../user-type-view/user-type-view.component';

@Component({
  selector: 'ngx-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.scss']
})
export class UserTypeComponent implements OnInit {
  settings = {
    actions : {
       add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'view',
          title: '<i class="nb-person "></i>'
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
        width: '5%',
      },
      userType_ID : {
        title: 'User Type ID',
        type: 'string',
      },
      userType_name: {
        title: 'User Type Name',
        type: 'string',
        width: '60%',
      },
      value1: {
        title: 'Status',
        type: 'string',
        width: '5%',
      }
    }
  }
  private data: string[];
  private tbUserType:userTypeList[];
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
    this.service.getUseTyoeList().then((dataa) => {
      this.source.load(dataa);
      console.log(this.source.load(dataa));
    });
    
  }
 
  onCustom(event){
    localStorage.setItem('userType_ID', JSON.stringify(event.data.userType_ID)); 
    localStorage.setItem('userType_name', JSON.stringify(event.data.userType_name));
    localStorage.setItem('value1', JSON.stringify(event.data.value1));
  console.log(event.action);
    if(event.action == "view"){
      this.dialogService.open(UserTypeViewComponent)
    }
  }
 
}
