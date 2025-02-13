import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../states/app.state';
import { selectCartProducts } from '../../states/cart/cart.selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems$ = this.store.select(selectCartProducts);
  constructor(private store: Store<AppState>) {

  }
}
