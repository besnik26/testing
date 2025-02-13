import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCardComponent } from "../../shared/product-card/product-card.component";
import { IProduct } from '../../shared/models/product.interface';
import { ProductApiService } from '../../shared/services/product-api.service';
import { addToCart } from '../../states/cart/cart.action';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AsyncPipe, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  http = inject(HttpClient)
  productApi = inject(ProductApiService)
  products$ = this.productApi.getProducts() as Observable<IProduct[]>;

  constructor(private store: Store<{ cart: { products: IProduct[] } }>) { }

  addItemToCart(product: IProduct) {
    this.store.dispatch(addToCart({ product }))
  }


}
