import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import * as mapboxgl from 'mapbox-gl'

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.scss']
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa: ElementRef;
  mapa: mapboxgl.Map
  zoomLabel: number
  center: [number, number]

  constructor() {
    this.zoomLabel = 10
    this.center = [-73.00349906408556, -36.744123074937555]
  }

  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {} )
    this.mapa.off('zoomend', () => {} )
    this.mapa.off('move', () => {} )
  }

  ngAfterViewInit(): void {
    // (mapboxgl as any).accessToken = environment.mapBoxKey;
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLabel, //Mientras mas alto el el numero mas cerca de la tierra se vera
    })

    this.mapa.on('zoom', () => this.zoomLabel = Math.round(this.mapa.getZoom()))
    this.mapa.on('zoomend', () => {
      if (this.mapa.getZoom() > 20) {
        this.mapa.zoomTo(20)
      }
    })
    this.mapa.on('move', (eve) => {
      const target = eve.target
      const { lng, lat } = target.getCenter()
      this.center = [ lng, lat ]
    })
    // Add map controls
    // this.mapa.addControl(new mapboxgl.NavigationControl())
  }

  zoomIn(): void {
    this.mapa.zoomIn()

  }
  zoomOut(): void {
    this.mapa.zoomOut()
  }

  changeZoomLabel(n: number) {
    this.mapa.zoomTo( n )

  }
}
