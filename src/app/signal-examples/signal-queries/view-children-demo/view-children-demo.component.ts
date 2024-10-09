import { Component, ElementRef, OnInit, effect, inject, signal, viewChildren } from '@angular/core';
import { Course } from '../../../models/course.model';
import { CoursesService } from '../../../services/courses.service';

@Component({
  selector: 'view-children-demo',
  standalone: true,
  imports: [],
  templateUrl: './view-children-demo.component.html',
  styleUrl: './view-children-demo.component.scss'
})
export class ViewChildrenDemoComponent implements OnInit{
  courses = signal<Course[]>([])
  courseServiceWithHttp = inject(CoursesService)

  courseCard = viewChildren<ElementRef>("courseCard")
  constructor() {

    effect(() => {
      console.log("view-children query: ", this.courseCard());
      
    })

    effect(() => {
      console.log("courses: ", this.courses());
      
    })
  }

  ngOnInit(): void {
      this.getCoursesWithHttp()
  }

  async getCoursesWithHttp() {
    try {
     
      const courses = await this.courseServiceWithHttp.getCoursesWithHttp()
      this.courses.set(courses)
    } catch (error) {
      console.log("Error while loading the courses")
       
    }
     
  }
}
