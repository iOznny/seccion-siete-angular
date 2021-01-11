import { Injectable } from '@angular/core';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})

export class WishesService {

  // Lista donde guardaremos los title y items de la misma.
  lists: List[] = [];

  constructor() {
    // Cargamos el storage.
    this.loadStorage();

    //const list_one = new List('Recolectar');
    //this.lists.push(list_one);
  }

  // Creamos la lista.
  createList(title: string) {
    const new_list = new List(title);
    this.lists.push(new_list);
    this.saveStorage();

    return new_list.id;
  }

  // Obtener lista.
  getList(id: string | number) {
    id = Number(id);
    return this.lists.find( listData => listData.id === id);
  }

  // Guardamos la nueva lista creada.
  saveStorage() {
    localStorage.setItem('data', JSON.stringify(this.lists) );
  }

  // Cargamos las listas almacenadas en el storage.
  loadStorage() {
    if(localStorage.getItem('data')) {
      this.lists = JSON.parse(localStorage.getItem('data'));
    }
  }

  
}
