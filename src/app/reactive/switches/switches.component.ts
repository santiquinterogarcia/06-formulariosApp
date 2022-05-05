import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [],
})
export class SwitchesComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    genero: ['F', Validators.required],
    notificaciones: [false, Validators.required],
    terminosYcondiciones: [false, Validators.requiredTrue],
  });

  persona = {
    genero: 'M',
    notificaciones: true,
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.miFormulario.reset({ ...this.persona, terminosYcondiciones: true });

    this.miFormulario.valueChanges.subscribe((form) => {
      console.log(form);
    });
    this.miFormulario
      .get('terminosYcondiciones')
      ?.valueChanges.subscribe((form) => {
        console.log(form);
      });
  }

  guardar() {
    const formValue = { ...this.miFormulario.value };

    if (this.miFormulario.valid) {
      console.log(formValue);
      delete formValue.terminosYcondiciones;
      this.persona = formValue;
      this.miFormulario.reset();
    }
  }
}
