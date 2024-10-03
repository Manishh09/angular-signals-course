import { Component, Injector, effect, inject, signal } from '@angular/core';

@Component({
  selector: 'effects-demo',
  standalone: true,
  imports: [],
  templateUrl: './effects-demo.component.html',
  styleUrl: './effects-demo.component.scss'
})
export class EffectsDemoComponent {
  count = signal(0); // WritableSignal

  /* EFFECT API

    to perform side effects
    e.g logging data to console.
    automatically detects changes in source signal 
    always gets executed at least once when app initialized
    and triggers upon source signal value change
    overusing is not recommended
    use effects outside signals context in response to the signal values
    e.g pre-save form-data in local storage upon signal value change 
  */
  constructor() {

    effect(() => {
      console.log("counter value", this.count())
    })

  }

  inc() {
    this.count.update(c => c + 1)
  }

 

  /* 
    an effect must have a dependency signal
    angular has to know , when to cleanup the effects , 
    
    should define effect's injection context. here , constructor is one such context
    how ? effect function will grab the dependency context of where it was called.
    gets destroyed whenever the host component get destroyed 
  
  */

  // EFFECT - INJECTION CONTEXT

  injector = inject(Injector) 
  eff = effect( () => {
    console.log("effect is outside the constructor now, in other injection context");
    },
    // Manually defining the injection context for the effect function 
    {
      injector: this.injector
    }
  )

}
