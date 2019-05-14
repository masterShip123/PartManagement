import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { FormBuilder } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-part-master-view',
  templateUrl: './part-master-view.component.html',
  styleUrls: ['./part-master-view.component.scss']
})
export class PartMasterViewComponent implements OnInit {

  part_ID : string = "";
  part_name : string = "";
  maker_name : string = "";
  moldType_Name : string = "";
  moldType_ID : string = "";
  qty : string = "";
  value1 : string = "";
  activeFlag : string = "";
  maker_ID : string = "";
  min_stock : string = "";
  max_stock: string = "";
  price: string = "";
  location_name: string = "";
  location_ID: string = "";
  unitType_ID: string = "";
  unitType_name: string = "";
  source: LocalDataSource = new LocalDataSource();
  validEmail:boolean = false;
 
  private data: string[];
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<PartMasterViewComponent>,
    private toastrService: NbToastrService,private formBuilder: FormBuilder) { 
    
  }

  ngOnInit() {
    this.service.getDataSection();
    this.service.getDataMic();
    this.service.getDataUserType();
    this.service.getDataDepartment();
    this.service.getDataFactoryLine();
    this.service.getProvince();
    this.service.getDataUnitType();
    this.service.getDataLocation();
    this.service.getDataMaker();
    this.service.getDataMoldType();
    this.part_ID = JSON.parse(localStorage.getItem('part_ID'));
    this.part_name = JSON.parse(localStorage.getItem('part_name'));
    this.maker_name = JSON.parse(localStorage.getItem('maker_name'));
    this.moldType_Name = JSON.parse(localStorage.getItem('moldType_Name'));
    this.moldType_ID = JSON.parse(localStorage.getItem('moldType_ID'));
    this.qty = JSON.parse(localStorage.getItem('qty'));
    this.value1 = JSON.parse(localStorage.getItem('value1'));
    this.activeFlag = JSON.parse(localStorage.getItem('activeFlag'));
    this.maker_ID = JSON.parse(localStorage.getItem('maker_ID'));
    this.min_stock = JSON.parse(localStorage.getItem('min_stock'));
    this.max_stock = JSON.parse(localStorage.getItem('max_stock'));
    this.price = JSON.parse(localStorage.getItem('price'));
    this.location_name = JSON.parse(localStorage.getItem('location_name'));
    this.location_ID = JSON.parse(localStorage.getItem('location_ID'));
    this.unitType_ID = JSON.parse(localStorage.getItem('unitType_ID'));
    this.unitType_name = JSON.parse(localStorage.getItem('unitType_name'));

    this.service.getLogin().subscribe((Response) =>{
      this.data = Response;
  });
  this.service.getPartMasterList().then((dataa) => {
    this.source.load(dataa);
    console.log(this.source.load(dataa));
  });
  }
  cancel() {
    this.ref.close();
  }

}
