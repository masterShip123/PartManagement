import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Response } from '@angular/http';
import { sectionList, miscdataList, userTypeList, user, departmentList, FactoryList, ProductionLineList, ProvinceList, unitTypeList, locationList, makerList, moldTypeList } from './index.model';
import { HttpClient } from "@angular/common/http";


@Injectable()
export class IndexService {

 list: sectionList[];
 listmic: miscdataList[];
 listTiming: miscdataList[];
 listUsertype: userTypeList[];
 listUser: user[];
 listDepart: departmentList[];
 listFactory : FactoryList[];
 listproductionLine : ProductionLineList[];
 listprovince : ProvinceList[];
 listunitType: unitTypeList[];
 listLocation : locationList[];
 listMaker : makerList[]
 listmoldType: moldTypeList[]
  constructor(private http: Http,private httpc : HttpClient) { }
  rows = [];
  user = "";
 
  getLogin() {
    return this.http.get("http://localhost:62943/showTableWebService.asmx/GetLogin").map((res) => res.json());
  }
  getwherelogin(username,password){
    this.user = username;
    return this.http.get('http://localhost:62943/showTableWebService.asmx/GetWhereLogin?username='+username+'&password='+password).map((res) => res.json());
   
  }
  getUserview(username){
    return this.http.get('http://localhost:62943/showTableWebService.asmx/GetUserView?username='+username).map((res) => res.json());
  }
  getChecktoolview(username){
    return this.http.get('http://localhost:62943/showTableWebService.asmx/GetChecktoolView?username='+username).map((res) => res.json());
  }
  getDepartMentview(username){
    return this.http.get('http://localhost:62943/showTableWebService.asmx/GetDepartMentView?username='+username).map((res) => res.json());
  }

  
  getUserList(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //resolve(this.smartTableData);
        this.http.get("http://localhost:62943/showTableWebService.asmx/GetUserJoinList",{
          }).subscribe((res: Response) => {
                this.rows = res.json();
                resolve(res.json());  // ใส่ค่าในตาราง
                console.log(this.rows);
              }, (error: any) => {
            });
      }, );
    });
  }

  getSectionList(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //resolve(this.smartTableData);
        this.http.get("http://localhost:62943/showTableWebService.asmx/GetSectionJoinDepartment",{
          }).subscribe((res: Response) => {
                this.rows = res.json();
                resolve(this.rows);  // ใส่ค่าในตาราง
                console.log(this.rows);
              }, (error: any) => {
            });
      });
    });
  }

  getProductionLineList(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //resolve(this.smartTableData);
        this.http.get("http://localhost:62943/showTableWebService.asmx/GetProductionLineJoin",{
          }).subscribe((res: Response) => {
                this.rows = res.json();
                resolve(this.rows);  // ใส่ค่าในตาราง
                console.log(this.rows);
              }, (error: any) => {
            });
      });
    });
  }
  getMakerLineList(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //resolve(this.smartTableData);
        this.http.get("http://localhost:62943/showTableWebService.asmx/GetMakerLineJoin",{
          }).subscribe((res: Response) => {
                this.rows = res.json();
                resolve(this.rows);  // ใส่ค่าในตาราง
                console.log(this.rows);
              }, (error: any) => {
            });
      });
    });
  }
  getMoldTypeList(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //resolve(this.smartTableData);
        this.http.get("http://localhost:62943/showTableWebService.asmx/GetMoldTypeJoin",{
          }).subscribe((res: Response) => {
                this.rows = res.json();
                resolve(this.rows);  // ใส่ค่าในตาราง
                console.log(this.rows);
              }, (error: any) => {
            });
      });
    });
  }
  getUnitTypeList(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //resolve(this.smartTableData);
        this.http.get("http://localhost:62943/showTableWebService.asmx/GetUnitTypeJoin",{
          }).subscribe((res: Response) => {
                this.rows = res.json();
                resolve(this.rows);  // ใส่ค่าในตาราง
                console.log(this.rows);
              }, (error: any) => {
            });
      });
    });
  }
  getPartMasterList(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //resolve(this.smartTableData);
        this.http.get("http://localhost:62943/showTableWebService.asmx/GetPartMasterJoin",{
          }).subscribe((res: Response) => {
                this.rows = res.json();
                resolve(this.rows);  // ใส่ค่าในตาราง
                console.log(this.rows);
              }, (error: any) => {
            });
      });
    });
  }
  getMachineList(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //resolve(this.smartTableData);
        this.http.get("http://localhost:62943/showTableWebService.asmx/GetMachineJoin",{
          }).subscribe((res: Response) => {
                this.rows = res.json();
                resolve(this.rows);  // ใส่ค่าในตาราง
                console.log(this.rows);
              }, (error: any) => {
            });
      });
    });
  }
  getCheckToolList(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //resolve(this.smartTableData);
        this.http.get("http://localhost:62943/showTableWebService.asmx/GetCheckToolJoin",{
          }).subscribe((res: Response) => {
                this.rows = res.json();
                resolve(this.rows);  // ใส่ค่าในตาราง
                console.log(this.rows);
              }, (error: any) => {
            });
      });
    });
  }
  getRequestTypeList(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //resolve(this.smartTableData);
        this.http.get("http://localhost:62943/showTableWebService.asmx/GetRequestTypeJoin",{
          }).subscribe((res: Response) => {
                this.rows = res.json();
                resolve(this.rows);  // ใส่ค่าในตาราง
                console.log(this.rows);
              }, (error: any) => {
            });
      });
    });
  }
  getFactoryList(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //resolve(this.smartTableData);
        this.http.get("http://localhost:62943/showTableWebService.asmx/GetFactoryJoin",{
          }).subscribe((res: Response) => {
                this.rows = res.json();
                resolve(this.rows);  // ใส่ค่าในตาราง
                console.log(this.rows);
              }, (error: any) => {
            });
      });
    });
  }
  getLocationList(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //resolve(this.smartTableData);
        this.http.get("http://localhost:62943/showTableWebService.asmx/GetLocationJoin",{
          }).subscribe((res: Response) => {
                this.rows = res.json();
                resolve(this.rows);  // ใส่ค่าในตาราง
                console.log(this.rows);
              }, (error: any) => {
            });
      });
    });
  }

  getDepartmentList(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //resolve(this.smartTableData);
        this.http.get("http://localhost:62943/showTableWebService.asmx/GetDepartment",{
          }).subscribe((res: Response) => {
                this.rows = res.json();
                resolve(this.rows);  // ใส่ค่าในตาราง
                console.log(this.rows);
              }, (error: any) => {
            });
      });
    });
  }

  getUseTyoeList(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //resolve(this.smartTableData);
        this.http.get("http://localhost:62943/showTableWebService.asmx/GetUserTypeListJoin",{
          }).subscribe((res: Response) => {
                this.rows = res.json();
                resolve(this.rows);  // ใส่ค่าในตาราง
                console.log(this.rows);
              }, (error: any) => {
            });
      });
    });
  }

  onDeleteRowBtnClick2(id): Promise<any> {
    console.log("ID: "+id);
    return new Promise(( resolve,reject) => {
      setTimeout(() => {
        // resolve(this.smartTableData);
       
          return this.http.get('http://localhost:62943/showTableWebService.asmx/DeleteUserList?userid='+id,{
                }).subscribe((res: Response) => {
                  this.getUserList().then((newdata) => {
                    resolve(newdata);
                    //console.log("Shipp : "+data.password)
                   });
              })
       
      });
    });
  }
  onDeleteSection(id): Promise<any> {
    console.log("ID: "+id);
    return new Promise(( resolve,reject) => {
      setTimeout(() => {
        // resolve(this.smartTableData);
       
          return this.http.get('http://localhost:62943/showTableWebService.asmx/DeleteSectionList?userid='+id,{
                }).subscribe((res: Response) => {
                  this.getSectionList().then((newdata) => {
                    resolve(newdata);
                    //console.log("Shipp : "+data.password)
                   });
              })
       
      });
    });
  }
  onDeleteProductionLine(id): Promise<any> {
    console.log("ID: "+id);
    return new Promise(( resolve,reject) => {
      setTimeout(() => {
        // resolve(this.smartTableData);
       
          return this.http.get('http://localhost:62943/showTableWebService.asmx/DeleteProductionLineList?userid='+id,{
                }).subscribe((res: Response) => {
                  this.getProductionLineList().then((newdata) => {
                    resolve(newdata);
                    //console.log("Shipp : "+data.password)
                   });
                 
              })
       
      });
    });
  }
  onDeleteMaker(id): Promise<any> {
    console.log("ID: "+id);
    return new Promise(( resolve,reject) => {
      setTimeout(() => {
        // resolve(this.smartTableData);
       
          return this.http.get('http://localhost:62943/showTableWebService.asmx/DeleteMaker?userid='+id,{
                }).subscribe((res: Response) => {
                  this.getMakerLineList().then((newdata) => {
                    resolve(newdata);
                    //console.log("Shipp : "+data.password)
                   });
              })
       
      });
    });
  }
  onDeleteMoldType(id): Promise<any> {
    console.log("ID: "+id);
    return new Promise(( resolve,reject) => {
      setTimeout(() => {
        // resolve(this.smartTableData);
       
          return this.http.get('http://localhost:62943/showTableWebService.asmx/DeleteMoldType?userid='+id,{
                }).subscribe((res: Response) => {
                  this.getMoldTypeList().then((newdata) => {
                    resolve(newdata);
                    //console.log("Shipp : "+data.password)
                   });
              })
       
      });
    });
  }
  onDeleteUnitType(id): Promise<any> {
    console.log("ID: "+id);
    return new Promise(( resolve,reject) => {
      setTimeout(() => {
        // resolve(this.smartTableData);
       
          return this.http.get('http://localhost:62943/showTableWebService.asmx/DeleteUnitType?userid='+id,{
                }).subscribe((res: Response) => {
                  this.getUnitTypeList().then((newdata) => {
                    resolve(newdata);
                    //console.log("Shipp : "+data.password)
                   });
              })
       
      });
    });
  }
  onDeletePartMaster(id): Promise<any> {
    console.log("ID: "+id);
    return new Promise(( resolve,reject) => {
      setTimeout(() => {
        // resolve(this.smartTableData);
       
          return this.http.get('http://localhost:62943/showTableWebService.asmx/DeletePartMaster?userid='+id,{
                }).subscribe((res: Response) => {
                  this.getPartMasterList().then((newdata) => {
                    resolve(newdata);
                    //console.log("Shipp : "+data.password)
                   });
              })
       
      });
    });
  }
  onDeleteMachine(id): Promise<any> {
    console.log("ID: "+id);
    return new Promise(( resolve,reject) => {
      setTimeout(() => {
        // resolve(this.smartTableData);
       
          return this.http.get('http://localhost:62943/showTableWebService.asmx/DeleteMachineList?userid='+id,{
                }).subscribe((res: Response) => {
                  this.getMachineList().then((newdata) => {
                    resolve(newdata);
                    //console.log("Shipp : "+data.password)
                   });
              })
       
      });
    });
  }
  onDeleteCheckTool(id): Promise<any> {
    console.log("ID: "+id);
    return new Promise(( resolve,reject) => {
      setTimeout(() => {
        // resolve(this.smartTableData);
       
          return this.http.get('http://localhost:62943/showTableWebService.asmx/DeleteCheckToolList?userid='+id,{
                }).subscribe((res: Response) => {
                  this.getCheckToolList().then((newdata) => {
                    resolve(newdata);
                    //console.log("Shipp : "+data.password)
                   });
              })
       
      });
    });
  }
  onDeleteRequestType(id): Promise<any> {
    console.log("ID: "+id);
    return new Promise(( resolve,reject) => {
      setTimeout(() => {
        // resolve(this.smartTableData);
       
          return this.http.get('http://localhost:62943/showTableWebService.asmx/DeleteRequestTypeList?userid='+id,{
                }).subscribe((res: Response) => {
                  this.getRequestTypeList().then((newdata) => {
                    resolve(newdata);
                    //console.log("Shipp : "+data.password)
                   });
              })
       
      });
    });
  }
  onDeleteFactory(id): Promise<any> {
    console.log("ID: "+id);
    return new Promise(( resolve,reject) => {
      setTimeout(() => {
        // resolve(this.smartTableData);
       
          return this.http.get('http://localhost:62943/showTableWebService.asmx/DeleteFactoryList?userid='+id,{
                }).subscribe((res: Response) => {
                  this.getFactoryList().then((newdata) => {
                    resolve(newdata);
                    //console.log("Shipp : "+data.password)
                   });
              })
       
      });
    });
  }
  onDeleteLocation(id): Promise<any> {
    console.log("ID: "+id);
    return new Promise(( resolve,reject) => {
      setTimeout(() => {
        // resolve(this.smartTableData);
       
          return this.http.get('http://localhost:62943/showTableWebService.asmx/DeleteLocationList?userid='+id,{
                }).subscribe((res: Response) => {
                  this.getLocationList().then((newdata) => {
                    resolve(newdata);
                    //console.log("Shipp : "+data.password)
                   });
              })
       
      });
    });
  }
  onDeleteDepartment(id): Promise<any> {
    console.log("ID: "+id);
    return new Promise(( resolve,reject) => {
      setTimeout(() => {
        // resolve(this.smartTableData);
       
          return this.http.get('http://localhost:62943/showTableWebService.asmx/DeleteDepartmentList?userid='+id,{
                }).subscribe((res: Response) => {
                  this.getDepartmentList().then((newdata) => {
                    resolve(newdata);
                    //console.log("Shipp : "+data.password)
                   });
              })
       
      });
    });
  }
  putChangPassWord(id,password): Promise<any> {
    console.log("ID: "+id);
    return new Promise(( reject) => {
      setTimeout(() => {
        // resolve(this.smartTableData);
       
          return this.http.get('http://localhost:62943/showTableWebService.asmx/PutChangpassword?userid='+id+'&user_password='+password,{
                }).subscribe((res: Response) => {
              })
       
      });
    });
  }
  onEdit(user_empID,name,section_name,userType_name,value1): Promise<any> {
    console.log("ID: "+JSON.parse(localStorage.getItem('currentUser')));
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // resolve(this.smartTableData);
       
          return this.http.get('http://localhost:62943/showTableWebService.asmx/EditUserList?user_empID='+user_empID
          +'&name='+name+'&section_name='+section_name+'&userType_name='+userType_name+'&value1='+value1,{
                }).subscribe((res: Response) => {
              })
       
      });
    });
  }

  getDataUser() {
    this.httpc.get("http://localhost:62943/showTableWebService.asmx/GetLogin")
    .toPromise().then(res => this.listUser = res as user[]);
  }
  getDataSection(){
    // return this.http.get("http://localhost:62943/showTableWebService.asmx/GetSectionList").map((res) => res.json());
    this.httpc.get("http://localhost:62943/showTableWebService.asmx/GetSectionList")
    .toPromise().then(res => this.list = res as sectionList[]);
  }
  getDataDepartment(){
    // return this.http.get("http://localhost:62943/showTableWebService.asmx/GetSectionList").map((res) => res.json());
    this.httpc.get("http://localhost:62943/showTableWebService.asmx/GetDepartmentList")
    .toPromise().then(res => this.listDepart = res as departmentList[]);
  }
  getDataFactoryLine(){
    // return this.http.get("http://localhost:62943/showTableWebService.asmx/GetSectionList").map((res) => res.json());
    this.httpc.get("http://localhost:62943/showTableWebService.asmx/GetFactoryList")
    .toPromise().then(res => this.listFactory = res as FactoryList[]);
  }
  getDataUnitType(){
    // return this.http.get("http://localhost:62943/showTableWebService.asmx/GetSectionList").map((res) => res.json());
    this.httpc.get("http://localhost:62943/showTableWebService.asmx/GetUnitTypeList")
    .toPromise().then(res => this.listunitType = res as unitTypeList[]);
  }
  getDataLocation(){
    // return this.http.get("http://localhost:62943/showTableWebService.asmx/GetSectionList").map((res) => res.json());
    this.httpc.get("http://localhost:62943/showTableWebService.asmx/GetLocationList")
    .toPromise().then(res => this.listLocation = res as locationList[]);
  }
  getDataMaker(){
    // return this.http.get("http://localhost:62943/showTableWebService.asmx/GetSectionList").map((res) => res.json());
    this.httpc.get("http://localhost:62943/showTableWebService.asmx/GetMakerList")
    .toPromise().then(res => this.listMaker = res as makerList[]);
  }
  getDataMoldType(){
    // return this.http.get("http://localhost:62943/showTableWebService.asmx/GetSectionList").map((res) => res.json());
    this.httpc.get("http://localhost:62943/showTableWebService.asmx/GetMoldList")
    .toPromise().then(res => this.listmoldType = res as moldTypeList[]);
  }
  getProvince(){
    // return this.http.get("http://localhost:62943/showTableWebService.asmx/GetSectionList").map((res) => res.json());
    this.httpc.get("http://localhost:62943/showTableWebService.asmx/GetProvinceList")
    .toPromise().then(res => this.listprovince = res as ProvinceList[]);
  }
  getDataProductionLine(){
    // return this.http.get("http://localhost:62943/showTableWebService.asmx/GetSectionList").map((res) => res.json());
    this.httpc.get("http://localhost:62943/showTableWebService.asmx/GetProductionLine")
    .toPromise().then(res => this.listproductionLine = res as ProductionLineList[]);
  }

  getDataMic(){
    // return this.http.get("http://localhost:62943/showTableWebService.asmx/GetSectionList").map((res) => res.json());
    this.httpc.get("http://localhost:62943/showTableWebService.asmx/GetTbmMiscDataList")
    .toPromise().then(res => this.listmic = res as miscdataList[]);
  }
  getDataMicTiming(){
    // return this.http.get("http://localhost:62943/showTableWebService.asmx/GetSectionList").map((res) => res.json());
    this.httpc.get("http://localhost:62943/showTableWebService.asmx/GetTbmMiscDataTimingList")
    .toPromise().then(res => this.listTiming = res as miscdataList[]);
  }
  getDataUserType(){
    // return this.http.get("http://localhost:62943/showTableWebService.asmx/GetSectionList").map((res) => res.json());
    this.httpc.get("http://localhost:62943/showTableWebService.asmx/GetUserTypeList")
    .toPromise().then(res => this.listUsertype = res as userTypeList[]);
  }
  postDataUser(surname,password,userid,Email,Tel,Name,Username,empid,idsection,miccode,userTypeID): Promise<any> {
    //this.user
    console.log("ship : "+this.user);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // resolve(this.smartTableData);
       
          return this.http.get('http://localhost:62943/showTableWebService.asmx/InsertUser?loginname='+JSON.parse(localStorage.getItem('currentUser'))
          +'&surname='+surname+'&password='+password
          +'&userid='+userid+'&Email='+Email+'&Tel='+Tel
          +'&Name='+Name+'&Username='+Username+'&empid='
          +empid+'&idsection='+idsection
          +'&miccode='+miccode+'&userTypeID='+userTypeID,{
                }).subscribe((res: Response) => {
                  
              })
       
      });
    });
  }

  postDataSection(department,sectionid,sectionname,StatusValue): Promise<any> {
    

    return new Promise((resolve, reject) => {
      setTimeout(() => {
          return this.http.get('http://localhost:62943/showTableWebService.asmx/InsertSection?department='+department
          +'&sectionid='+sectionid+'&sectionname='+sectionname
          +'&StatusValue='+StatusValue,{
                }).subscribe((res: Response) => {
                  
                }, (error: any) => {
              })
       
      });
    });
  }
  postDataProductionLine(productionLinename,productionLineid,factoryname,StatusValue): Promise<any> {
    

    return new Promise((resolve, reject) => {
      setTimeout(() => {
          return this.http.get('http://localhost:62943/showTableWebService.asmx/InsertProductionLine?productionLinename='+productionLinename
          +'&productionLineid='+productionLineid+'&factoryname='+factoryname
          +'&StatusValue='+StatusValue,{
                }).subscribe((res: Response) => {
                  this.rows = res.json();
                  resolve(this.rows);  // ใส่ค่าในตาราง
                  console.log(this.rows);
                }, (error: any) => {
              })
       
      });
    });
  }
  postDataMaker(makerid, makername, contactName, lastName, tel
    , email, address, province, StatusValue): Promise<any> {
    

    return new Promise((resolve, reject) => {
      setTimeout(() => {
          return this.http.get('http://localhost:62943/showTableWebService.asmx/InsertMaker?makerid='+makerid
          +'&makername='+makername+'&contactName='+contactName+'&lastName='+lastName+'&tel='+tel+'&email='+email+'&address='+address
          +'&province='+province+'&StatusValue='+StatusValue,{
                }).subscribe((res: Response) => {
                  this.rows = res.json();
                  resolve(this.rows);  // ใส่ค่าในตาราง
                  console.log(this.rows);
                }, (error: any) => {
              })
       
      });
    });
  }
  postDataPartMaster(partid, partname, qty , price , minstock,maxstock,
     unitype, location,maker,moldType, StatusValue,sysPart_ID): Promise<any> {
    

    return new Promise((resolve, reject) => {
      setTimeout(() => {
          return this.http.get('http://localhost:62943/showTableWebService.asmx/InsertPartMaster?partid='+partid
          +'&partname='+partname+'&qty='+qty+'&price='+price+'&minstock='+minstock+'&maxstock='+maxstock+'&unitype='+unitype
          +'&location='+location+'&maker='+maker+'&moldType='+moldType+'&StatusValue='+StatusValue+'&sysPart_ID='+sysPart_ID,{
                }).subscribe((res: Response) => {
                  this.rows = res.json();
                  resolve(this.rows);  // ใส่ค่าในตาราง
                  console.log(this.rows);
                }, (error: any) => {
              })
       
      });
    });
  }
  postDataMachine(machinename,machineid,productionLine,StatusValue): Promise<any> {
    

    return new Promise((resolve, reject) => {
      setTimeout(() => {
          return this.http.get('http://localhost:62943/showTableWebService.asmx/InsertMachine?machinename='+machinename
          +'&machineid='+machineid+'&productionLine='+productionLine
          +'&StatusValue='+StatusValue,{
                }).subscribe((res: Response) => {
                  this.rows = res.json();
                  resolve(this.rows);  // ใส่ค่าในตาราง
                  console.log(this.rows);
                }, (error: any) => {
              })
       
      });
    });
  }
  postDataCheckTool(checkToolid,checkToolname,timing,StatusValue): Promise<any> {
    

    return new Promise((resolve, reject) => {
      setTimeout(() => {
          return this.http.get('http://localhost:62943/showTableWebService.asmx/InsertCheckTool?mcheckToolid='+checkToolid
          +'&checkToolname='+checkToolname+'&timing='+timing
          +'&StatusValue='+StatusValue,{
                }).subscribe((res: Response) => {
                  this.rows = res.json();
                  resolve(this.rows);  // ใส่ค่าในตาราง
                  console.log(this.rows);
                }, (error: any) => {
              })
       
      });
    });
  }
  postDataLocation(locationid,locationname,factory,StatusValue): Promise<any> {
    

    return new Promise((resolve, reject) => {
      setTimeout(() => {
          return this.http.get('http://localhost:62943/showTableWebService.asmx/InsertLocation?locationid='+locationid
          +'&locationname='+locationname+'&factory='+factory
          +'&StatusValue='+StatusValue,{
                }).subscribe((res: Response) => {
                  this.rows = res.json();
                  resolve(this.rows);  // ใส่ค่าในตาราง
                  console.log(this.rows);
                }, (error: any) => {
              })
       
      });
    });
  }
  postDataRequestType(requestTypeid,requestTypename,StatusValue): Promise<any> {
    

    return new Promise((resolve, reject) => {
      setTimeout(() => {
          return this.http.get('http://localhost:62943/showTableWebService.asmx/InsertRequestType?requestTypeid='+requestTypeid
          +'&requestTypename='+requestTypename+'&StatusValue='+StatusValue,{
                }).subscribe((res: Response) => {
                  this.rows = res.json();
                  resolve(this.rows);  // ใส่ค่าในตาราง
                  console.log(this.rows);
                }, (error: any) => {
              })
       
      });
    });
  }
  postDataFactory(factoryid,factoryname,StatusValue): Promise<any> {
    

    return new Promise((resolve, reject) => {
      setTimeout(() => {
          return this.http.get('http://localhost:62943/showTableWebService.asmx/InsertFactory?factoryid='+factoryid
          +'&factoryname='+factoryname+'&StatusValue='+StatusValue,{
                }).subscribe((res: Response) => {
                  this.rows = res.json();
                  resolve(this.rows);  // ใส่ค่าในตาราง
                  console.log(this.rows);
                }, (error: any) => {
              })
       
      });
    });
  }
  postDataMoldType(moldTypeid,moldTypename,StatusValue): Promise<any> {
    

    return new Promise((resolve, reject) => {
      setTimeout(() => {
          return this.http.get('http://localhost:62943/showTableWebService.asmx/InsertMoldType?moldTypeid='+moldTypeid
          +'&moldTypename='+moldTypename+'&StatusValue='+StatusValue,{
                }).subscribe((res: Response) => {
                  this.rows = res.json();
                  resolve(this.rows);  // ใส่ค่าในตาราง
                  console.log(this.rows);
                }, (error: any) => {
              })
       
      });
    });
  }
  postDataUnitType(unitTypeid,unitTypename,StatusValue): Promise<any> {
    

    return new Promise((resolve, reject) => {
      setTimeout(() => {
          return this.http.get('http://localhost:62943/showTableWebService.asmx/InsertUnitType?unitTypeid='+unitTypeid
          +'&unitTypename='+unitTypename+'&StatusValue='+StatusValue,{
                }).subscribe((res: Response) => {
                  this.rows = res.json();
                  resolve(this.rows);  // ใส่ค่าในตาราง
                  console.log(this.rows);
                }, (error: any) => {
              })
       
      });
    });
  }
  postDataDepartment(departmentid,departmentname,StatusValue): Promise<any> {
    

    return new Promise((resolve, reject) => {
      setTimeout(() => {
          return this.http.get('http://localhost:62943/showTableWebService.asmx/InsertDepartment?departmentid='+departmentid
          +'&departmentname='+departmentname+'&StatusValue='+StatusValue,{
                }).subscribe((res: Response) => {
                  this.rows = res.json();
                  resolve(this.rows);  // ใส่ค่าในตาราง
                  console.log(this.rows);
                }, (error: any) => {
              })
       
      });
    });
  }
  putUserList(id,surname,password,email,Tel,Name,sectionValue,StatusValue,UsertypeValue): Promise<any> {
    console.log("ID: "+id);
    return new Promise(( reject) => {
      setTimeout(() => {
        // resolve(this.smartTableData);
       
          return this.http.get('http://localhost:62943/showTableWebService.asmx/PutUserList?userid='+id
            +'&surname='+surname+'&password='+password+'&email='+email+'&Tel='+Tel+'&Name='+Name+'&sectionValue='+sectionValue
            +'&StatusValue='+StatusValue+'&UsertypeValue='+UsertypeValue,{
                }).subscribe((res: Response) => {
              })
       
      });
    });
  }

  putDepartmentList(departmentid,departmentname,StatusValue): Promise<any> {
    //console.log("ID: "+id);
    return new Promise(( reject) => {
      setTimeout(() => {
        // resolve(this.smartTableData);
       
          return this.http.get('http://localhost:62943/showTableWebService.asmx/PutDepartmentList?departmentid='+departmentid
            +'&departmentname='+departmentname+'&StatusValue='+StatusValue,{
                }).subscribe((res: Response) => {
                  
              })
       
      });
    });
  }
  putSectionList(department,sectionid,sectionname,StatusValue): Promise<any> {
    //console.log("ID: "+id);
    return new Promise(( reject) => {
      setTimeout(() => {
        // resolve(this.smartTableData);
       
          return this.http.get('http://localhost:62943/showTableWebService.asmx/PutSectionList?department='+department
            +'&sectionid='+sectionid+'&sectionname='+sectionname+'&StatusValue='+StatusValue,{
                }).subscribe((res: Response) => {
                  
              })
       
      });
    });
  }
  putRequestTypeList(requestType_ID,requestTypename,StatusValue): Promise<any> {
    //console.log("ID: "+id);
    return new Promise(( reject) => {
      setTimeout(() => {
        // resolve(this.smartTableData);
       
          return this.http.get('http://localhost:62943/showTableWebService.asmx/PutRequestTypeList?requestType_ID='+requestType_ID
            +'&requestTypename='+requestTypename+'&StatusValue='+StatusValue,{
                }).subscribe((res: Response) => {
                  
              })
       
      });
    });
  }
  putProductionLineList(productionLine_ID,productionLinename,factoryname,StatusValue): Promise<any> {
    //console.log("ID: "+id);
    return new Promise(( reject) => {
      setTimeout(() => {
        // resolve(this.smartTableData);
       
          return this.http.get('http://localhost:62943/showTableWebService.asmx/PutProductionLineList?productionLine_ID='+productionLine_ID
            +'&productionLinename='+productionLinename+'&factoryname='+factoryname+'&StatusValue='+StatusValue,{
                }).subscribe((res: Response) => {
                  
              })
       
      });
    });
  }
  putMachineList(machine_ID,machinename,productionLine,StatusValue): Promise<any> {
    //console.log("ID: "+id);
    return new Promise(( reject) => {
      setTimeout(() => {
        // resolve(this.smartTableData);
       
          return this.http.get('http://localhost:62943/showTableWebService.asmx/PutMachineeList?machine_ID='+machine_ID
            +'&machinename='+machinename+'&productionLine='+productionLine+'&StatusValue='+StatusValue,{
                }).subscribe((res: Response) => {
                  
              })
       
      });
    });
  }
  putMakerList(maker_ID,makername,contactName,lastName,tel,email,address,province,StatusValue): Promise<any> {
    //console.log("ID: "+id);
    return new Promise(( reject) => {
      setTimeout(() => {
        // resolve(this.smartTableData);
       
          return this.http.get('http://localhost:62943/showTableWebService.asmx/PutMakerList?maker_ID='+maker_ID
            +'&makername='+makername+'&contactName='+contactName
            +'&lastName='+lastName+'&tel='+tel+'&email='+email
            +'&address='+address+'&province='+province+'&StatusValue='+StatusValue,{
                }).subscribe((res: Response) => {
                  
              })
       
      });
    });
  }
  putPartMasterList(part_ID,partname, qty, price, minstock
    , maxstock, unitype, location ,maker,moldType, StatusValue): Promise<any> {
    //console.log("ID: "+id);
    return new Promise(( reject) => {
      setTimeout(() => {
        // resolve(this.smartTableData);
       
          return this.http.get('http://localhost:62943/showTableWebService.asmx/PutPartMasterList?part_ID='+part_ID
            +'&partname='+partname+'&qty='+qty
            +'&price='+price+'&minstock='+minstock+'&maxstock='+maxstock
            +'&unitype='+unitype+'&location='+location+'&maker='+maker+'&moldType='+moldType+'&StatusValue='+StatusValue,{
                }).subscribe((res: Response) => {
                  
              })
       
      });
    });
  }
  putLocationList(location_ID,locationname,factory,StatusValue): Promise<any> {
    //console.log("ID: "+id);
    return new Promise(( reject) => {
      setTimeout(() => {
        // resolve(this.smartTableData);
       
          return this.http.get('http://localhost:62943/showTableWebService.asmx/PutLocationList?location_ID='+location_ID
            +'&locationname='+locationname+'&factory='+factory+'&StatusValue='+StatusValue,{
                }).subscribe((res: Response) => {
                  
              })
       
      });
    });
  }
  putCheckToolList(checkTool_ID,checkToolname,timing,StatusValue): Promise<any> {
    //console.log("ID: "+id);
    return new Promise(( reject) => {
      setTimeout(() => {
        // resolve(this.smartTableData);
       
          return this.http.get('http://localhost:62943/showTableWebService.asmx/PutCheckToolList?checkTool_ID='+checkTool_ID
            +'&checkToolname='+checkToolname+'&timing='+timing+'&StatusValue='+StatusValue,{
                }).subscribe((res: Response) => {
                  
              })
       
      });
    });
  }
  putFactoryList(factoryname,factory_ID,StatusValue): Promise<any> {
    //console.log("ID: "+id);
    return new Promise(( reject) => {
      setTimeout(() => {
        // resolve(this.smartTableData);
       
          return this.http.get('http://localhost:62943/showTableWebService.asmx/PutFactoryList?factoryname='+factoryname
            +'&factory_ID='+factory_ID+'&StatusValue='+StatusValue,{
                }).subscribe((res: Response) => {
                  
              })
       
      });
    });
  }
  putMoldTyoeList(moldTypename,moldType_ID,StatusValue): Promise<any> {
    //console.log("ID: "+id);
    return new Promise(( reject) => {
      setTimeout(() => {
        // resolve(this.smartTableData);
       
          return this.http.get('http://localhost:62943/showTableWebService.asmx/PutMoldTypeList?moldTypename='+moldTypename
            +'&moldType_ID='+moldType_ID+'&StatusValue='+StatusValue,{
                }).subscribe((res: Response) => {
                  
              })
       
      });
    });
  }
  putUnitTypeList(unitTypename,unitType_ID,StatusValue): Promise<any> {
    //console.log("ID: "+id);
    return new Promise(( reject) => {
      setTimeout(() => {
        // resolve(this.smartTableData);
       
          return this.http.get('http://localhost:62943/showTableWebService.asmx/PutUnitTypeList?unitTypename='+unitTypename
            +'&unitType_ID='+unitType_ID+'&StatusValue='+StatusValue,{
                }).subscribe((res: Response) => {
                  
              })
       
      });
    });
  }
  // JSON.parse(localStorage.getItem('userListEmpId'))
}
