import {Component, ElementRef, inject, signal, viewChild} from '@angular/core';
import {LessonsService} from "../services/lessons.service";
import {Lesson} from "../models/lesson.model";
import {LessonDetailComponent} from "./lesson-detail/lesson-detail.component";

@Component({
  selector: 'lessons',
  standalone: true,
  imports: [
    LessonDetailComponent
  ],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.scss'
})
export class LessonsComponent {





  lessons = signal<Lesson[]>([])

  mode = signal<"master" | "details">("master")

  selectedLesson = signal<Lesson | null>(null)

  lessonService = inject(LessonsService)

  searchInput = viewChild.required<ElementRef>('search') // Signal Query


  async onSearch() {
    const query = this.searchInput()?.nativeElement.value;
    try {
      const lessons = await this.lessonService.getLessons({query})
      this.lessons.set(lessons)
    } catch (error) {
      console.error(error);
      
    }
  }

  onLessonSelected(lesson: Lesson) {
    this.mode.set("details")
    this.selectedLesson.set(lesson)
  }

  onLessonUpdated(updatedLesson : Lesson) {
    this.mode.set("master") 
    this.lessons.update(lessons => 
      lessons.map(l => l.id === updatedLesson.id ? updatedLesson : l)
    )
    
  
  }


  onCancel() {
    this.mode.set("master")
  }
}
