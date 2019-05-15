import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { Http } from '@angular/http';
import { SmartTableService } from '../../../@core/mock/smart-table.service';
import { NbDialogService } from '@nebular/theme';
import { DepartmentAddComponent } from '../department-add/department-add.component';
import { DepartmentEditComponent } from '../department-edit/department-edit.component';
import { DepartmentViewComponent } from '../department-view/department-view.component';
import { departmentList } from '../../../shared/index.model';

@Component({
  selector: 'ngx-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
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
   
    // Colum ต้องให้ชื่อตรงกับ Model
    columns: {
      ID: {
        title: 'ID',
        type: 'number',
        width: '5%',
      },
      dept_ID: {
        title: 'Department ID',
        type: 'string',
      },
      dept_name: {
        title: 'Department Name',
        type: 'string',
        width: '80%',
      },
      value1: {
        title: 'Status',
        type: 'string',
        width: '10%',
      }
    }
  }
  private data: string[];
  private tbdepartment:departmentList[];
  //private tbUser:sectionList[];
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
    this.service.getDepartmentList().then((dataa) => {

      this.source.load(dataa);
      console.log(this.source.load(dataa));
    });

    
  }
 
  onCustom(event){
    localStorage.setItem('dept_ID', JSON.stringify(event.data.dept_ID));
    localStorage.setItem('dept_name', JSON.stringify(event.data.dept_name));
    localStorage.setItem('value1', JSON.stringify(event.data.value1));
    localStorage.setItem('activeFlag1', JSON.stringify(event.data.activeFlag));
      console.log("Shiip: "+JSON.parse(localStorage.getItem('activeFlag1')));
    // this.service.getDepartMentview(event.data.dept_ID).subscribe((Response) => {
    //   this.tbdepartment = Response; 
    //   localStorage.setItem('activeFlag1', JSON.stringify(this.tbdepartment[0].activeFlag));
    //   console.log("Shiip: "+JSON.parse(localStorage.getItem('activeFlag1')));
   
    // });
    // console.log(event.action);
    if(event.action == "delete"){
      
        console.log("LOG : "+event.data.user_empID);
        //event.confirm.resolve();
        this.service.onDeleteDepartment(event.data.dept_ID).then((newdata) => {
          this.source.load(newdata);  
        //console.log("Shipp : "+data.password)
       });

        // this.service.getDepartmentList().then((newdata) => {
        //   this.source.load(newdata);
        //   //console.log("Shipp : "+data.password)
        //  });
      
    }else if(event.action == "edit"){
      this.dialogService.open(DepartmentEditComponent).onClose.subscribe((res) => {
        console.log("Res : "+res);
        this.service.getDepartmentList().then((newdata) => {
            this.source.load(newdata);  
           });
      });
    }else if(event.action == "view"){
      this.dialogService.open(DepartmentViewComponent)
    }
  }
  
  onAddUserlist(): void{
    this.dialogService.open(DepartmentAddComponent).onClose.subscribe((res) => {
      console.log("Res : "+res);
      this.service.getDepartmentList().then((newdata) => {
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
