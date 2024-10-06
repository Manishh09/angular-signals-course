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

  isLoggedIn = computed(() =>  !!this.user()); // check if user data available in user signal and update flag

  http = inject(HttpClient);

  router = inject(Router);
  
  constructor(){
    this.loadUserProfile()
    // added effect api to check if the user is available in the user signal and update the local storage
    // to avoid browser refresh issue of showing login / logout
    effect(() => {
     const user = this.user();
     if(user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
     }
    })
  }


  /**
   * Loads the user profile from local storage and sets it in the user signal.
   */
  loadUserProfile() {
    const isUserDataAvailable = localStorage.getItem(USER_STORAGE_KEY)
    if(isUserDataAvailable) {
      const user = JSON.parse(isUserDataAvailable)
      this.#userSignal.set(user)
    }
  }


  /**
   * Logs in a user with the provided email and password.
   * @param email - The email of the user.
   * @param password - The password of the user.
   * @returns A Promise that resolves to the logged-in User object.
   */
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


  /**
   * Logs out the user by removing the user data from local storage,
   * resetting the user signal, and navigating to the login page.
   * @returns A Promise that resolves when the logout process is complete.
   */
  async logout() {
    localStorage.removeItem(USER_STORAGE_KEY);
    this.#userSignal.set(null);
    await this.router.navigateByUrl('/login');
  }
}
