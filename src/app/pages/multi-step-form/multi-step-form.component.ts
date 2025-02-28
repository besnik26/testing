import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar'
import { NgClass } from '@angular/common';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-multi-step-form',
  standalone: true,
  imports: [ReactiveFormsModule, CalendarModule, NgClass],
  templateUrl: './multi-step-form.component.html',
  styleUrl: './multi-step-form.component.scss',
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        style({ height: '0px', opacity: 0 }),
        animate('0.5s ease-in-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.5s ease-in-out', style({ height: '0px', opacity: 0 }))
      ])
    ])
  ]
})
export class MultiStepFormComponent implements OnInit {
  step: number = 1;
  myForm!: FormGroup;
  showThanks: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.myForm = this.formBuilder.group({
      personalInfo: this.formBuilder.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
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
    const formData = this.myForm.value;

    const date = formData.dateTimeInfo.date
      ? formData.dateTimeInfo.date.toISOString().split('T')[0]
      : null;

    const time = formData.dateTimeInfo.time
      ? formData.dateTimeInfo.time.toTimeString().split(' ')[0]
      : null;

    const formattedData = {
      ...formData,
      dateTimeInfo: {
        date,
        time
      }
    };

    console.log(formattedData);
    this.resetForm();
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

  resetForm(){
    this.showThanks = true;

    setTimeout(() => {
      this.myForm.reset();
      this.showThanks = false;
      this.step = 1;
    }, 2500)
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    })
  }

}
