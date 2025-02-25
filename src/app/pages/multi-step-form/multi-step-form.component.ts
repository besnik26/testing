import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-multi-step-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './multi-step-form.component.html',
  styleUrl: './multi-step-form.component.scss'
})
export class MultiStepFormComponent implements OnInit {
  step: number = 1
  myForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.myForm = this.formBuilder.group({
      personalInfo: this.formBuilder.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        email: ['', Validators.required],
        phone: ['', Validators.required]
      }),
      addressInfo: this.formBuilder.group({
        country: ['', Validators.required],
        city: ['', Validators.required],
        street: ['', Validators.required]
      })
    });
  }

  onSubmit() {
    console.log(this.myForm.value);
  }
  onBack() {
    this.step--;
  }

  onNext() {
    if (this.step === 1) {
      if (this.myForm.get('personalInfo')?.valid) {
        this.step++;
      }
      else {
        this.markFormGroupTouched(this.myForm.get('personalInfo') as FormGroup);
      }
    } else if (this.step === 2) {
      if (this.myForm.get('addressInfo')?.valid) {
        this.step++;
      }
      else {
        this.markFormGroupTouched(this.myForm.get('addressInfo') as FormGroup);
      }
    } else if (this.step === 3) {
      if (this.myForm.valid) {
        this.onSubmit();
      }
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    })
  }



}
