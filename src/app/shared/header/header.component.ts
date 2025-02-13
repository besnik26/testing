import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../states/app.state';
import { selectCount } from '../../states/counter/counter.selector';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IProduct } from '../models/product.interface';
import { selectCartProducts } from '../../states/cart/cart.selector';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  count$: Observable<number>;
  products$: Observable<IProduct[]>

  constructor(private store: Store<AppState>, private themeService: ThemeService) {
    this.count$ = store.select(selectCount)
    this.products$ = store.select(selectCartProducts)
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
