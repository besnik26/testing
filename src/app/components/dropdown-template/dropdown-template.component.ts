import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-dropdown-template',
  standalone: true,
  imports: [NgSelectModule, FormsModule], // Add FormsModule here
  templateUrl: './dropdown-template.component.html',
  styleUrl: './dropdown-template.component.scss'
})
export class DropdownTemplateComponent {
  selectedCar!: number;

  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];
}
