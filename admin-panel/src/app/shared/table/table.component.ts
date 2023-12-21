import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() headers:any;
  @Input() tableData:any;
  @Input() dataList:any;
  @Input() type:any;
  p: number = 1;
  @Output() onDelete = new EventEmitter<any>();
  @Output() onUpdate = new EventEmitter<any>();
  @Output() updateProductData = new EventEmitter<any>();
  
  

  constructor() { }

  ngOnInit(): void {
    console.log(this.headers)
    console.log(this.tableData);
  }

  getClass(type:string|boolean):any{
    if(type == 'SH')
      return 'rounded-pill bg-info badge';
    if(type == 'SSO')
      return 'badge rounded-pill bg-warning';
    if(type == 'CO')
      return 'badge rounded-pill bg-secondary';
    if(type === true)
      return 'badge rounded-pill bg-success';
    if(type === false)
      return 'badge rounded-pill bg-danger';
  }

  onDeleteEvent(id:any){
    this.onDelete.emit(id);
  }
  onUpdateEvent(id:any){
    this.onUpdate.emit(id);
  }

  onUpdatemapping(id:any){
    console.log(id);
    this.updateProductData.emit(id);
  }

  

  refreshCountries(){

  }

  gotoTop(){
    window.scrollTo(0,0);
  }
}
