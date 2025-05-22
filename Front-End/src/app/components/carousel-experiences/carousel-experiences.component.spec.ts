import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselExperiencesComponent } from './carousel-experiences.component';

describe('CarouselExperiencesComponent', () => {
  let component: CarouselExperiencesComponent;
  let fixture: ComponentFixture<CarouselExperiencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselExperiencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselExperiencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
