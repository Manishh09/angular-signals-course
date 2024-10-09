import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoQueriesComponent } from './demo-queries.component';

describe('DemoQueriesComponent', () => {
  let component: DemoQueriesComponent;
  let fixture: ComponentFixture<DemoQueriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoQueriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemoQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
