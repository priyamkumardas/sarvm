import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() totalItems:any;
  @Input() pageNo:any;
  @Input() itemsPerPage:any;
  totalPageCount:any;
  @Output() pageChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.totalItems,this.pageNo,this.itemsPerPage,Math.ceil(this.totalItems/this.itemsPerPage))
    this.totalPageCount = Math.ceil(this.totalItems/this.itemsPerPage);
  }
  prev(){
    this.pageChange.emit({next:false,prev:true,pageSize:this.itemsPerPage});
  }
  next(){
    this.pageChange.emit({next:true,prev:false,pageSize:this.itemsPerPage});
  }
  onPageChange(){
    this.totalPageCount = Math.ceil(this.totalItems/this.itemsPerPage);
    this.pageChange.emit({next:false,prev:false,pageSize:this.itemsPerPage});
  }

}
