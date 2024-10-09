import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {LessonsComponent} from "./lessons/lessons.component";
import { isUserAuthenticated } from './guards/auth.guard';
import { CourseComponent } from './course/course.component';
import { courseResolver } from './resolvers/course.resolver';
import { lessonResolver } from './resolvers/lesson.resolver';
import { ViewChildrenDemoComponent } from './signal-examples/signal-queries/view-children-demo/view-children-demo.component';
import { ContentChildDemoComponent } from './signal-examples/signal-queries/content-child-demo/content-child-demo.component';
import { ContentChildrenDemoComponent } from './signal-examples/signal-queries/content-children-demo/content-children-demo.component';
import { DemoQueriesComponent } from './signal-examples/signal-queries/demo-queries/demo-queries.component';
import { ViewChildDemoComponent } from './signal-examples/signal-queries/view-child-demo/view-child-demo.component';

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
    path: "view-child-query",
    component: ViewChildDemoComponent
  },

  {
    path: "view-children-query",
    component: ViewChildrenDemoComponent
  },

  
  {
    path: "content-child-query",
    component: ContentChildDemoComponent
  },

  {
    path: "content-children-query",
    component: ContentChildrenDemoComponent
  },

  {
    path: "demo-queries",
    component: DemoQueriesComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
