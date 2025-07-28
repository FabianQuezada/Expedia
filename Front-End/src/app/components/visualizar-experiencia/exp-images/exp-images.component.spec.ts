import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpImagesComponent } from './exp-images.component';

describe('ExpImagesComponent', () => {
  let component: ExpImagesComponent;
  let fixture: ComponentFixture<ExpImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpImagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
