import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WritableSignalsDemoComponent } from './writable-signals-demo.component';

describe('WritableSignalsDemoComponent', () => {
  let component: WritableSignalsDemoComponent;
  let fixture: ComponentFixture<WritableSignalsDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WritableSignalsDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WritableSignalsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
