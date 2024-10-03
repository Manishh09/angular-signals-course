import {afterNextRender, Component, computed, effect, inject, Injector, OnInit, signal} from '@angular/core';
import {CoursesService} from "../services/courses.service";
import {Course, sortCoursesBySeqNo} from "../models/course.model";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {CoursesCardListComponent} from "../courses-card-list/courses-card-list.component";
import {MatDialog} from "@angular/material/dialog";
import {MessagesService} from "../messages/messages.service";
import {catchError, from, retry, single, throwError} from "rxjs";
import {toObservable, toSignal, outputToObservable, outputFromObservable} from "@angular/core/rxjs-interop";
import { CoursesServiceWithFetch } from '../services/courses-fetch.service';

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
export class HomeComponent implements OnInit {
   #courses = signal<Course[]>([])

   beginnerCourses = computed(() =>  {
      const courses =  this.#courses();
      return courses.filter(course => course.category === 'BEGINNER')
    }
   )
   advancedCourses = computed(() =>  {
    const courses =  this.#courses();
    return courses.filter(course => course.category === 'ADVANCED')
  }
 )
   courseServiceWithFetch = inject(CoursesServiceWithFetch)
   courseServiceWithHttp = inject(CoursesService)


   constructor() {
    effect(() => {
      console.log('beginner courses', this.beginnerCourses());
      console.log('advanced courses', this.advancedCourses());
    })
   }

  // constructor() {
  //   this.getCourses()
  //   .then(() => console.log('courses are loaded', this.courses())
  //   )
  // }

  // constructor() {
  //   afterNextRender(() => {
  //     this.getCourses()
  //     .then(() => console.log('courses are loaded', this.courses())
  //     )
  //   })
  // }

  ngOnInit(): void {
    //this.getCoursesWithFetch()
    this.getCoursesWithHttp()
    .then(() => console.log('courses are loaded', this.#courses())
    )

    
    
  }
   async getCoursesWithFetch() {
    try {
      const courses = await this.courseServiceWithFetch.getCoursesWithFetch()
      this.#courses.set(courses)
    } catch (error) {
      console.log("Error while loading the courses")
    }
    }


    async getCoursesWithHttp() {
      try {
        const courses = await this.courseServiceWithHttp.getCoursesWithHttp()
        this.#courses.set(courses)
      } catch (error) {
        console.log("Error while loading the courses")
      }
      }
  



  }
