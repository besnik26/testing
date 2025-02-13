import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../models/product.interface';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: IProduct;
  @Output() handleAdd = new EventEmitter();

  addToCart(product: IProduct) {
    this.handleAdd.emit(product)
  }
}
