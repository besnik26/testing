import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-to-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-to-list.component.html',
  styleUrl: './add-to-list.component.scss'
})
export class AddToListComponent implements OnInit{
  myForm!:FormGroup;
  listArray:string[]= [];

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(){
    this.buildForm();
  }

  buildForm(){
    this.myForm = this.formBuilder.group({
      input:['',Validators.required]
    })
  }

  handleAdd(){
    if(this.myForm.valid){
      this.listArray.push(this.myForm.get('input')?.value);
      this.myForm.reset();
      console.log(this.listArray);
    }
  }
}
