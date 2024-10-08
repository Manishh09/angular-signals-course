import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Course } from "../models/course.model";
import { inject } from "@angular/core";
import { CoursesService } from "../services/courses.service";
import { MessagesService } from "../messages/messages.service";

export const courseResolver: ResolveFn<Course | null> = 
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    
        // retrieve the courseId from URL

        const courseId = route.paramMap.get("courseId");
        if(!courseId) {
            return null
        }
        const courseService = inject(CoursesService)
        const messageService = inject(MessagesService)

        try {
            return courseService.getCoursesById(courseId);
        } catch (error) {
            messageService.showMessage(`Error while fetching course by courseId: ${courseId}`, "error")
            return null;
        }
         
        
    }


