export class sectionList{
    section_ID : string;
   section_name : string;
      activeFlag : number;
     createDate : Date;
     createBy : string;
      updateDate : Date;
     updateBy : string;
      dept_ID : string;

}

export class miscdataList{
     misc_type : string;
     misc_code : number;
     value1 : string;
    value2 : string;
     value3 : string;
    value4 : string;
    value5 : string;
   activeFlag : number;
   createDate : Date;
    createBy: string;
   updateDate : Date;
     updateBy : string;

}



export class userTypeList{
    userType_ID : string;
        userType_name : string;
        activeFlag : number;
       createDate : Date;
        createBy : string;
         updateDate : Date;
        updateBy : string;

}
export class departmentList{
   dept_ID : string;
  dept_name : string;
activeFlag : number;

}
export class partMasterList{
  ID : number;
  part_ID : string;
  part_name : string;

} 
export class FactoryList{
  factory_ID: string;
  factory_Name : string;
// activeFlag : number;

}
export class ProductionLineList{
  productionLine_ID: string;
  productionLine_name : string;
// activeFlag : number;

}
export class ProvinceList{
  province_name_tha: string;
  province_code : string;
// activeFlag : number;

}
export class unitTypeList{
  unitType_ID: string;
  unitType_name : string;
// activeFlag : number;

}
export class locationList{
  location_ID: string;
  location_name : string;
// activeFlag : number;

}
export class makerList{
  maker_ID: string;
  maker_name : string;
// activeFlag : number;

}
export class machineList{
  machine_ID: string;
  machine_name : string;
// activeFlag : number;

}
export class requestTypeList{
  requestType_ID: string;
  requestType_Name : string;
// activeFlag : number;

}
export class moldTypeList{
  moldType_ID: string;
  moldType_Name : string;
// activeFlag : number;

}
export class checkToolList{
   ID : number;
      value1: string;
  timming_name: string;
  checkTool_ID : string;
   checkTool_Name : string;
  timing: number;
   activeFlag : number;
  createBy : string;
 
 updateBy : string;

}



export class user{
 
    user_ID: string;
          userType_ID : string;
          section_ID : string;
         user_name : string;
        user_password : string;
        user_empID: string;
         name: string;
       surname : string;
        tel : number;
        email : string;
        activeFlag : number;
        createDate : Date;
        createBy : string;
     updateDate : Date;
        updateBy : string;

}

export class tableFilename
{
  name: string
}

export class requestHeader{
  count : number;
  informDate: string;
  informTime: string;
 request_ID: string;
   requestType_ID : string;
   user_ID: string;
   section_ID : string;
   location_ID : string;
  beforeDetail : string;
  requestApproveBy : string;
  requestSectionBy : string;
   repairSectionBy: string;
  repairPersonBy : string;
  confirmRepairBy: string;
   qaApproveBy : string;
  achApproveBy: string;
  status: number;
  checkToolBefore_ID : string;
  checkToolAfter_ID : string;
  attachFile : number;
  afterComment : string;
   afterDescription : string;
  confirmJudment : number;
  concernQA: number;
  createBy : string;
 updateBy : string;
  
}


