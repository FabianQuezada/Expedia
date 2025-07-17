import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarActivityComponent } from './search-bar-activity.component';

describe('SearchBarActivityComponent', () => {
  let component: SearchBarActivityComponent;
  let fixture: ComponentFixture<SearchBarActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBarActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBarActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
