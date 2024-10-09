import { Component, ElementRef, effect, viewChild } from '@angular/core';
import { WritableSignalsDemoComponent } from "../../writable-signals-demo/writable-signals-demo.component";
import { MatTooltip } from "@angular/material/tooltip"
@Component({
  selector: 'view-child-demo',
  standalone: true,
  imports: [WritableSignalsDemoComponent, MatTooltip],
  templateUrl: './view-child-demo.component.html',
  styleUrl: './view-child-demo.component.scss'
})
export class ViewChildDemoComponent {
  
  // Query that is not having required option, will be undefined if not matches 'searchRef'
  searchQuery = viewChild<ElementRef>("searchRef") // Signal Query for a DOM Element - returns ElementRef

  // Required Signal Query 
  requiredSearchQuery = viewChild.required<ElementRef>("searchRef");

  // component reference
  compRefQuery = viewChild.required<WritableSignalsDemoComponent>("writableSignalsRef");

  readCompAsDirectiveRefQuery = viewChild.required("writableSignalsRef", {
    read: MatTooltip
  });

  // can read as DOM Element as well - In this case, signal returns the ElementRef
  readAsElementRefQuery = viewChild.required("writableSignalsRef" , 
    {
      read: ElementRef
    }
  );

  // if theres a directive applied on DOM element
  directiveRefQuery = viewChild.required("directiveRef", {
    read: MatTooltip
  })

  constructor() {
    effect(() => {
      console.log("view-child query: ", this.searchQuery());
      console.log("view-child required query: ", this.requiredSearchQuery());
      console.log("view-child component ref query: ", this.compRefQuery());
      console.log("view-child component has directiveRef query: ", this.readCompAsDirectiveRefQuery());
      console.log("view-child read as elementRef query: ", this.readAsElementRefQuery());
      
    })
  }
}
