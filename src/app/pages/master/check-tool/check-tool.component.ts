import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { IndexService } from '../../../shared/index.service';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { SmartTableService } from '../../../@core/mock/smart-table.service';
import { NbDialogService } from '@nebular/theme';
import { CheckToolAddComponent } from '../check-tool-add/check-tool-add.component';
import { CheckToolEditComponent } from '../check-tool-edit/check-tool-edit.component';
import { CheckToolViewComponent } from '../check-tool-view/check-tool-view.component';
import { checkToolList } from '../../../shared/index.model';

@Component({
  selector: 'ngx-check-tool',
  templateUrl: './check-tool.component.html',
  styleUrls: ['./check-tool.component.scss']
})
export class CheckToolComponent implements OnInit {
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
      position: 'right',
    },
   
    // Colum ต้องให้ชื่อตรงกับ Model
    columns: {
      ID: {
        title: 'ID',
        type: 'number',
        // width: '60px',
      },
      checkTool_ID: {
        title: 'CheckTool ID',
        type: 'string',
        width: '30%',
      },
      checkTool_Name: {
        title: 'CheckTool Name',
        type: 'string',
        width: '50%',
      },
      timming_name: {
        title: 'Timing',
        type: 'string',
        
      },
      value1: {
        title: 'Status',
        type: 'string',
        // width: '50px',
      }
      
    }
  }
  private data: string[];
  private tbchecktool:checkToolList[];
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
    this.service.getCheckToolList().then((dataa) => {
      this.source.load(dataa);
      console.log(this.source.load(dataa));
    });
    
  }
 
  onCustom(event){
    localStorage.setItem('checkTool_ID', JSON.stringify(event.data.checkTool_ID));
    localStorage.setItem('checkTool_Name', JSON.stringify(event.data.checkTool_Name));
    localStorage.setItem('timming_name', JSON.stringify(event.data.timming_name));
    localStorage.setItem('value1', JSON.stringify(event.data.value1));
    localStorage.setItem('activeFlag', JSON.stringify(event.data.activeFlag));
      localStorage.setItem('timing', JSON.stringify(event.data.timing));
    
    // console.log(event.action);
    if(event.action == "delete"){
     
        console.log("LOG : "+event.data.user_empID);
        //event.confirm.resolve();
        this.service.onDeleteCheckTool(event.data.checkTool_ID).then((newdata) => {
          this.source.load(newdata);  
        //console.log("Shipp : "+data.password)
       });
        // this.service.getCheckToolList().then((newdata) => {
        //   this.source.load(newdata);  
        //   //console.log("Shipp : "+data.password)
        //  });
   
    }else if(event.action == "edit"){
      this.dialogService.open(CheckToolEditComponent).onClose.subscribe((res) => {
        console.log("Res : "+res);
        this.service.getCheckToolList().then((newdata) => {
            this.source.load(newdata);  
           });
      });
    }else if(event.action == "view"){
      this.dialogService.open(CheckToolViewComponent)
    }
  }
  
  onAddUserlist(): void{
    this.dialogService.open(CheckToolAddComponent).onClose.subscribe((res) => {
      console.log("Res : "+res);
      this.service.getCheckToolList().then((newdata) => {
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
