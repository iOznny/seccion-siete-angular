import { ListsItem } from "./lists-item.model";

export class List {
    id: number;
    title: string;
    createdIn: Date;
    completedIn: Date;
    completed: boolean;
    items: ListsItem[];

    constructor(title: string) {
        this.title = title;
        this.createdIn = new Date();
        this.completed = false;
        this.items = [];
        this.id = new Date().getTime();
    }
}