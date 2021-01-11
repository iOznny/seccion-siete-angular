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

}
