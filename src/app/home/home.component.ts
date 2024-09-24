import {Component, computed, effect, inject, Injector, signal} from '@angular/core';
import {CoursesService} from "../services/courses.service";
import {Course, sortCoursesBySeqNo} from "../models/course.model";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {CoursesCardListComponent} from "../courses-card-list/courses-card-list.component";
import {MatDialog} from "@angular/material/dialog";
import {MessagesService} from "../messages/messages.service";
import {catchError, from, single, throwError} from "rxjs";
import {toObservable, toSignal, outputToObservable, outputFromObservable} from "@angular/core/rxjs-interop";

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    CoursesCardListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  count = signal(0) // By Default , here the signal variable is of of WritableSignal type.

  readlySignalVar = signal(0).asReadonly(); // Here, the signal is ReadOnly

  signalWithObj = signal<Counter>({
    value: 10
  })

  inc(){
    this.count.update(c => c + 1)
  }

  dec() {
    this.count.update(c => c - 1)
  }

  set() {
    this.count.set( this.count() + 1)
  }

  updateSignalsWithObj() {
    //this.signalWithObj().value ++ // should not do this. we loose the signal features
    // signalWithObj is Writable Signal of type Counter
    this.signalWithObj.update( (v: Counter) => ({
      ...v,
      value:  v.value + 1
    })
    )
  }


  modifySignalVal() {
    // modification is not allowed on read-only signals
    // this.readlySignalVar.set(this.readlySignalVar() + 1);
    // this.readlySignalVar.update(c =>  c + 1); 
  }

}

type Counter = {
  value : number
}
