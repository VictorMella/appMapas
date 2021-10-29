import * as mapboxgl from 'mapbox-gl'

export interface IMarcadorColor {
  color: string;
  marker?: mapboxgl.Marker;
  centro? : [number, number]
}
