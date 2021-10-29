import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core'
import * as mapboxgl from 'mapbox-gl'
import { IMarcadorColor } from 'src/app/core/interfaces/marcador-color.interface'

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.scss']
})
export class MarcadoresComponent implements AfterViewInit {
  @ViewChild('mapa') divMapa: ElementRef
  mapa: mapboxgl.Map
  zoomLabel: number
  center: [number, number]
  lsMarcadores: IMarcadorColor[] = []

  constructor() {
    this.zoomLabel = 15
    this.center = [-73.00349906408556, -36.744123074937555]
    // if () {
    //   this.lsMarcadores = JSON.parse(sessionStorage.getItem('lsMarcadores'))
    // }
  }

  ngAfterViewInit(): void {
    // (mapboxgl as any).accessToken = environment.mapBoxKey;
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLabel, //Mientras mas alto el el numero mas cerca de la tierra se vera
    })
    const markerHtml: HTMLElement = document.createElement('div')
    markerHtml.innerHTML = 'Mi casa'
    this.getMarcadores()
    // Add map controls
    // this.mapa.addControl(new mapboxgl.NavigationControl())
  }

  agregarMarcador(): void {
    const color = "#xxxxxx".replace(/x/g, y => (Math.random() * 16 | 0).toString(16))
    const nuevoMarker = new mapboxgl.Marker({ draggable: true, color })
      .setLngLat(this.center)
      .addTo(this.mapa)

    this.lsMarcadores.push({ color, marker: nuevoMarker })
    nuevoMarker.on('dragend', () => {
      this.guardarMarcadores();
    });
  }

  inMarcador(item: mapboxgl.Marker): void {
    const { lng, lat } = item.getLngLat()
    this.mapa.flyTo({
      center: [lng, lat]
    })

  }

  guardarMarcadores(): void {
    const lsLngLat: IMarcadorColor[] = []
    this.lsMarcadores.forEach(m => {
      const color = m.color
      const { lng, lat } = m.marker.getLngLat()

      lsLngLat.push({ color, centro: [lng, lat] })
    })

    sessionStorage.setItem('lsMarcadores', JSON.stringify(lsLngLat))

  }

  getMarcadores(): void {
    if (!sessionStorage.getItem('lsMarcadores')) {
      return
    }

    const lsLngLat: IMarcadorColor[] = JSON.parse(sessionStorage.getItem('lsMarcadores'))
    lsLngLat.forEach(m => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
        .setLngLat(m.centro)
        .addTo(this.mapa)

      this.lsMarcadores.push({
        color: m.color,
        marker: newMarker
      })

      newMarker.on('dragend', () => {
        this.guardarMarcadores();
      });
    })
  }

  borrarMarcador( i: number ) {

    this.lsMarcadores[i].marker?.remove();
    this.lsMarcadores.splice( i, 1);
    this.guardarMarcadores();
  }
}
