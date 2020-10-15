import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnowbankComponent } from './snowbank.component';

describe('SnowbankComponent', () => {
  let component: SnowbankComponent;
  let fixture: ComponentFixture<SnowbankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnowbankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnowbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
