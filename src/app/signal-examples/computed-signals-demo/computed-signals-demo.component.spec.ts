import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputedSignalsDemoComponent } from './computed-signals-demo.component';

describe('ComputedSignalsDemoComponent', () => {
  let component: ComputedSignalsDemoComponent;
  let fixture: ComponentFixture<ComputedSignalsDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComputedSignalsDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComputedSignalsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
