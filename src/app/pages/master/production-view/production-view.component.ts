import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { NbDialogRef, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-production-view',
  templateUrl: './production-view.component.html',
  styleUrls: ['./production-view.component.scss']
})
export class ProductionViewComponent implements OnInit {

  productionLine_ID: string = "";
  productionLine_name: string = "";
  factory_name: string = "";
  value1: string = "";
  
  registerForm: FormGroup;
  source: LocalDataSource = new LocalDataSource();
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<ProductionViewComponent>,
    private toastrService: NbToastrService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.service.getDataUser(); 
    this.service.getDataSection();
    this.service.getDataMic();
    this.service.getDataUserType();
    this.service.getDataFactoryLine();
    this.productionLine_ID = JSON.parse(localStorage.getItem('productionLine_ID'));
    this.productionLine_name = JSON.parse(localStorage.getItem('productionLine_name'));
    this.factory_name = JSON.parse(localStorage.getItem('factory_name'));
    
    this.value1 = JSON.parse(localStorage.getItem('value1'));
   
    
  }
  cancel() {
    this.ref.close();
  }

}
