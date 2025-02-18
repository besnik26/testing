import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { counterReducer } from './states/counter/counter.reducer';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { cartReducer } from './states/cart/cart.reducer';
import { provideAnimations } from '@angular/platform-browser/animations';


export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideStore(),
    provideState({ name: 'counter', reducer: counterReducer }),
    provideState({ name: 'cart', reducer: cartReducer })
  ]
};
