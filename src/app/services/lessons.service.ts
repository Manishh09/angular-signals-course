import {inject, Injectable} from "@angular/core";
import {Lesson} from "../models/lesson.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {GetLessonsResponse} from "../models/get-lessons.response";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  env: any = environment;

  #http = inject(HttpClient)

  async getLessons(config: {courseId?: string, query?: string}) : Promise<Lesson[]> {
    let httpParams = new HttpParams()
    if(config.courseId){
      httpParams = httpParams.set("courseId",config.courseId)
    }
    if(config.query){
      httpParams = httpParams.set("query",config.query)
    }
    const lessons$ = this.#http.get<GetLessonsResponse>(
      `${this.env.apiRoot}/search-lessons`,
      {
        params: httpParams
      }
    );

    const resp = await firstValueFrom(lessons$);

    return resp.lessons;
  }



}
