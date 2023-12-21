import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ShopDataService } from '../../../lib/services/api/shop-data.service';

interface shop {
  shop_id: string;
  shop_name: string;
  city: string;
  pincode: string;
}
@Component({
  selector: 'app-edit-shop',
  templateUrl: './edit-shop.component.html',
  styleUrls: ['./edit-shop.component.scss'],
})
export class EditShopComponent implements OnInit {
  shop_id: any;
  // car: FormGroup | undefined;
  shopDetailsEdit!: FormGroup;
  shopData: any;
  // url = `${environment.baseUrl}/rms/apis/v1/shop/`;
  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder,
    private shopDataService: ShopDataService
  ) {}

  ngOnInit(): void {
    this.shopDetailsEdit = this.fb.group({
      shop_id: [],
      shop_name: [],
      city: [],
      pincode: [],
    });
    this.route.paramMap.subscribe((params) => {
      // console.log(params.get('username'));
      console.log(params);
      this.shop_id = params.get('id');
      console.log(this.shop_id);
    });
    this.callShopData();
  }

  updateShotData() {
    this.shopDataService
      .updateShopDataApi(this.shop_id, this.shopDetailsEdit.getRawValue())
      .subscribe();
  }
  callShopData() {
    this.shopDataService.callShopDataApi(this.shop_id).subscribe((data) => {
      console.log('data here');
      console.log(data);
      this.shopData = data.data[0];
      console.log(this.shopData);
      this.shopDetailsEdit?.patchValue({
        ...this.shopData,
      });
    });
  }
  cancel() {
    // this.car = null;

  }
}
