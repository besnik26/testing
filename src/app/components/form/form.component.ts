import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalModalComponent } from "../../shared/global-modal/global-modal.component";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, GlobalModalComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  form!: FormGroup
  showModal: boolean = false;
  data: any;
  showThanks: boolean = false;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formInit()
  }

  getFormData() {
    const newForm = this.form.value;
    return newForm;
  }

  formInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.form.valid) {
      this.data = { ...this.form.value }
      this.showModal = true;
    } else {
      alert('Fill out form!');
    }
  }

  resetForm() {
    this.form.reset()
  }

  handleShowThanks() {
    this.showThanks = true;
    setTimeout(() => {
      this.showThanks = false;
    }, 3000)
  }

  closeModal() {
    this.showModal = false;
  }
}
