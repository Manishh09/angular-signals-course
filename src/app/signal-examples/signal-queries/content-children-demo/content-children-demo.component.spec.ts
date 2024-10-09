import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentChildrenDemoComponent } from './content-children-demo.component';

describe('ContentChildrenDemoComponent', () => {
  let component: ContentChildrenDemoComponent;
  let fixture: ComponentFixture<ContentChildrenDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentChildrenDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentChildrenDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
