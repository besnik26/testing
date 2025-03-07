import { Component, HostListener, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from '../../states/app.state';
import { selectCount } from '../../states/counter/counter.selector';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IProduct } from '../models/product.interface';
import { selectCartProducts } from '../../states/cart/cart.selector';
import { ThemeService } from '../services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy{
  count$: Observable<number>;
  products$: Observable<IProduct[]>
  menuOpen: boolean = false;
  theme!: string;
  private themeSubscription!: Subscription;

  constructor(private store: Store<AppState>, private themeService: ThemeService, private elementRef: ElementRef,) {
    this.count$ = store.select(selectCount)
    this.products$ = store.select(selectCartProducts)
  }

  ngOnInit(): void {
    this.themeSubscription = this.themeService.theme$.subscribe(theme => {
      this.theme = theme;
    });
  }
  
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  @HostListener('document:click', ['$event'])
  ClickOut(event: MouseEvent) {
    const isClickedOutside = !this.elementRef.nativeElement.contains(
      event.target as Node
    );
    if (isClickedOutside) {
      this.menuOpen = false;
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeDropdown() {
    this.menuOpen = false;
  }
}
