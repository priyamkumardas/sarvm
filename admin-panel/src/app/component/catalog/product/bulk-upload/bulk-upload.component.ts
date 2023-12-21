import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CatalogService } from 'src/app/lib/services/catalog.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.scss']
})
export class BulkUploadComponent implements OnInit {
  fileInputLabel: any;
  fileUploadForm: any

  selecteFile: any;
  constructor(private catalogService: CatalogService) { }

  ngOnInit(): void {

  }
  bulkUpload() {
    const formData = new FormData();
    formData.append('file', this.selecteFile);
    let data = { file: this.selecteFile }
    console.log(data);
    this.catalogService.bulkUpload(formData).subscribe((res: any) => {
      console.log(res);
    })

  }
  chooseFile(event: any) {
    this.selecteFile = event.target.files[0];
    console.log(this.selecteFile);
  }

}



