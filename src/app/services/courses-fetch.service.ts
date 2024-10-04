import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Course} from "../models/course.model";


@Injectable({
  providedIn: "root"
})
export class CoursesServiceWithFetch {

  env: any = environment;

  async getCoursesWithFetch() : Promise<Course[]> {
   const resp =  await fetch(`${this.env.apiRoot}/courses`)
   const jsonResp = await resp.json()
   return jsonResp.courses as Course[];
  }

  async createCourseWithFetch(course: Partial<Course>): Promise<Course> {
    const resp =  await fetch(`${this.env.apiRoot}/courses`,
       {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(course)
       }
    )

    return  resp.json()
  }

  async saveCourseWithFetch(courseId: string, changes: Partial<Course>): Promise<Course> {
    const resp =  await fetch(`${this.env.apiRoot}/courses/${courseId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(changes)
      }
    )

    return  resp.json()
  }

  async deleteCourseWithFetch(courseId: string): Promise<void> {
    const resp =  await fetch(`${this.env.apiRoot}/courses/${courseId}`,
      {
        method: 'DELETE',
         
      }
    )

    return  resp.json()
  }
}
