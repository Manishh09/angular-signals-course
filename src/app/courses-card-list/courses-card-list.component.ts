import {Component, inject, input, output} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Course} from "../models/course.model";
import {MatDialog} from "@angular/material/dialog";
import { openDialog } from '../edit-course-dialog/edit-course-dialog.component';

@Component({
  selector: 'courses-card-list',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './courses-card-list.component.html',
  styleUrl: './courses-card-list.component.scss'
})
export class CoursesCardListComponent {


  // courses is InputSignal of type Course[]
  // read-only signal
  courses = input.required<Course[]>();

  courseUpdated = output<Course>();

  courseDeleted = output<Course>();

  #dialog = inject(MatDialog)

  async onEditCourse(course: Course) {
    const config = {
      mode : "update" as const,
      title: 'Update Existing course',
      course

    }
    const newCourse = await openDialog(this.#dialog, config)
    console.log('Course has been updated', newCourse);

    // emit the newCourses / updated course
    this.courseUpdated.emit(newCourse)
    
  }

  onCourseDeleted(course: Course) {
    this.courseDeleted.emit(course)
  }

}
