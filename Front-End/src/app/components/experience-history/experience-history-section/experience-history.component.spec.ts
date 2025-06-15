import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceHistoryComponent } from './experience-history.component';

describe('ExperienceHistoryComponent', () => {
  let component: ExperienceHistoryComponent;
  let fixture: ComponentFixture<ExperienceHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperienceHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienceHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
