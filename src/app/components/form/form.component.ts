import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Input } from './form.component.interface';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  //Variable de inputs  del formulario
  public inputs: Input[] = [
    {formControlName: 'firstName', type: 'text', placeholder: 'First Name', msgError:'First Name cannot be empty'},
    {formControlName: 'lastName', type: 'text', placeholder: 'Last Name', msgError:'Last Name cannot be empty'},
    {formControlName: 'emailAddress', type: 'email', placeholder: 'Email Address', msgError:'Looks like this is not an email'},
    {formControlName: 'password', type: 'password', placeholder: 'Password', msgError:'Password cannot be empty'},
  ]

  // Variable para evitar que se muestre el mensaje de error antes de enviar
  public submitted:boolean = true;

  // Variable del formulario
  public myForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    emailAddress: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  })

  constructor(private fb: FormBuilder) {}

  // Evento para enviar los datos del formulario
  onSubmit(): void {

    this.submitted = true;

    if(this.myForm.valid){
      alert(`The data ${this.myForm.controls['firstName'].value} ${this.myForm.controls['lastName'].value} was sent successfully`)
      this.myForm.reset()
      this.submitted = false;
    }

  }

  // Para cambiar color de borde de los input en caso de error
  inputIsInvalid(fieldName: string):boolean {
    const control:any = this.myForm.get(fieldName);
    this.submitted = true;
    return control.invalid && control.touched
  }

}
