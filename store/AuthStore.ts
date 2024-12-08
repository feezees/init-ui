import axios from "axios";
import { makeAutoObservable } from "mobx";
import { DOMEN } from "../settings";
import { IDBRouteDto } from "../types/dto";
type TCurrent = HTMLInputElement | null;

export class AuthStore {
  RootStore: any;
  user: any;
  constructor(root: any) {
    makeAutoObservable(this), (this.RootStore = root);
  }

  isAuth = false;
  loading = true;
  links = [] as IDBRouteDto[];

  setLoading(value: boolean) {
    this.loading = value;
  }

  setAuth(value: boolean) {
    this.isAuth = value;
  }

  async authByTg({ username, id }: { username: string; id: number }) {

    axios.post(`${DOMEN}/api/loginByTg`, { username, id })
      .then((res) => {
        if (res.status !== 200) {
          this.RootStore.user.tgUser = { username, id };
          this.loading = false;
          this.isAuth = false;
        } else {
          this.loading = false;
          this.isAuth = true;

          this.RootStore.user.links = res.data.links;
        }
      })
      .catch((err) => {
        this.loading = false;
        this.isAuth = false;
      });
  }

  async tryAuthByToken() {
    axios
      .put(`${DOMEN}/api/login`)
      .then((res) => {
        if (res.status !== 200) {
          this.loading = false;
          this.isAuth = false;
        } else {
          this.loading = false;
          this.isAuth = true;

          this.RootStore.user.links = res.data.links;
        }
      })
      .catch((err) => {
        this.loading = false;
        this.isAuth = false;
      });
  }

  async submitLogin(login: string | undefined, password: string | undefined) {
    if (!login || !password) return;
    const PORT = this.RootStore.dev ? `3000` : `3001`;

    axios
      .post(`${DOMEN}/api/login`, {
        login: login,
        password: password,
      })
      .then((res) => {
        if (res.data.status === 200) {
          this.loading = false;
          this.isAuth = true;

          this.RootStore.user.links = res.data.links;
          return;
        }
        this.loading = false;
        this.isAuth = false;
      })
      .catch((err) => console.log(err));
  }

  async logout() {
    axios
      .post(`${DOMEN}/api/login`)
      .catch((err) => console.log(err))
      .then((res) => {
        this.loading = false;
        this.isAuth = false;
        this.RootStore.user.links = [];
      });
  }
}
