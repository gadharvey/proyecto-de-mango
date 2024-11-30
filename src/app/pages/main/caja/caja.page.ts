import { Component, inject, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateProductoComponent } from 'src/app/util/componente/add-update-producto/add-update-producto.component';
import { orderBy, where } from 'firebase/firestore'

@Component({
  selector: 'app-caja',
  templateUrl: './caja.page.html',
  styleUrls: ['./caja.page.scss'],
})
export class CajaPage implements OnInit {
  

  firebaseSvc = inject(FirebaseService); // cargamos el servicio de firebase
  utilsSvc = inject(UtilsService); // cargamos el servicio de utils





  constructor() { }

  ngOnInit() {

  }

  user(): User {
    return this.utilsSvc.obtenerDeLocalStorage('user');
  }




}
