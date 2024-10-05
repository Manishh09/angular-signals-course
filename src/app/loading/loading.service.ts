import {Injectable, signal} from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LoadingService {

  #loadingSignal = signal<boolean>(false); // private signal variable

  loading = this.#loadingSignal.asReadonly(); // accessible to other components throughout the application

  loadingOn() {
    this.#loadingSignal.set(true)
  }
  
  loadingOff() {
    this.#loadingSignal.set(false);
  }
}
