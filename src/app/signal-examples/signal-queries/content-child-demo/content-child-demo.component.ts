import { Component, ElementRef, contentChild, contentChildren, effect } from '@angular/core';
import { DemoQueriesComponent } from "../demo-queries/demo-queries.component";
import { WritableSignalsDemoComponent } from "../../writable-signals-demo/writable-signals-demo.component";

@Component({
  selector: 'content-child-demo',
  standalone: true,
  imports: [DemoQueriesComponent, WritableSignalsDemoComponent],
  templateUrl: './content-child-demo.component.html',
  styleUrl: './content-child-demo.component.scss'
})
export class ContentChildDemoComponent {

}
