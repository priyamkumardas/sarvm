import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { EmpserviceService } from 'src/app/shared/empservice.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-emplist',
  templateUrl: './emplist.component.html',
  styleUrls: ['./emplist.component.scss']
})
export class EmplistComponent implements OnInit {
  private _route: any;

  constructor(
    private _EmpserviceService:EmpserviceService,
    private loader:NgxUiLoaderService,
    private route:ActivatedRoute) { }

  id:any;
  empData:any;
  dataAll:any;


  page: number = 1;
  itemsPerPage:number = 10;
  count: number = 0;
  tableSize: number=5;
  searchText='';
  config: any;


  dtoptions:DataTables.Settings={};
  dtTrigger:Subject<any>=new Subject<any>();


  employeeList  = [
    {'name': 'Employee Id'},
    {'name':'Date of joining'},
    {'name':'Fullname'},
    {'name':'MangerId'},
    {'name':'Mobile number'},
    {'name':'Status'},
    {'name':'Role'},
  ];

  dataList=[
    "employeeId",
    "dateofJoining",
    "fullName",
    "managerId",
    "mobileNumber",
    "status",
    "role",
  ]

  changePage(e:string){
    console.log(e)
    if(e == 'next'){
      this.page += 1;
    }else{
      this.page -= 1;
    }
  }


  getemployeeDetails(){
    this.loader.start();
    this._EmpserviceService.getemployeeDetails().subscribe((res:any)=>{
      this.empData = res.data;
console.log(this.empData)
      this.dtTrigger.next(null)
      this.loader.stop();
    },
    (err)=>{
      this.loader.stop();
    })
  }


  ngOnInit(): void {
      this.dtoptions ={
        pagingType: 'full_numbers',
      };

      this.route.params.subscribe((res:any)=>{
        this.id = res._id;
        this.getemployeeDetails();
        console.log(res._id);
      })

      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
      };
    }
  }
