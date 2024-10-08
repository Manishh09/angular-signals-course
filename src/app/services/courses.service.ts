import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpContext } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable, firstValueFrom } from "rxjs";
import { Course } from "../models/course.model";
import { GetCoursesResponse } from "../models/get-courses.response";
import { SkipLoading } from "../loading/skip-loading.component";


@Injectable({
  providedIn: "root"
})
export class CoursesService {

  env: any = environment
  #http = inject(HttpClient)

  async getCoursesWithHttp(): Promise<Course[]> {
    const courses$ = this.#http.get<GetCoursesResponse>(`${this.env.apiRoot}/courses`,
      // ensures , hide the loading 
      // {
      //   context: new HttpContext().set(SkipLoading, false)
      // }

    )

    const resp = await firstValueFrom(courses$)
    return resp.courses
  }

  async getCoursesById(courseId: string): Promise<Course> {
    const courses$ = this.#http.get<Course>(`${this.env.apiRoot}/courses/${courseId}`)

    const resp = await firstValueFrom(courses$)
    return resp
  }

  async createCourseWithHttp(course: Partial<Course>): Promise<Course> {
    const course$ = this.#http.post<Course>(
      `${this.env.apiRoot}/courses`, 
      course,
      // {
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // }
    )
    return  firstValueFrom(course$)
  }

  async saveCourseWithHttp(courseId: string, changes: Partial<Course>): Promise<Course> {
    const course$ = this.#http.put<Course>(
      `${this.env.apiRoot}/courses/${courseId}`, 
      changes,
    )
    return  firstValueFrom(course$)
  }


  async deleteCourseWithHttp(courseId: string): Promise<Object> {
   const delete$ =  this.#http.delete(
      `${this.env.apiRoot}/courses/${courseId}`
    )
    return  firstValueFrom(delete$)
  }






  getCoursesWithObservables(): Observable<Course[]> {
    return this.#http.get<Course[]>(`${this.env.apiRoot}/courses`)  
  }

}
