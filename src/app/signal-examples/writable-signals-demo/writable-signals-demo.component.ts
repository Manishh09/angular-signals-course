import { Component, signal } from '@angular/core';

@Component({
  selector: 'writable-signal-demo',
  standalone: true,
  imports: [],
  templateUrl: './writable-signals-demo.component.html',
  styleUrl: './writable-signals-demo.component.scss'
})
export class WritableSignalsDemoComponent {
  count = signal(0) // By Default , here the signal variable is  WritableSignal of number type.
  
  // signal with custom type - object
  signalWithObj = signal<Counter>({
    value: 10
  })

  // signal with the type array
  signalWithArray = signal<Array<number>>([0])

  // read-only signals
  readOnlySignal = signal(0).asReadonly();

  inc(){
    this.count.update(c => c + 1)
  }

  dec() {
    this.count.update(c => c - 1)
  }

  set() {
    this.count.set( this.count() + 1)
  }


  // UPDATE SIGNALS
  // 1. Objects

  updateSignalManually() {
    this.signalWithObj().value++
    // should not do this. we loose the signal features
    // and it will not work with signal based change detection
    // angular will not know about the data change and will not update DOM
  }

  
  updateSignalsWithObj() {
    // its not advised to mutate the signal values directly
    // we should use signal APIs so that the angular will know about new values and updates the DOM
    // signalWithObj is Writable Signal of type Counter
    this.signalWithObj.update( (v: Counter) => ({
        ...v,
        value:  v.value + 1
      })
    )
  }

  // 2. Arrays
  updateSignalsWithArray(){
    this.signalWithArray.update(values => 
      (
        [
          ...values,
          values[values.length - 1] + 1
        ]
      )
    )
  }

  // ReadOnly Signals
  modifyReadOnlySignalVal() {
   // modification is not allowed on read-only signals
    
    /*
      this.readOnlySignal.set(this.readOnlySignal() + 1);
      this.readOnlySignal.update(c =>  c + 1);
    */ 
  }

  // Next ---> COMPUTED SIGNALS - updated automatically whenever the source signal value changes.
}

type Counter = {
  value: number
}
