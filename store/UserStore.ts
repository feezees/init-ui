import axios from "axios";
import { makeAutoObservable } from "mobx";
import { IDBRouteDto } from "../types/dto";

type TgUser = { username: string, id: number };

export class UserStore {
    RootStore: any;
    constructor(root: any) {
        makeAutoObservable(this), (this.RootStore = root);
    }

    links = [] as IDBRouteDto[];

    logout() {
    }

    tgUser: TgUser | undefined;
    
}
