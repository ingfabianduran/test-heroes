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

  listHeroes(): void {
    this.heroesService.getHeroesV2({ limit: this.limit, offset: this.offset, name: this.name }).subscribe(res => {
      this.heroes = res.data.results;
      this.length = res.data.total;
    });
  }

  onChangePage($event: PageEvent): void {
    this.limit = $event.pageSize;
    this.offset = this.limit * $event.pageIndex;
    this.listHeroes();
  }
}