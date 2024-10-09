import {Component, ElementRef, inject, input, output, viewChild} from '@angular/core';
import {Lesson} from "../../models/lesson.model";
import {ReactiveFormsModule} from "@angular/forms";
import {LessonsService} from "../../services/lessons.service";
import {MessagesService} from "../../messages/messages.service";

@Component({
  selector: 'lesson-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './lesson-detail.component.html',
  styleUrl: './lesson-detail.component.scss'
})
export class LessonDetailComponent {



  lesson = input.required<Lesson | null>()

  lessonUpdated = output<Lesson>()
  cancel = output()


  lessonService = inject(LessonsService)
  messageService = inject(MessagesService)
  description = viewChild.required<ElementRef>("description")

  async onSave( ) {
    const description = this.description()?.nativeElement.value;
    
    
    

    try {
      const lesson = this.lesson()


      const updatedLesson = await this.lessonService.saveLesson(lesson!.id, {description});
      this.lessonUpdated.emit(updatedLesson)
      
    } catch (error) {
      this.messageService.showMessage(
        `Error saving the lesson`,
        "error"
      )
    }
     
  }


  onCancel() {
    this.cancel.emit()
  }

}
