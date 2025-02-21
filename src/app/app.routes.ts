import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        loadComponent: () =>
            import('./pages/home/home.component').then((a) => a.HomeComponent)
    },
    {
        path: 'products',
        loadComponent: () =>
            import('./pages/products/products.component').then((a) => a.ProductsComponent)
    },

    {
        path: 'cart',
        loadComponent: () =>
            import('./pages/cart/cart.component').then((a) => a.CartComponent)
    },

    {
        path: 'animations',
        loadComponent: () =>
            import('./pages/on-scroll-animations/on-scroll-animations.component').then((a) => a.OnScrollAnimationsComponent)
    },
    {
        path: 'add-to-list',
        loadComponent: () =>
            import('./pages/add-to-list/add-to-list.component').then((a) => a.AddToListComponent)
    },
];
