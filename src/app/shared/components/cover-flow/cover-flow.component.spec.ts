import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverFlowComponent } from './cover-flow.component';

describe('CoverFlowComponent', () => {
  let component: CoverFlowComponent;
  let fixture: ComponentFixture<CoverFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoverFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
