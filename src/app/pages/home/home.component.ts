import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { AppState } from '../../states/app.state';
import { selectCount } from '../../states/counter/counter.selector';
import { decrement, increment } from '../../states/counter/counter.actions';
import { DropdownTemplateComponent } from "../../components/dropdown-template/dropdown-template.component";
import { FormComponent } from "../../components/form/form.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DropdownTemplateComponent, FormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  count$: Observable<number>

  constructor(private store: Store<AppState>) {
    this.count$ = store.select(selectCount)
  }

  increment() {
    this.store.dispatch(increment())
  }

  decrement() {
    this.store.dispatch(decrement())
  }
}
