import { Component, ElementRef, contentChild, contentChildren, effect } from '@angular/core';
import { ContentChildDemoComponent } from "../content-child-demo/content-child-demo.component";

@Component({
  selector: 'demo-queries',
  standalone: true,
  imports: [],
  templateUrl: './demo-queries.component.html',
  styleUrl: './demo-queries.component.scss'
})
export class DemoQueriesComponent {
  actions = contentChildren<ElementRef>("actions")


  title = contentChild<ElementRef>("title")

  body = contentChild.required<ElementRef>("body")

  comp = contentChild.required<ElementRef>("comp")

  

 
  constructor() {
    effect( () => {
      console.log("actions", this.actions());

      console.log("title", this.title());
      console.log("body", this.body());
      console.log("component", this.comp());
    }) 
  }
}
