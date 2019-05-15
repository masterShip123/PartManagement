import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { Http } from '@angular/http';
import { SmartTableService } from '../../../@core/mock/smart-table.service';
import { NbDialogService } from '@nebular/theme';
import { SectionAddComponent } from '../section-add/section-add.component';
import { user, sectionList } from '../../../shared/index.model';
import { SectionEditComponent } from '../section-edit/section-edit.component';
import { SectionViewComponent } from '../section-view/section-view.component';

@Component({
  selector: 'ngx-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {
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
      section_ID: {
        title: 'Section ID',
        type: 'string',
      },
      section_name: {
        title: 'Section Name',
        type: 'string',
        width: '50%',
      },
      dept_name: {
        title: 'Dept Name',
        type: 'string',
        width: '30%',
      },
      value1: {
        title: 'Status',
        type: 'string',
        width: '10%',
      }
    }
  }
  private data: string[];
  private tbUser:sectionList[];
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
    this.service.getSectionList().then((dataa) => {
      this.source.load(dataa);
      console.log(this.source.load(dataa));
    });
    
  }
 
  onCustom(event){
    localStorage.setItem('section_ID', JSON.stringify(event.data.section_ID));
    localStorage.setItem('section_name', JSON.stringify(event.data.section_name));
    localStorage.setItem('dept_name', JSON.stringify(event.data.dept_name));
    localStorage.setItem('value1', JSON.stringify(event.data.value1));
    localStorage.setItem('activeFlag2', JSON.stringify(event.data.activeFlag));
    localStorage.setItem('dept_ID', JSON.stringify(event.data.dept_ID));

    // console.log(event.action);
    if(event.action == "delete"){
      
        console.log("LOG : "+event.data.user_empID);
        //event.confirm.resolve();
        // this.service.onDeleteSection(event.data.section_ID);
        this.service.onDeleteSection(event.data.section_ID).then((newdata) => {
          this.source.load(newdata);  
        //console.log("Shipp : "+data.password)
       });
        // this.service.getSectionList().then((newdata) => {
          
        //   this.source.load(newdata);  
        //   //console.log("Shipp : "+data.password)
        //  });
  
    }else if(event.action == "edit"){
     
      this.dialogService.open(SectionEditComponent).onClose.subscribe((res) => {
        this.service.getSectionList().then((newdata) => {
          this.source.load(newdata);  
         });
    
    });
    }else if(event.action == "view"){
      this.dialogService.open(SectionViewComponent)
    }
  }
  
  onAddUserlist(): void{
      
    this.dialogService.open(SectionAddComponent).onClose.subscribe((res) => {
      console.log("Res : "+res);
      this.service.getSectionList().then((newdata) => {
          this.source.load(newdata);  
         });
    });
    // this.dialogService.open(SectionAddComponent);
    //  this.service.getSectionList().then((newdata) => {
    //   this.source.load(newdata);  
      
    //   //console.log("Shipp : "+data.password)
    //  });
    
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
