import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnScrollAnimationsComponent } from './on-scroll-animations.component';

describe('OnScrollAnimationsComponent', () => {
  let component: OnScrollAnimationsComponent;
  let fixture: ComponentFixture<OnScrollAnimationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnScrollAnimationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnScrollAnimationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
