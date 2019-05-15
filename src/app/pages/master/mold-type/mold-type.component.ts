import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { Http } from '@angular/http';
import { SmartTableService } from '../../../@core/mock/smart-table.service';
import { NbDialogService } from '@nebular/theme';
import { MoldTypeAddComponent } from '../mold-type-add/mold-type-add.component';
import { MoldTypeEditComponent } from '../mold-type-edit/mold-type-edit.component';
import { MoldTypeViewComponent } from '../mold-type-view/mold-type-view.component';

@Component({
  selector: 'ngx-mold-type',
  templateUrl: './mold-type.component.html',
  styleUrls: ['./mold-type.component.scss']
})
export class MoldTypeComponent implements OnInit {
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
      moldType_ID: {
        title: 'MoldType ID',
        type: 'string',
      },
      moldType_Name: {
        title: 'MoldType Name',
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
    this.service.getMoldTypeList().then((dataa) => {
      this.source.load(dataa);
      console.log(this.source.load(dataa));
    });
    
  }
 
  onCustom(event){
    localStorage.setItem('moldType_ID', JSON.stringify(event.data.moldType_ID));
    localStorage.setItem('moldType_Name', JSON.stringify(event.data.moldType_Name));
    localStorage.setItem('value1', JSON.stringify(event.data.value1));
    localStorage.setItem('activeFlag', JSON.stringify(event.data.activeFlag));
    
    // console.log(event.action);
    if(event.action == "delete"){
      
        // console.log("LOG : "+event.data.user_empID);
        //event.confirm.resolve();
        this.service.onDeleteMoldType(event.data.moldType_ID).then((newdata) => {
          this.source.load(newdata);  
        //console.log("Shipp : "+data.password)
       });
        // this.service.getMoldTypeList().then((newdata) => {
        //   this.source.load(newdata);  
        //   //console.log("Shipp : "+data.password)
        //  });
     
    }else if(event.action == "edit"){
      this.dialogService.open(MoldTypeEditComponent).onClose.subscribe((res) => {
        console.log("Res : "+res);
        this.service.getMoldTypeList().then((newdata) => {
            this.source.load(newdata);  
           });
      });
    }else if(event.action == "view"){
      this.dialogService.open(MoldTypeViewComponent)
    }
  }
  
  onAddUserlist(): void{
    this.dialogService.open(MoldTypeAddComponent).onClose.subscribe((res) => {
      console.log("Res : "+res);
      this.service.getMoldTypeList().then((newdata) => {
          this.source.load(newdata);  
         });
    });
  }

}
