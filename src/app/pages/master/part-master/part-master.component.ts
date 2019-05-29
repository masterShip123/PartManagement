import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { Http } from '@angular/http';
import { SmartTableService } from '../../../@core/mock/smart-table.service';
import { NbDialogService } from '@nebular/theme';
import { PartMasterAddComponent } from '../part-master-add/part-master-add.component';
import { PartMasterEditComponent } from '../part-master-edit/part-master-edit.component';
import { PartMasterViewComponent } from '../part-master-view/part-master-view.component';
import { Observable, Subscription, timer } from 'rxjs';
import { IdleTimeoutServiceService } from '../../../shared/idle-timeout-service.service';

@Component({
  selector: 'ngx-part-master',
  templateUrl: './part-master.component.html',
  styleUrls: ['./part-master.component.scss']
})
export class PartMasterComponent implements OnInit {
  public _counter: number = 0;
  public _status: string = "Initialized.";
  private _timer: Observable<number>;
  private _timerSubscription: Subscription;
  private _idleTimerSubscription: Subscription;
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
      part_ID: {
        title: 'Part ID',
        type: 'string',
      },
      part_name: {
        title: 'Part Name',
        type: 'string',
      },
      maker_name: {
        title: 'Maker/Brand',
        type: 'string',
      },
      moldType_Name: {
        title: 'Mold/Type',
        type: 'string',
      },
      qty: {
        title: 'Qty',
        type: 'number',
        width: '7%',
      },
      value1: {
        title: 'Status',
        type: 'string',
        width: '7%',
      }
    }
  }
  private data: string[];
  //private tbUser:sectionList[];
  showMs: boolean = false;
  //private sele: string[];
  ngOnInit() {
    //this.sele = ["Flex"]
    this.startCounter();
      this._idleTimerSubscription = this.idleTimeoutSvc.timeoutExpired.subscribe(res => {
        localStorage.setItem('currentUser', null);
        localStorage.setItem('passwordUser', null);
        localStorage.setItem('sectionID', null);
        //localStorage.removeItem('currentUser');
        this.router.navigate(['./login']);
      })
  }
  public startCounter() {
    if (this._timerSubscription) {
        this._timerSubscription.unsubscribe();
    }

    this._counter = 0;
    this._timer = timer(1000, 1000);
    this._timerSubscription = this._timer.subscribe(n => {
        this._counter++;
        this.changeRef.markForCheck();
    });
  }
  source: LocalDataSource = new LocalDataSource();
  currentUser : string
  constructor(private router: Router,public service: IndexService,public http: Http,private ser: SmartTableService,
    private dialogService: NbDialogService,private changeRef: ChangeDetectorRef,
    private idleTimeoutSvc: IdleTimeoutServiceService) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.service.getLogin().subscribe((Response) =>{
        this.data = Response;
    });
    //const data2 = this.service.getData();
    //this.source.load(data2);
    this.service.getPartMasterList().then((dataa) => {
      this.source.load(dataa);
      console.log(this.source.load(dataa));
    });
    
  }
 
  onCustom(event){
    this.startCounter();
    this.idleTimeoutSvc.resetTimer();
    localStorage.setItem('part_ID', JSON.stringify(event.data.part_ID));
    localStorage.setItem('part_name', JSON.stringify(event.data.part_name));
    localStorage.setItem('maker_name', JSON.stringify(event.data.maker_name));
    localStorage.setItem('maker_ID', JSON.stringify(event.data.maker_ID));
    localStorage.setItem('moldType_Name', JSON.stringify(event.data.moldType_Name));
    localStorage.setItem('moldType_ID', JSON.stringify(event.data.moldType_ID));
    localStorage.setItem('qty', JSON.stringify(event.data.qty));
    localStorage.setItem('value1', JSON.stringify(event.data.value1));
    localStorage.setItem('activeFlag', JSON.stringify(event.data.activeFlag));
    localStorage.setItem('min_stock', JSON.stringify(event.data.min_stock));
    localStorage.setItem('max_stock', JSON.stringify(event.data.max_stock));
    localStorage.setItem('price', JSON.stringify(event.data.price));
    console.log("Price : "+event.data.price);
    localStorage.setItem('location_name', JSON.stringify(event.data.location_name));
    localStorage.setItem('location_ID', JSON.stringify(event.data.location_ID));
    localStorage.setItem('unitType_ID', JSON.stringify(event.data.unitType_ID));
    localStorage.setItem('unitType_name', JSON.stringify(event.data.unitType_name));
    
    // console.log(event.action);
    if(event.action == "delete"){
      
        // console.log("LOG : "+event.data.user_empID);
        //event.confirm.resolve();
        this.service.onDeletePartMaster(event.data.part_ID).then((newdata) => {
          this.source.load(newdata);  
        //console.log("Shipp : "+data.password)
       });
        // this.service.getPartMasterList().then((newdata) => {
        //   this.source.load(newdata);  
        //   //console.log("Shipp : "+data.password)
        //  });
     
    }else if(event.action == "edit"){
      this.dialogService.open(PartMasterEditComponent).onClose.subscribe((res) => {
        console.log("Res : "+res);
        this.service.getPartMasterList().then((newdata) => {
            this.source.load(newdata);  
           });
      });
    }else if(event.action == "view"){
      this.dialogService.open(PartMasterViewComponent)
    }
  }
  
  onAddUserlist(): void{
    this.startCounter();
    this.idleTimeoutSvc.resetTimer();
    this.dialogService.open(PartMasterAddComponent).onClose.subscribe((res) => {
      console.log("Res : "+res);
      this.service.getPartMasterList().then((newdata) => {
          this.source.load(newdata);  
         });
    });
  }

}
