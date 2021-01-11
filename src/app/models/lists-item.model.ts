export class ListsItem {
    desc: string;
    completed: boolean;

    constructor(desc: string) {
        this.desc = desc;
        this.completed = false;
    }
}