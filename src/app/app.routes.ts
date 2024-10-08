import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {LessonsComponent} from "./lessons/lessons.component";
import { isUserAuthenticated } from './guards/auth.guard';
import { CourseComponent } from './course/course.component';
import { courseResolver } from './resolvers/course.resolver';
import { lessonResolver } from './resolvers/lesson.resolver';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [isUserAuthenticated],
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "course/:courseId",
    component: CourseComponent,
    canActivate: [isUserAuthenticated],
    resolve: {
      course: courseResolver,
      lessons: lessonResolver
    }
  },
  {
    path: "lessons",
    component: LessonsComponent,
    canActivate: [isUserAuthenticated],
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
