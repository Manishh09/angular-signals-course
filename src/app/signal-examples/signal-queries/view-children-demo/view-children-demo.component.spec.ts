import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChildrenDemoComponent } from './view-children-demo.component';

describe('ViewChildrenDemoComponent', () => {
  let component: ViewChildrenDemoComponent;
  let fixture: ComponentFixture<ViewChildrenDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewChildrenDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewChildrenDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
