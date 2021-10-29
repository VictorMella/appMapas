import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import * as mapboxgl from 'mapbox-gl'
@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.scss']
})
export class ZoomRangeComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa: ElementRef;
  mapa: mapboxgl.Map
  zoonLabel: number

  constructor() {
    this.zoonLabel = 10
   }

  ngAfterViewInit(): void {
    // (mapboxgl as any).accessToken = environment.mapBoxKey;
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-73.00349906408556, -36.744123074937555],
      zoom: this.zoonLabel, //Mientras mas alto el el numero mas cerca de la tierra se vera
    })
    // Add map controls
    // this.mapa.addControl(new mapboxgl.NavigationControl())
  }

  zoomIn(): void {
    this.mapa.zoomIn()
    this.zoonLabel = Math.round(this.mapa.getZoom())

  }
  zoomOut(): void {
    this.mapa.zoomOut()
    this.zoonLabel = Math.round(this.mapa.getZoom())
  }
}
