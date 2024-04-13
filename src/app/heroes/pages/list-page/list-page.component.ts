import { Component, OnInit } from '@angular/core';
import { Result } from '../../interfaces/hero-v2.interface';
import { HeroesService } from '../../services/heroes.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit {
  heroes: Result[] = [];
  length: number = 0;
  limit: number = 5;
  offset: number = 0;
  name: string | null = null;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.listHeroes();
  }

  /**
    * @author Fabian Duran
    * @createdate 2024-04-12
    * Metodo que setea la lista de heroes y la informacion de la paginacion.
  */
  listHeroes(): void {
    this.heroesService.getHeroesV2({ limit: this.limit, offset: this.offset, name: this.name }).subscribe(res => {
      this.heroes = res.data.results;
      this.length = res.data.total;
    });
  }
  /**
    * @author Fabian Duran
    * @createdate 2024-04-12
    * Metodo que actualiza la informacion de la paginacion.
    * @param $event Evento emitido por el paginador.
  */
  onChangePage($event: PageEvent): void {
    this.limit = $event.pageSize;
    this.offset = this.limit * $event.pageIndex;
    this.listHeroes();
  }
}