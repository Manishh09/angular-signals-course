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
}
