import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { MachineViewComponent } from '../machine-view/machine-view.component';

@Component({
  selector: 'ngx-location-view',
  templateUrl: './location-view.component.html',
  styleUrls: ['./location-view.component.scss']
})
export class LocationViewComponent implements OnInit {

  location_ID: string = "";
  factory_Name: string = "";
  location_name: string = "";
  value1: string = "";
  
  registerForm: FormGroup;
  source: LocalDataSource = new LocalDataSource();
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<MachineViewComponent>,
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
    this.service.getMachineList().then((newdata) => {
      this.source.load(newdata);
      //console.log("Shipp : "+data.password)
     });
   
   
    
  }
  cancel() {
    this.ref.close();
  }

}
