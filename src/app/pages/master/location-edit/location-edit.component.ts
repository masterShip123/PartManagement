import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { NbDialogRef, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrls: ['./location-edit.component.scss']
})
export class LocationEditComponent implements OnInit {
  location_ID: string = "";
  location_name: string = "";
  factory_Name: string = "";
  value1: string = "";
  factory_ID: string = "";
  activeFlag: string = "";
  registerForm: FormGroup;
  source: LocalDataSource = new LocalDataSource();
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<LocationEditComponent>,
    private toastrService: NbToastrService,private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.service.getDataSection();
    this.service.getDataMic();
    this.service.getDataUserType();
    this.service.getDataDepartment();
    this.service.getDataFactoryLine();
    this.service.getDataProductionLine();
    this.service.getDataMicTiming();
    this.location_ID = JSON.parse(localStorage.getItem('location_ID'));
    this.factory_Name = JSON.parse(localStorage.getItem('factory_Name'));
    this.location_name = JSON.parse(localStorage.getItem('location_name'));
    this.value1 = JSON.parse(localStorage.getItem('value1'));
    this.factory_ID = JSON.parse(localStorage.getItem('factory_ID'));
    this.activeFlag = JSON.parse(localStorage.getItem('activeFlag'));
    this.service.getLocationList().then((newdata) => {
      this.source.load(newdata);
      //console.log("Shipp : "+data.password)
     });
  }
  cancel() {
    this.ref.close();
  }
  save(locationname,factory,StatusValue){
    
      this.service.putLocationList(this.location_ID,locationname,factory,StatusValue);
      // this.ref.close();
      this.service.getLocationList().then((data) => {
        // this.source.update(data.section_name,sectionname);
        // this.source.update(data.section_ID,sectionid);
          // window.location.reload();
          this.ref.close(this.source.load(data));
       });
    
    
  }

}
