import { CommonModule } from '@angular/common';
import {  inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { Component, ViewChild } from '@angular/core';
import { MatStepperModule, MatStepper } from '@angular/material/stepper';
import { MatButton } from '@angular/material/button';
import { RouterModule } from '@angular/router';

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
    RouterModule
  ],
  templateUrl: './boletos.html',
  styleUrls: ['./boletos.css'],
})


export class Boletos {
  private _formBuilder = inject(FormBuilder);
  @ViewChild('stepper') stepper!: MatStepper;

  selectedSeat: number | null = null; 
  countdown: string = '19:52';
  paymentConfirmed: boolean = false;

  // Formularios 
  secondFormGroup = this._formBuilder.group({
    fromCtrl: ['', Validators.required],
    toCtrl: ['', Validators.required],
  });

  thirdFormGroup = this._formBuilder.group({
    date: ['', Validators.required],
  });

  passengerFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    id: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]], // solo 8 dígitos
  });

  seats = [
    { number: 1, top: 15, left: 130 }, { number: 5, top: 15, left: 200 }, { number: 9, top: 15, left: 265 }, { number: 13, top: 15, left: 330 }, { number: 17, top: 15, left: 400 }, { number: 21, top: 15, left: 465 }, { number: 25, top: 15, left: 530 }, { number: 29, top: 15, left: 597 }, { number: 33, top: 15, left: 660 },{ number: 37, top: 15, left: 727 },{ number: 41, top: 15, left: 795 },
    { number: 2, top: 65, left: 130 }, { number: 6, top: 65, left: 200 }, { number: 10, top: 65, left: 265 }, { number: 14, top: 65, left: 330 }, { number: 18, top: 65, left: 400 }, { number: 22, top: 65, left: 465 }, { number: 26, top: 65, left: 530 }, { number: 30, top: 65, left: 597 }, { number: 34, top: 65, left: 660 },{ number: 38, top: 65, left: 727 },{ number: 42, top: 65, left: 795 },{ number: 43, top: 125, left: 795 },
    { number: 3, top: 175, left: 130 }, { number: 7, top: 175, left: 200 }, { number: 11, top: 175, left: 265 }, { number: 15, top: 175, left: 330 }, { number: 19, top: 175, left: 400 }, { number: 23, top: 175, left: 465 }, { number: 27, top: 175, left: 530 }, { number: 31, top: 175, left: 597 }, { number: 35, top: 175, left: 660 },{ number: 39, top: 175, left: 727 },{ number: 44, top: 175, left: 795 },
    { number: 4, top: 230, left: 130 }, { number: 8, top: 230, left: 200 }, { number: 12, top: 230, left: 265 }, { number: 16, top: 230, left: 330 }, { number: 20, top: 230, left: 400 }, { number: 24, top: 230, left: 465 }, { number: 28, top: 230, left: 530 }, { number: 32, top: 230, left: 597 }, { number: 36, top: 230, left: 660 },{ number: 40, top: 230, left: 727 },{ number: 45, top: 230, left: 795 }
  ].map(s => ({ ...s, status: 'available' }));

  constructor() {
    let timeLeft = 19 * 60 + 52;
    setInterval(() => {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      this.countdown = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      timeLeft--;
      if (timeLeft < 0) {
        this.countdown = '00:00';
      }
    }, 1000);
  }

  getSeatClass(status: string): string {
    return `seat ${status}`;
  }

  selectSeat(seatNumber: number): void {
    const seat = this.seats.find(s => s.number === seatNumber);
    if (seat) {
      // alterna entre disponible, apartada y reservada
      if (seat.status === 'available') {
        seat.status = 'held';
        this.selectedSeat = seat.number;
      } else if (seat.status === 'held') {
        seat.status = 'reserved';
        this.selectedSeat = seat.number;
      } else if (seat.status === 'reserved') {
        seat.status = 'available';
        this.selectedSeat = null;
      }
    }
  }

  paySeat(): void {
    let anyReserved = false;
    this.seats.forEach(seat => {
      if (seat.status === 'reserved') {
        seat.status = 'occupied';
        anyReserved = true;
      }
    });
    this.paymentConfirmed = anyReserved;
  }

  resetStepper(): void {

  // Reinicia los campos
    this.stepper.reset();
    this.paymentConfirmed = false;
    this.selectedSeat = null; // reiniciar la selección de asiento
    this.secondFormGroup.reset();
    this.thirdFormGroup.reset();
    this.passengerFormGroup.reset();
    this.seats = this.seats.map(seat => ({ ...seat, status: 'available' }));
  }
  isLinear = false;
}

