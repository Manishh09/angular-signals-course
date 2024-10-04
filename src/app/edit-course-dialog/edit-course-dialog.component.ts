import { Component, effect, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { Course } from "../models/course.model";
import { EditCourseDialogData } from "./edit-course-dialog.data.model";
import { CoursesService } from "../services/courses.service";
import { LoadingIndicatorComponent } from "../loading/loading.component";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CourseCategoryComboboxComponent } from "../course-category-combobox/course-category-combobox.component";
import { CourseCategory } from "../models/course-category.model";
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'edit-course-dialog',
  standalone: true,
  imports: [
    LoadingIndicatorComponent,
    ReactiveFormsModule,
    CourseCategoryComboboxComponent
  ],
  templateUrl: './edit-course-dialog.component.html',
  styleUrl: './edit-course-dialog.component.scss'
})
export class EditCourseDialogComponent {

  #dialogRef = inject(MatDialogRef)

  data: EditCourseDialogData = inject(MAT_DIALOG_DATA)

  coursesService = inject(CoursesService)

  // form creation
  fb = inject(FormBuilder)

  form = this.fb.group({
    title: [''],
    longDescription: [''],
    iconUrl: [''],
    category: ['']
  })

  constructor() {
    const isCreate = this.data.mode === "create";
    if (!isCreate) {
      this.initForm();
    }
  }


  private initForm() {

    this.form.patchValue({
      title: this.data?.course?.title,
      longDescription: this.data?.course?.longDescription,
      iconUrl: this.data?.course?.iconUrl,
      category: this.data?.course?.category
    });
  }

  onSave() {
    console.log('form-value', this.form.value);

    const courseData = this.form.value as Partial<Course>

    if (this.data.mode === "update") {
      this.saveCourse(this.data?.course!.id, courseData)
      return
    }
    this.createCourse(courseData)


  }

  async createCourse(course: Partial<Course>) {
    try {
      // call api 
      const newCourse = await this.coursesService.createCourseWithHttp(course)
      // close dialog
      this.#dialogRef.close(newCourse)

    } catch (error) {
      console.error(error);

    }
  }


  async saveCourse(courseId: string, changes: Partial<Course>) {
    try {
      // call the api
      const updatedCourseData = await this.coursesService.saveCourseWithHttp(courseId, changes)
      // close the dialog
      this.#dialogRef.close(updatedCourseData)

    } catch (error) {
      console.error(error);

    }
  }


  onClose() {
    this.#dialogRef.close()
  }
}

export async function openDialog(dialog: MatDialog, data: EditCourseDialogData) {

  const config = new MatDialogConfig()
  config.disableClose = true
  config.autoFocus = true
  config.width = "400px"
  config.data = data

  const closeDialog$ = dialog.open(EditCourseDialogComponent, config).afterClosed()
  return firstValueFrom(closeDialog$)
}
