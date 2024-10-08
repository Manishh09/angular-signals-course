import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Lesson } from "../models/lesson.model";
import { LessonsService } from "../services/lessons.service";
import { inject } from "@angular/core";
import { MessagesService } from "../messages/messages.service";

export const lessonResolver: ResolveFn<Lesson[] | null> = 
        (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

            const lessonService = inject(LessonsService)
            const messageService = inject(MessagesService)
            const courseId = route.paramMap.get("courseId") as string
            
            try {
                const lessons = lessonService.getLessons({courseId});
                return lessons
            } catch (error) {
                messageService.showMessage(`Error while fetching lessons`, "error")
                return null
            }

        }