import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar'
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-multi-step-form',
  standalone: true,
  imports: [ReactiveFormsModule, CalendarModule, NgClass],
  templateUrl: './multi-step-form.component.html',
  styleUrl: './multi-step-form.component.scss'
})
export class MultiStepFormComponent implements OnInit {
  step: number = 3
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
      }),
      dateTimeInfo: this.formBuilder.group({
        date: ['', Validators.required],
        time: ['', Validators.required],

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
      } else {
        this.markFormGroupTouched(this.myForm.get('dateTimeInfo') as FormGroup);
      }
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    })
  }



}
