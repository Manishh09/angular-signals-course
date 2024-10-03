import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'computed-signals-demo',
  standalone: true,
  imports: [],
  templateUrl: './computed-signals-demo.component.html',
  styleUrl: './computed-signals-demo.component.scss'
})
export class ComputedSignalsDemoComponent {
  count = signal(0); // WritableSignal

  inc(){
    this.count.update(c => c + 1)
  }
  
  // COMPUTED SIGNALS

  /*
    read-only signals 
    automatically updated based on source signal values
    if source signal has a value  change -> then the computed signal will be updated automatically.
    must return a value
    derives a reactive value from an expression.
  */
  multiply = computed(() => {
    const val = this.count() // count - is a source signal here
    return  val * 10
  })


  // signal dependencies are transitive
  // here the multiplyAgain signal will get updated based on multiply signal

  multiplyAgain = computed(() => {
    const val = this.multiply()
    return val * 20
  })

  // you can just invoke the source signal inside a computed signal api - so that the dependency created between computed and source signals
  // assigning and taking the value from it is not required.
  // cycle should not be created bw signals
  /*
  multiply = computed(() => {
    const val = this.count() // count - is a source signal here
    this.multiplyAgain()
    return val * 20
  }) 
    
  */

}
