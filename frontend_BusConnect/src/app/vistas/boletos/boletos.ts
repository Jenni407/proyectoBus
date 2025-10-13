import { CommonModule } from '@angular/common';
import {  inject } from '@angular/core'; 
import { FormBuilder, Validators, ReactiveFormsModule, FormArray, FormGroup, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { Component, ViewChild } from '@angular/core';
import { MatStepperModule, MatStepper } from '@angular/material/stepper';
import { MatButton } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-boletos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    MatStepperModule, MatStepper,
    MatButton,
    RouterModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './boletos.html',
  styleUrls: ['./boletos.css'],
})


export class Boletos {
  private router = inject(Router);
  constructor() {}
  private _formBuilder = inject(FormBuilder);
  
  @ViewChild('stepper') stepper!: MatStepper;

  // Formularios
  passengerFormArray: FormArray<FormGroup> = this._formBuilder.array<FormGroup>([]);
  passengerFormGroup = this._formBuilder.group({
    passengers: this.passengerFormArray
  });

  email = '';
  cardInfo = {
    cardNumber: '',
    expiry: '',
    cvv: ''
  };

  countdown = '05:00';  // inicaliza el temporizador
  paymentConfirmed = false;
  timerInterval: any;

  
  secondFormGroup = this._formBuilder.group({
    fromCtrl: ['', Validators.required],
    toCtrl: ['', Validators.required],
  });

  thirdFormGroup = this._formBuilder.group({
    date: ['', Validators.required],
  });

  busFormGroup = this._formBuilder.group({
    bus: ['', Validators.required],
  });
  availableBuses = [
    { id: 1, name: 'Bus 101 ' },
    { id: 2, name: 'Bus 102 ' },
  ];

  seats = [
    { number: 1, top: 15, left: 130 }, { number: 5, top: 15, left: 200 }, { number: 9, top: 15, left: 265 }, { number: 13, top: 15, left: 330 }, { number: 17, top: 15, left: 400 }, { number: 21, top: 15, left: 465 }, { number: 25, top: 15, left: 530 }, { number: 29, top: 15, left: 597 }, { number: 33, top: 15, left: 660 },{ number: 37, top: 15, left: 727 },{ number: 41, top: 15, left: 795 },
    { number: 2, top: 65, left: 130 }, { number: 6, top: 65, left: 200 }, { number: 10, top: 65, left: 265 }, { number: 14, top: 65, left: 330 }, { number: 18, top: 65, left: 400 }, { number: 22, top: 65, left: 465 }, { number: 26, top: 65, left: 530 }, { number: 30, top: 65, left: 597 }, { number: 34, top: 65, left: 660 },{ number: 38, top: 65, left: 727 },{ number: 42, top: 65, left: 795 },{ number: 43, top: 125, left: 795 },
    { number: 3, top: 175, left: 130 }, { number: 7, top: 175, left: 200 }, { number: 11, top: 175, left: 265 }, { number: 15, top: 175, left: 330 }, { number: 19, top: 175, left: 400 }, { number: 23, top: 175, left: 465 }, { number: 27, top: 175, left: 530 }, { number: 31, top: 175, left: 597 }, { number: 35, top: 175, left: 660 },{ number: 39, top: 175, left: 727 },{ number: 44, top: 175, left: 795 },
    { number: 4, top: 230, left: 130 }, { number: 8, top: 230, left: 200 }, { number: 12, top: 230, left: 265 }, { number: 16, top: 230, left: 330 }, { number: 20, top: 230, left: 400 }, { number: 24, top: 230, left: 465 }, { number: 28, top: 230, left: 530 }, { number: 32, top: 230, left: 597 }, { number: 36, top: 230, left: 660 },{ number: 40, top: 230, left: 727 },{ number: 45, top: 230, left: 795 }
  ].map(s => ({ ...s, status: 'available' }));

