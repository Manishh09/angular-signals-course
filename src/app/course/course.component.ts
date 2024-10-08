import { Component, OnInit, inject, signal } from '@angular/core';
import { Course } from '../models/course.model';
import { Lesson } from '../models/lesson.model';
import { ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'course',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent implements OnInit{

  activatedRoute = inject(ActivatedRoute)

  course = signal<Course | null>(null)

  lessons = signal<Lesson[]>([])

  ngOnInit(): void {
     const routeData =  this.activatedRoute.snapshot.data;

     this.course.set(routeData["course"])
     this.lessons.set(routeData["lessons"])
  }
}
