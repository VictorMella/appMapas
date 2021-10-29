import { Component } from '@angular/core';
import { IMenuItem } from 'src/app/core/interfaces/menuItem.interface'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `li{ cursor: pointer } `
  ]
})
export class MenuComponent{

  menuItems: IMenuItem[] = [
    {
      ruta: '/mapas/fullscreen',
      nombre: 'FullScreen'
    },
    {
      ruta: '/mapas/zoom-range',
      nombre: 'Zoom Range'
    },
    {
      ruta: '/mapas/marcadores',
      nombre: 'Marcadores'
    },
    {
      ruta: '/mapas/propiedades',
      nombre: 'Propiedades'
    },
  ]

}
