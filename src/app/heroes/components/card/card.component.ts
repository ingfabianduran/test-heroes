import { Component, Input, OnInit } from '@angular/core';
import { Result } from '../../interfaces/hero-v2.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styles: [
  ]
})
export class CardComponent implements OnInit {
  @Input() public hero: Result;

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  /**
    * @author Fabian Duran
    * @createdate 2024-04-12
    * Metodo que retorna la direccion de la imagen junto con la extension.
  */
  get imageHero() {
    return `${this.hero.thumbnail.path}.${this.hero.thumbnail.extension}`;
  }
  /**
    * @author Fabian Duran
    * @createdate 2024-04-12
    * Metodo que redirecciona a la pagina de comics asociados a un heroe.
    * @param id Id del heroe seleccionado.
  */
  onClickToRedirectComics(id: number): void {
    this.router.navigate([`heroes/list-comics/${id}`]);
  }
}