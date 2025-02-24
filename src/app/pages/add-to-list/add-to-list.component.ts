import { Component, OnInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-add-to-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-to-list.component.html',
  styleUrl: './add-to-list.component.scss',
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        style({ height: '0px', opacity: 0 }),
        animate('0.3s ease-in-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.3s ease-in-out', style({ height: '0px', opacity: 0 }))
      ])
    ])
  ]
})
export class AddToListComponent implements OnInit {
  myForm!: FormGroup;
  listArray: string[] = [];

  @ViewChildren('listItems') listItems!: QueryList<ElementRef>;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.myForm = this.formBuilder.group({
      input: ['', Validators.required]
    })
  }

  toggleDecoration(index: number) {
    const element = this.listItems.toArray()[index].nativeElement;
    element.style.textDecoration = element.style.textDecoration === 'line-through' ? 'none' : 'line-through';
  }

  handleAdd() {
    if (this.myForm.valid) {
      this.listArray.push(this.myForm.get('input')?.value);
      this.myForm.reset();
      console.log(this.listArray);
    }
  }
  handleDelete(index: number) {
    this.listArray.splice(index, 1);
  }
}
