import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { List } from 'src/app/models/list.model';
import { WishesService } from 'src/app/services/wishes.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})

export class ListsComponent implements OnInit {

  // Obtener un componente del HTML basado del Ionic.
  @ViewChild(IonList) list: IonList;

  @Input() finished = true;

  constructor(public wishesService: WishesService, private router: Router, private alertCtrl: AlertController) {
  }

  ngOnInit() {
  }

  // Obtenemos la lista que ha sido selecionada en /tabs/tab1.
  listSelected(list: List) {
    if(this.finished) {
      this.router.navigateByUrl(`/tabs/tab2/add/${ list.id }`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/add/${ list.id }`);
    }
  }

  // Borrar lista.
  clear(list: List) {
    this.wishesService.deleteList(list);
  }

  // Editar nombre de Lista.
  async edit(list: List) {
    console.log(list);
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Editar lista',
      inputs: [
        {
          name: 'title',
          type: 'text',
          value: list.title,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'Cancel',
          handler: () => {
            console.log('Cancelar');
            // Cerrar el ion-list.
            this.list.closeSlidingItems();
          }
        },
        {
          text: 'Actualizar',
          handler: (data) => {
            // Validamos que el input tenga algo escrito.
            if(data.title.length === 0) {
              return;
            }

            // Actualizamos el titulo.
            list.title = data.title;
            // Guardamos en el Storage el cambio.
            this.wishesService.saveStorage();

            // Cerrar el ion-list.
            this.list.closeSlidingItems();
          }
        }
      ]
    });

    alert.present();
  }

}
