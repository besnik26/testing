import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-global-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './global-modal.component.html',
  styleUrl: './global-modal.component.scss'
})
export class GlobalModalComponent implements OnInit {

  form!: FormGroup
  @Output() closeModal = new EventEmitter<void>();
  @Output() resetForm = new EventEmitter<void>();
  @Output() showThanks = new EventEmitter<void>();
  @Input() formData: any;

  constructor(private formBuilder: FormBuilder) {
    this.initForm();
  }

  ngOnInit() {
    if (this.formData) {
      this.form.patchValue(this.formData);
    }
  }
  initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required]
    })
  }


  onClose() {
    this.closeModal.emit()
  }
  onReset() {
    this.resetForm.emit()
  }

  handleShowThanks() {
    this.showThanks.emit()
  }

  onSubmit() {
    console.log(this.form.value)
    this.onClose();
    this.handleShowThanks();
    this.onReset();
  }

}
