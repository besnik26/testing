import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar'
import { NgClass } from '@angular/common';
import { trigger, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-multi-step-form',
  standalone: true,
  imports: [ReactiveFormsModule, CalendarModule, NgClass, CommonModule],
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
    this.addExperience();
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
      }),
      experience: this.formBuilder.array([])
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
  
    
    const formattedExperience = formData.experience.map((exp: any) => ({
      ...exp,
      dateFrom: exp.dateFrom
        ? new Date(exp.dateFrom).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
          })
        : null,
      dateTo: exp.dateTo
        ? new Date(exp.dateTo).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
          })
        : null,
    }));
  
    const formattedFormData = {
      ...formData,
      dateTimeInfo: {
        date,
        time
      },
      experience: formattedExperience,
    };
  
    console.log(formattedFormData);
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
        this.markFormGroupsArrayTouched();
      }
    }
  }

  resetForm() {
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

  markFormGroupsArrayTouched() {
    const formGroupsArray = this.myForm.get('experience') as FormArray;

    formGroupsArray.controls.forEach((control: AbstractControl) => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  get experienceGroup(): FormArray {
    return this.myForm.get('experience') as FormArray;
  }

  addExperience() {
    const experienceFormGroup = this.formBuilder.group({
      title: ['',Validators.required],
      dateFrom: ['',Validators.required],
      dateTo: ['',Validators.required]

    })
    this.experienceGroup.push(experienceFormGroup);
  }

  removeExperience(index: number) {
    const experiences = this.myForm.get('experience') as FormArray;
    experiences.removeAt(index);
  }

}
