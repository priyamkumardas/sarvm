import { Component, OnInit, Input, OnChanges, Output, EventEmitter, SimpleChanges, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GoogleMap } from '@capacitor/google-maps'
declare let L;

@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.scss'],
})
export class MapviewComponent implements OnInit, OnChanges, OnDestroy {

  map: any;
  marker;
  @Input() isMarkerMoveable = true;
  @Input() latlng;
  @Input() customeclass ;
  @Input() height = 100;
  @Output() locationChange = new EventEmitter();
  @ViewChild('map') mapRef: ElementRef<HTMLElement>;
  markerId: any;
  newMap: any;
  

  constructor(public platform: Platform,) { }
  // ngOnChanges(changes: SimpleChanges): void {
  //   throw new Error('Method not implemented.');
  // }

  async ngOnInit() {
    
    // const apiKey = 'AIzaSyB3mLu1YhKFrjGO5JnQtNYekBq47DOOTcc';
    // const mapRef = document.getElementById('map');

    // const newMap = await GoogleMap.create({
    //   id: 'my-map', // Unique identifier for this map instance
    //   element: mapRef, // reference to the capacitor-google-map element
    //   apiKey: apiKey, // Your Google Maps API Key
    //   config: {
    //     center: {
    //       // The initial position to be rendered by the map
    //       lat: this.latlng.lat,
    //       lng: this.latlng.lon,
    //     },
    //     zoom: 15, // The initial zoom level to be rendered by the map
    //   },
    // });
    // const markerId = await newMap.addMarker({
    //   coordinate: {
    //     lat: this.latlng.lat,
    //     lng: this.latlng.lon,
    //   },
    //   draggable: true
    // });
    // console.log(markerId)
    // const dragEvent = await newMap.setOnMarkerDragEndListener((data)=>{
    //   console.log(data,newMap);
    //   this.marker = data;
    //   // his.map.panTo({lat: e.target._latlng.lat, lon: e.target._latlng.lng});
    //   this.getDecodedAddress();
    // })
  }

  async ngOnDestroy() {
    await this.newMap.destroy();
  }
  async ionViewWillEnter(){
    console.log(this.mapRef);
    const apiKey = 'AIzaSyB3mLu1YhKFrjGO5JnQtNYekBq47DOOTcc';
    
    const mapRef = document.getElementById('map');
    if(this.markerId != null){
      await this.newMap.removeMarker(this.markerId);
    }
    if(this.newMap){
      await this.newMap.destroy();
    }

    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement, // reference to the capacitor-google-map element
      apiKey: apiKey, // Your Google Maps API Key
      config: {
        center: {
          // The initial position to be rendered by the map
          lat: parseFloat(this.latlng.lat),
          lng: parseFloat(this.latlng.lng),
        },
        zoom: 15, // The initial zoom level to be rendered by the map
      },
    });
    this.markerId = await this.newMap.addMarker({
      coordinate: {
        lat: parseFloat(this.latlng.lat),
        lng: parseFloat(this.latlng.lng),
      },
      draggable: true
    });
    this.newMap.setOnMarkerDragEndListener(async (data)=>{
      // console.log(data,newMap);
      this.marker = data;
      console.log(data);
      // his.map.panTo({lat: e.target._latlng.lat, lon: e.target._latlng.lng});
      this.getDecodedAddress();
    });
  }

  ngOnChanges(ev) {
    console.log(1)
    if (ev.latlng) {
      setTimeout(() => {
        this.latlng.lat = ev.latlng.currentValue.lat;
        this.latlng.lon = ev.latlng.currentValue.lng;
        // this.openLocation({
        //   lat: ev.latlng.currentValue.lat,
        //   lon: ev.latlng.currentValue.lon,
        // });
        this.ionViewWillEnter();
      }, 1000);
    }
  }

   getDecodedAddress(isFirst = false) {
    this.latlng = {
      lat: isFirst ? this.latlng.lat : this.marker.latitude,
      lon: isFirst ? this.latlng.lon : this.marker.longitude
    }
    this.locationChange.emit(this.latlng)
    }

  
    async openLocation(place) {
      const lat = place.lat;
      const lng = place.lng;
      }
  }

