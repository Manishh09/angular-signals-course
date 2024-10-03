import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EffectsDemoComponent } from './effects-demo.component';

describe('EffectsDemoComponent', () => {
  let component: EffectsDemoComponent;
  let fixture: ComponentFixture<EffectsDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EffectsDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EffectsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
