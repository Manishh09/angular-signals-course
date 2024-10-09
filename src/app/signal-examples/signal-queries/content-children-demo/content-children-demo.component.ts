import { Component, ElementRef, contentChildren, effect } from '@angular/core';
import { DemoQueriesComponent } from "../demo-queries/demo-queries.component";

@Component({
  selector: 'content-children-demo',
  standalone: true,
  imports: [DemoQueriesComponent],
  templateUrl: './content-children-demo.component.html',
  styleUrl: './content-children-demo.component.scss'
})
export class ContentChildrenDemoComponent {
  // actions = contentChildren<ElementRef>("actions")

  // constructor() {
  //   effect( () => {
  //     console.log("actions", this.actions());
  //   }) 
  // }
}
