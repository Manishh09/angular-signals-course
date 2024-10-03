import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { firstValueFrom } from "rxjs";
import { Course } from "../models/course.model";
import { GetCoursesResponse } from "../models/get-courses.response";


@Injectable({
  providedIn: "root"
})
export class CoursesService {

  env: any = environment
  #http = inject(HttpClient)

  async getCoursesWithHttp(): Promise<Course[]> {
    const courses$ = this.#http.get<GetCoursesResponse>(`${this.env.apiRoot}/courses`)

    const resp = await firstValueFrom(courses$)
    return resp.courses
  }

}
