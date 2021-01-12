import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { ListsItem } from 'src/app/models/lists-item.model';
import { WishesService } from 'src/app/services/wishes.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})

export class AddPage implements OnInit {

  list: List;
  nameItem = '';

  constructor(private wishesService: WishesService, private route: ActivatedRoute) {
    const listId = this.route.snapshot.paramMap.get('listId');
    this.list = this.wishesService.getList(listId);
  }

  ngOnInit() {
  }

  // Añadir nuevo item a la lista.
  addItem() {
    // Verificamos que este el input con alguna información.
    if(this.nameItem.length === 0) {
      return;
    }

    // Agregamos el item a la lista.
    const newItem = new ListsItem(this.nameItem);
    this.list.items.push(newItem);

    // Limpiamos el input donde se agregan los items.
    this.nameItem = '';

    // Guardamos los items nuevos en el Storage.
    this.wishesService.saveStorage();
  }

  // Verificación de la lista y el cambio de estatus.
  changeCheck(item: ListsItem) {
    
    // Se verifica si la lista esta terminada o no.
    const slopes = this.list.items.filter( itemData => !itemData.completed).length;

    if(slopes === 0) {
      this.list.completedIn = new Date;
      this.list.completed = true;
    } else {
      this.list.completedIn = null;
      this.list.completed = false;
    }
    
    // Salvamos los items con check de la lista en el Storage.
    this.wishesService.saveStorage();
  }

  // Borrar item.
  clear(i: number) {
    this.list.items.splice(i, 1);
    this.wishesService.saveStorage();
  }

}
