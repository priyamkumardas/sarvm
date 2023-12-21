import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Platform } from '@ionic/angular';
import { CommonApi } from 'src/app/lib/services/api/common.api';
import { LocationService } from 'src/app/lib/services/location.service';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';

declare let L;
@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.scss'],
})
export class MapComponentComponent implements OnInit, OnChanges, OnDestroy {
  map: any;
  // @ViewChild('map') mapElement: ElementRef;
  // @ViewChild('map') mapView: ElementRef;
  marker;
  // @Input() isSearchEnable = true;
  @Input() isMarkerMoveable = true;
  @Input() latlng ;
  @Input() customeclass ;
  @Input() height = 100;
  @Output() locationChange= new EventEmitter();
  @ViewChild('map') mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  markerId = null;
  classesObj :any= {}
  constructor(
    public platform: Platform,
    private locationService: LocationService
  ) {}

  async ngOnInit() {
    
    this.classesObj.color = 'white-color';

    // const tileLayer = new L.TileLayer(
    //   'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
    //   {
    //     attribution: '',
    //   }
    // );
    // // Load map
    // this.map = new L.Map('map', {
    //   center: [this.latlng.lat, this.latlng.lon],
    //   zoom: 15,
    //   layers: [tileLayer],
    //   attributionControl: false,
    //   zoomControl:false
    // });

    // // static location marker moveable
    // this.marker = L.marker([this.latlng.lat, this.latlng.lon], {
    //   draggable: this.isMarkerMoveable,
    // }).addTo(this.map);
    
    // // getting location on moving marker
    // this.marker.on('dragend', (e) => {
    //   this.map.panTo({lat: e.target._latlng.lat, lon: e.target._latlng.lng});
    //   this.getDecodedAddress();
    // });

    // // get initial address
    // //this.getDecodedAddress(true);
    // setTimeout(() => {
    //   this.map.invalidateSize();
    // }, 1000);
  }

  async ngOnDestroy() {
    await this.newMap.destroy();
  }

  async ionViewWillEnter() {
    this.classesObj.color = 'white-color';
    const apiKey = environment.gMaps.apiKey;

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
          lng: parseFloat(this.latlng.lon),
        },
       
        zoom: 15, // The initial zoom level to be rendered by the map
      },
      
    });
    
  
    this.markerId = await this.newMap.addMarker({
      coordinate: {
        lat: parseFloat(this.latlng.lat),
        lng: parseFloat(this.latlng.lon),
      },
      draggable: this.isMarkerMoveable
    });
   
    this.newMap.setOnMarkerDragEndListener(async (data)=>{
      this.marker = data;
      
      // his.map.panTo({lat: e.target._latlng.lat, lon: e.target._latlng.lng});
      this.getDecodedAddress();
    });

    // this.newMap.setOnMapClickListener(async (data)=>{
    //   console.log(data);
    //   await this.newMap.removeMarkers(this.markerId);
    //   this.markerId = await this.newMap.addMarker({
    //     coordinate: {
    //       lat: data.latitude,
    //       lng: data.longitude
    //     },
    //     draggable: this.isMarkerMoveable
    //   });
    // })
  }


  ngOnChanges(ev) {
    this.classesObj.color = 'white-color';
    if (ev.latlng) {
      setTimeout(() => {
        this.latlng.lat = ev.latlng.currentValue.lat;
        this.latlng.lon = ev.latlng.currentValue.lon;
        // this.openLocation({
        //   lat: ev.latlng.currentValue.lat,
        //   lon: ev.latlng.currentValue.lon,
        // });

       
        this.ionViewWillEnter();
        this.classesObj.color = 'trans-color';
      }, 1000);
      }
    
  }

  getDecodedAddress(isFirst = false,) {
    this.latlng = {
      lat: isFirst ? this.latlng.lat : this.marker.latitude,
      lon: isFirst ? this.latlng.lon : this.marker.longitude
    }
    this.locationChange.emit(this.latlng)
  }

  // change marker location according to search result;

  async openLocation(place) {
    const lat = place.lat;
    const lng = place.lon;
    // this.newMap.removeMarker(this.markerId);
    // const apiKey = 'AIzaSyB3mLu1YhKFrjGO5JnQtNYekBq47DOOTcc';

    // const mapRef = document.getElementById('map');
    // this.newMap = await GoogleMap.create({
    //   id: 'my-map', // Unique identifier for this map instance
    //   element: mapRef, // reference to the capacitor-google-map element
    //   apiKey: apiKey, // Your Google Maps API Key
    //   config: {
    //     center: {
    //       // The initial position to be rendered by the map
    //       lat: parseFloat(lat),
    //       lng: parseFloat(lng),
    //     },
    //     zoom: 15, // The initial zoom level to be rendered by the map
    //   },
    // });
    // this.markerId = await this.newMap.addMarker({
    //   coordinate: {
    //     lat: parseFloat(lat),
    //     lng: parseFloat(lng),
    //   },
    //   draggable: true
    // });
  }
}
