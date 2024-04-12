import { Component, Input, OnInit } from '@angular/core';
import { Result } from '../../interfaces/hero-v2.interface';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styles: [
  ]
})
export class CardComponent implements OnInit {
  @Input() public hero: Result;

  constructor() { }

  ngOnInit(): void {
    
  }

  get imageHero() {
    return `${this.hero.thumbnail.path}.${this.hero.thumbnail.extension}`;
  }
}