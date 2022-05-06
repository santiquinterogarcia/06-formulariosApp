import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
    `
      .minAlto {
        min-height: 24px;
      }
    `,
  ],
})
export class RegistroComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group(
    {
      nombre: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorService.nombreApellidoPattern),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorService.emailPattern),
        ],
        [this.emailValidator],
      ],
      username: [
        '',
        [Validators.required, this.validatorService.noPuedeSerStrider],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]],
    },
    {
      validators: [
        this.validatorService.camposIguales('password', 'password2'),
      ],
    }
  );

  get emailErrorMessage(): string | null {
    const errors = this.miFormulario.get('email')?.errors;

    if (errors?.['required']) {
      return 'Email es obligatorio';
    } else if (errors?.['pattern']) {
      return 'Email inválidoo';
    } else if (errors?.['emailTomado']) {
      return 'Email tomado';
    } else {
      return null;
    }
  }

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private emailValidator: EmailValidatorService
  ) {}

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Santiago Quintero',
      email: 'santiago990101@hotmail.com',
      username: 'santi_quinterog',
    });
  }

  campoNoEsValido(campo: string) {
    return (
      this.miFormulario.controls[campo].invalid &&
      this.miFormulario.controls[campo].touched
    );
  }

  submitFormulario() {
    this.miFormulario.markAllAsTouched();
    if (this.miFormulario.valid) {
      console.log(this.miFormulario.value);
    }
  }
}
