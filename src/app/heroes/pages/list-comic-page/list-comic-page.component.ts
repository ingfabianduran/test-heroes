import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Result } from '../../interfaces/hero-comics.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute } from '@angular/router';
import { ConfigColumnsTable } from '../../interfaces/global.interface';

@Component({
  selector: 'app-list-comic-page',
  templateUrl: './list-comic-page.component.html',
  styleUrls: []
})
export class ListComicPageComponent implements OnInit {
  configColumnsTable: ConfigColumnsTable[] = [
    { name: 'Caratula', key: 'image' },
    { name: 'Título', key: 'title' },
    { name: 'Fecha de venta', key: 'saleDate' },
    { name: 'Descripción', key: 'description' },
    { name: 'UPC', key: 'upc' },
    { name: 'Fecha de modificación', key: 'modificationDate' },
    { name: 'Creadores', key: 'creators' },
    { name: 'Personajes', key: 'characters' },
    { name: 'Precio de impresion', key: 'prices' },
  ];
  keysColumnsTable: string[] = ['image', 'title', 'saleDate', 'description', 'upc', 'modificationDate', 'creators', 'characters', 'prices'];
  dataTable: Result[] = [];
  length: number = 0;
  limit: number = 5;
  offset: number = 0;
  heroId: number | null = null;

  constructor(private heroService: HeroesService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.heroId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.listComics();
  }

  /**
    * @author Fabian Duran
    * @createdate 2024-04-13
    * Metodo que setea los comics sobre la tabla.
  */
  listComics(): void {
    this.heroService.getComicsByHero({ limit: this.limit, offset: this.offset, heroId: this.heroId }).subscribe(res => {
      this.length = res.data.total;
    });
  }
  /**
    * @author Fabian Duran
    * @createdate 2024-04-13
    * Metodo que actualiza la informacion de la paginacion.
    * @param $event Evento emitido por el paginador.
  */
  onChangePage($event: PageEvent): void {
    this.limit = $event.pageSize;
    this.offset = this.limit * $event.pageIndex;
  }
}