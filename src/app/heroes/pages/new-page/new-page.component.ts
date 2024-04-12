import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [],
})
export class NewPageComponent implements OnInit {
  public heroForm = new FormGroup({
    alter_ego: new FormControl(''),
    characters: new FormControl(''),
    first_appearance: new FormControl(''),
    id: new FormControl(''),
    publisher: new FormControl(Publisher.DCComics),
    superhero: new FormControl('', [Validators.required]),
    alt_img: new FormControl(''),
  });

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroById(id)))
      .subscribe((hero) => {
        if (!hero) return this.router.navigateByUrl('/');
        this.heroForm.reset(hero);
      });
  }

  onSubmit(): void {
    if (this.heroForm.invalid) return;

    if (this.heroForm.get('id').value) {
      this.heroesService
        .updateHero(this.heroForm.value)
        .subscribe((hero) =>
          this.showSnackBar(`${hero.superhero} se ha actualizado`)
        );
      return;
    }

    this.heroesService.addHero(this.heroForm.value).subscribe((hero) => {
      this.showSnackBar(`${hero.superhero} se ha creado el heroe`);
      this.router.navigate(['heroes/edit', hero.id]);
    });
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'cerrar', {
      duration: 2500,
    });
  }

  onDeleteHero(): void {
    if (!this.heroForm.get('id').value)
      throw new Error('El heroe id es requerido');

    this.dialog
      .open(ConfirmDialogComponent, {
        data: this.heroForm.value,
        disableClose: true,
      })
      .afterClosed()
      .pipe(
        filter((result: boolean) => result),
        switchMap(() =>
          this.heroesService.deleteHeroById(this.heroForm.get('id').value)
        ),
        filter((wasDeleted: boolean) => wasDeleted)
      )
      .subscribe(() => {
        this.router.navigate(['/heroes']);
      });
  }
}
