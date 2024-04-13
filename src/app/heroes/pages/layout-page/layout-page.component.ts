import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: []
})
export class LayoutPageComponent {
  sideBarItems = [
    { label: 'Listado', icon: 'label', url: './list' },
  ]

  constructor() { }
}