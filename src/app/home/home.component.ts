import { afterNextRender, Component, computed, effect, inject, Injector, OnInit, signal } from '@angular/core';
import { CoursesService } from "../services/courses.service";
import { Course, sortCoursesBySeqNo } from "../models/course.model";
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { CoursesCardListComponent } from "../courses-card-list/courses-card-list.component";
import { MatDialog } from "@angular/material/dialog";
import { MessagesService } from "../messages/messages.service";
import { catchError, from, retry, single, tap, throwError } from "rxjs";
import { toObservable, toSignal, outputToObservable, outputFromObservable } from "@angular/core/rxjs-interop";
import { CoursesServiceWithFetch } from '../services/courses-fetch.service';
import { GetCoursesResponse } from '../models/get-courses.response';
import { openDialog } from '../edit-course-dialog/edit-course-dialog.component';
import { LoadingService } from '../loading/loading.service';

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


  beginnerCourses = computed(() => {
    const courses = this.#courses();
    return courses.filter(course => course.category === 'BEGINNER')
  }
  )
  advancedCourses = computed(() => {
    const courses = this.#courses();
    return courses.filter(course => course.category === 'ADVANCED')
  }
  )
  courseServiceWithFetch = inject(CoursesServiceWithFetch)
  courseServiceWithHttp = inject(CoursesService)

  injector = inject(Injector)

  dialog = inject(MatDialog)

  loadingService = inject(LoadingService)

  constructor() {
    effect(() => {
      console.log('beginner courses', this.beginnerCourses());
      console.log('advanced courses', this.advancedCourses());
    })
  }

  /*
  constructor() {
    this.getCourses()
    .then(() => console.log('courses are loaded', this.courses())
    )
  }
  */

  /*
  constructor() {
    afterNextRender(() => {
      this.getCourses()
      .then(() => console.log('courses are loaded', this.courses())
      )
    })
  }
  */

  ngOnInit(): void {
    //this.getCoursesWithFetch()
    this.getCoursesWithHttp()
      .then(() => console.log('courses are loaded', this.#courses())
      )



    /*
    toSignal(this.courseServiceWithHttp.getCoursesWithObservables().pipe(
      tap((resp : any) => {
      this.#courses.set(resp.courses)
      }),
     ), {
      initialValue: [], injector: this.injector
     })
    */






  }
  /*
  async getCoursesWithFetch() {
    try {
      const courses = await this.courseServiceWithFetch.getCoursesWithFetch()
      this.#courses.set(courses.sort(sortCoursesBySeqNo))
    } catch (error) {
      console.log("Error while loading the courses")
    }
  }
  */


  async getCoursesWithHttp() {
    try {
      this.loadingService.loadingOn()
      const courses = await this.courseServiceWithHttp.getCoursesWithHttp()
      this.#courses.set(courses)
    } catch (error) {
      console.log("Error while loading the courses")
    } finally {
      this.loadingService.loadingOff()
    }
  }


  async onAddCourse() {
   const newCourse = await openDialog(this.dialog, {
      mode: "create" as const,
      title: "Create New Course",
    })

    const newCourses = [
      ...this.#courses(), 
      newCourse
    ]
    this.#courses.set(newCourses)
  }
    


  onCourseUpdated(updatedCourse: Course) {
    // get current courses
    const courses = this.#courses()
    // update the current / original courses if there's a matching id found
    const newCourses = courses.map((course) => (
      course.id === updatedCourse.id ? updatedCourse : course
      )
    )
    // emit the signal 
    this.#courses.set(newCourses)
  }


  async onCourseDeleted(course: Course) {
    const courseId = course.id;

    try {
      this.loadingService.loadingOn()
      // call the delete api
      await this.courseServiceWithHttp.deleteCourseWithHttp(courseId);
      // update the original data
      const courses = this.#courses();
      // filter courses without the deleted course's id
      const newCourses = courses.filter(course =>  course.id !== courseId);
      // emit the signal
      this.#courses.set(newCourses)
      alert(`Course with id ${courseId} has been deleted`)
    } catch (error) {
      console.error(error);
      
    } finally {
      this.loadingService.loadingOff()
    }

  }

}
