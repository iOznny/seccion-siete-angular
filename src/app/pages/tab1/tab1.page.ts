import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { WishesService } from 'src/app/services/wishes.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  constructor(public wishesService: WishesService, 
    private router: Router, 
    private wishesServices: WishesService,
    private alertCtrl: AlertController) {
  }

  // Async transforma una función en una promesa.
  async addList() {
    // Await permite especificar a la bloque que se ejecuta que espere a que complete el proceso para posteriormente almacenarlo.
    // En este caso el alert ejecutara todo el codigo, se esperara y que lo almacenara en la alerta.
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Nueva Lista',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'Cancel',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Crear',
          handler: (data) => {
            // Validamos que el input tenga algo escrito.
            if(data.title.length === 0) {
              return;
            }

            const listId = this.wishesServices.createList(data.title);

            // Crear o agregar nueva lista.
            this.router.navigateByUrl(`/tabs/tab1/add/${ listId }`);

          }
        }
      ]
    });

    alert.present();
  }

}
