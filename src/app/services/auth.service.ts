import {computed, effect, inject, Injectable, signal} from "@angular/core";
import {User} from "../models/user.model";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";

const USER_STORAGE_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  env: any = environment;
  #userSignal = signal<User | null>(null);

  user = this.#userSignal.asReadonly();

  isLoggedIn = computed(() =>  !!this.user()) // check if user data available in user signal and update flag

  http = inject(HttpClient);


  async login(email: string, password: string) : Promise<User> {

    const login$ = this.http.post(`${this.env.apiRoot}/login`,

      {
        email, 
        password
      }
    );

    const user = await firstValueFrom(login$) as User;

    this.#userSignal.set(user);

    return user;
  }


}
