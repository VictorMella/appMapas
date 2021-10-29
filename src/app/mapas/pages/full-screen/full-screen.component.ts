import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [ ` #mapa { height: 100% !important; width: 100% !important; } `  ]
})
export class FullScreenComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
    // (mapboxgl as any).accessToken = environment.mapBoxKey;
    const map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-73.00349906408556, -36.744123074937555],
      zoom: 18, //Mientras mas alto el el numero mas cerca de la tierra se vera
  });
  // Add map controls
   map.addControl(new mapboxgl.NavigationControl());
  }
}
