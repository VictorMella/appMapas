import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'

@Component({
  selector: 'app-mini-mapa',
  templateUrl: './mini-mapa.component.html',
  styleUrls: ['./mini-mapa.component.scss']

})
export class MiniMapaComponent implements AfterViewInit {
  @Input() lngLat: [number, number] = [0, 0]
  @ViewChild('mapa') divMapa!: ElementRef;
  constructor() {

  }

  ngAfterViewInit(): void {
    const map = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lngLat,
      zoom: 15, //Mientras mas alto el el numero mas cerca de la tierra se vera
      interactive: false
    });
    new mapboxgl.Marker()
    .setLngLat(this.lngLat)
    .addTo(map)
  }

}