    // Esta función se llama cuando se hace clic en “Siguiente” del paso Asientos
    onSeatsNext() {
      this.generatePassengerForms();
      this.startCountdown();
      this.stepper.next();
    }

// Genera formularios dinámicos para cada pasajero basado en los asientos seleccionados
generatePassengerForms(): void {
  this.passengerFormArray.clear(); // Limpia si se regresa al paso anterior
  this.selectedSeats.forEach(() => {
    this.passengerFormArray.push(this._formBuilder.group({
      name: ['', Validators.required],
      id: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
    }));
  });
}

  // Temporizador
  startCountdown() {
    let total = 5 * 60; // 5 minutos en segundos
    clearInterval(this.timerInterval); // Limpia cualquier temporizador previo
    this.countdown = this.formatTime(total); // muestra el tiempo inicial

    this.timerInterval = setInterval(() => {
      total--;
      this.countdown = this.formatTime(total);
      
      if (total <= 0) {
        clearInterval(this.timerInterval);
        this.handleTimeout();
      }
    }, 1000);
  }
  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  handleTimeout() {
    alert('El tiempo expiró. La reserva ha sido cancelada.');
    this.resetStepper();
  }

  // Clase CSS dinámica para los asientos
  getSeatClass(status: string): string {
    return `seat ${status}`;
  }


// Array para almacenar los asientos seleccionados
  selectedSeats: number[] = [];
// Manejo de selección de asientos
selectSeat(seatNumber: number): void {
  const seat = this.seats.find(s => s.number === seatNumber);
  // Si el asiento no existe o está ocupado, no hacer nada
  if (!seat || seat.status === 'occupied') return;
    // alterna entre disponible y  reservada
    if (seat.status === 'available') {
      seat.status = 'reserved';
      this.selectedSeats.push(seatNumber);
    } else if (seat.status === 'reserved') {
      seat.status = 'available';
      this.selectedSeats = this.selectedSeats.filter(s => s !== seatNumber);
    }
  }
  
   // Pago del boleto
   paySeat() {
    if (!this.email || !this.cardInfo.cardNumber || !this.cardInfo.expiry || !this.cardInfo.cvv) {
      alert('Complete todos los datos de pago');
      return;
    }

  // Simula el pago y confirma la reserva
  this.seats.forEach(seat => {
    if (seat.status === 'reserved') seat.status = 'occupied';
  });
  this.paymentConfirmed = true;
  clearInterval(this.timerInterval);
}

verReserva() {
  this.router.navigate(['/reservas'], {
    state: {
      pasajeros: this.passengerFormArray.controls.map((form, index) => ({
        nombre: form.get('name')?.value,
        dpi: form.get('id')?.value,
        telefono: form.get('phone')?.value,
        from: this.secondFormGroup.get('fromCtrl')?.value,
        to: this.secondFormGroup.get('toCtrl')?.value,
        fecha: this.thirdFormGroup.get('date')?.value,
        asiento: this.selectedSeats[index]
      }))
    }
  });
}

  // Obtiene el nombre del bus seleccionado
  getSelectedBusName(): string {
    const selectedBusId = this.busFormGroup.get('bus')?.value;
    const selectedBus = this.availableBuses.find(bus => bus.id === Number(selectedBusId));
    return selectedBus ? selectedBus.name : 'No seleccionado';
  }

  // Reinicia el stepper y los formularios
  resetStepper(): void {

  // Reinicia los campos
    this.stepper.reset();
    this.paymentConfirmed = false;
    this.email = '';
    this.cardInfo = { cardNumber: '', expiry: '', cvv: '' };
    this.secondFormGroup.reset();
    this.thirdFormGroup.reset();
    this.busFormGroup.reset();
    this.passengerFormArray.clear();
    this.selectedSeats = [];
    clearInterval(this.timerInterval);
    // Reinicia el estado de los asientos
    this.seats = this.seats.map(seat => ({ ...seat, status: 'available' }));
  } 
  isLinear = false;

}



