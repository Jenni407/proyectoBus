import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card'; 
import { MatButtonModule } from '@angular/material/button';


interface Ruta {
  titulo: string;
  imagen: string;
  duracion: string;
  salidas: string;
  servicios: string;
}

@Component({
  selector: 'app-rutas',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './rutas.html',
  styleUrl: './rutas.css'
})
export class Rutas {
  rutas: Ruta[] = [
    {
      titulo: 'Ciudad de Guatemala – Quiché',
      imagen: 'https://www.munisantacruzdelquiche.gob.gt/images/DJI_0187.jpg',
      duracion: '3 horas',
      salidas: 'Cada 2 horas, de 5:00 a.m. a 8:00 p.m.',
      servicios: 'Wi-Fi, asientos reclinables, aire acondicionado'
    },
    {
      titulo: 'Ciudad de Guatemala – San Marcos',
      imagen: 'https://guategt.com/wp-content/uploads/2015/03/San-Marcos.jpg',
      duracion: '4 horas',
      salidas: 'Cada 2 horas, de 5:00 a.m. a 8:00 p.m.',
      servicios: 'Wi-Fi, asientos reclinables, aire acondicionado'
    },
    {
      titulo: 'Ciudad de Guatemala – Huehuetenango',
      imagen: 'https://aprende.guatemala.com/wp-content/uploads/2017/11/Municipio-de-Huehuetenango-Huehuetenango.jpg',
      duracion: '6 horas',
      salidas: 'Cada 2 horas, de 5:00 a.m. a 8:00 p.m.',
      servicios: 'Wi-Fi, asientos reclinables, aire acondicionado'
    },
    {
      titulo: 'Ciudad de Guatemala – Izabal',
      imagen: 'https://www.guatevalley.com/photo/photo_a1/1104/a9GAq4kFOFfnPV7WG9bY.jpg',
      duracion: '7 horas',
      salidas: 'Cada 2 horas, de 5:00 a.m. a 8:00 p.m.',
      servicios: 'Wi-Fi, asientos reclinables, aire acondicionado'
    },
    {
      titulo: 'Ciudad de Guatemala – Retalhuleu',
      imagen: 'https://agn.gt/wp-content/uploads/2021/11/PALACIO-DEPARTAMENTAL-DE-RETALHULEU.jpg',
      duracion: '3 horas',
      salidas: 'Cada 2 horas, de 5:00 a.m. a 8:00 p.m.',
      servicios: 'Wi-Fi, asientos reclinables, aire acondicionado'
    },
    {
      titulo: 'Ciudad de Guatemala – Chiquimula',
      imagen: 'https://aprende.guatemala.com/wp-content/uploads/2021/06/Municipio-de-Chiquimula-Chiquimula.jpg',
      duracion: '3 horas',
      salidas: 'Cada 2 horas, de 5:00 a.m. a 8:00 p.m.',
      servicios: 'Wi-Fi, asientos reclinables, aire acondicionado'
    },
    {
      titulo: 'Ciudad de Guatemala – Jutiapa',
      imagen: 'https://www.guatevalley.com/photo/photo_a1/1904/kv5FMGs6Q3jU7NCCSn5E.jpg',
      duracion: '2 horas',
      salidas: 'Cada 2 horas, de 5:00 a.m. a 8:00 p.m.',
      servicios: 'Wi-Fi, asientos reclinables, aire acondicionado'
    },
    {
      titulo: 'Ciudad de Guatemala – Zacapa',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkCclOlcSoSjiGAFc1_lxX0PIxMzjikty3bw&s',
      duracion: '2 horas y media',
      salidas: 'Cada 2 horas, de 5:00 a.m. a 8:00 p.m.',
      servicios: 'Wi-Fi, asientos reclinables, aire acondicionado'
    },
    {
      titulo: 'Ciudad de Guatemala – El Progreso',
      imagen: 'https://www.guatemala.com/fotos/2023/01/San-Antonio-La-Paz-El-Progreso-885x500.png',
      duracion: '1 hora con 45 minutos',
      salidas: 'Cada 2 horas, de 5:00 a.m. a 8:00 p.m.',
      servicios: 'Wi-Fi, asientos reclinables, aire acondicionado'
    },
    {
      titulo: 'Ciudad de Guatemala – Baja Verapaz',
      imagen: 'https://aprende.guatemala.com/wp-content/uploads/2021/03/Descripci%C3%B3n-de-foto-Vista-a%C3%A9rea-y-de-d%C3%ADa-de-la-fiesta-titular-la-feria-desfile-e-iglesia-municipal-de-San-Jer%C3%B3nimo-Baja-Verapaz.-Cr%C3%A9dito-de-foto-Chome%C3%B1os-de-Coraz%C3%B3n.jpg',
      duracion: '3 horas',
      salidas: 'Cada 2 horas, de 5:00 a.m. a 8:00 p.m.',
      servicios: 'Wi-Fi, asientos reclinables, aire acondicionado'
    },
    {
      titulo: 'Ciudad de Guatemala – Alta Verapaz',
      imagen: 'https://aprende.guatemala.com/wp-content/uploads/2017/11/Departamento-de-Alta-Verapaz-Guatemala2.jpg',
      duracion: '3 horas y media',
      salidas: 'Cada 2 horas, de 5:00 a.m. a 8:00 p.m.',
      servicios: 'Wi-Fi, asientos reclinables, aire acondicionado'
    }
  ];

  currentIndex = 0;
  itemsPerPage = 3;

  get rutasVisibles(): Ruta[] {
    return this.rutas.slice(this.currentIndex, this.currentIndex + this.itemsPerPage);
  }

  next() {
    if (this.currentIndex + this.itemsPerPage < this.rutas.length) {
      this.currentIndex += this.itemsPerPage;
    }
  }

  prev() {
    if (this.currentIndex - this.itemsPerPage >= 0) {
      this.currentIndex -= this.itemsPerPage;
    }
  }
}
