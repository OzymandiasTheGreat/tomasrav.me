import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GhCardComponent } from './gh-card.component';

describe('GhCardComponent', () => {
  let component: GhCardComponent;
  let fixture: ComponentFixture<GhCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GhCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GhCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
