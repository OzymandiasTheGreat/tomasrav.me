import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GhPageComponent } from './gh-page.component';

describe('GhPageComponent', () => {
  let component: GhPageComponent;
  let fixture: ComponentFixture<GhPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GhPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GhPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
