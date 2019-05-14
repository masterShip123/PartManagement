import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { NbDialogRef, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-machine-view',
  templateUrl: './machine-view.component.html',
  styleUrls: ['./machine-view.component.scss']
})
export class MachineViewComponent implements OnInit {

  machine_ID: string = "";
  machine_name: string = "";
  productionLine_name: string = "";
  value1: string = "";
  
  registerForm: FormGroup;
  source: LocalDataSource = new LocalDataSource();
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<MachineViewComponent>,
    private toastrService: NbToastrService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.service.getDataUser(); 
    this.service.getDataSection();
    this.service.getDataMic();
    this.service.getDataUserType();
    this.service.getDataFactoryLine();
    this.service.getDataProductionLine();
    this.machine_ID = JSON.parse(localStorage.getItem('machine_ID'));
    this.machine_name = JSON.parse(localStorage.getItem('machine_name'));
    this.productionLine_name = JSON.parse(localStorage.getItem('productionLine_name'));
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
