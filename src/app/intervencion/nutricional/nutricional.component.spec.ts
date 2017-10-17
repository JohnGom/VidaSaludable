import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NutricionalComponent } from './nutricional.component';

describe('NutricionalComponent', () => {
  let component: NutricionalComponent;
  let fixture: ComponentFixture<NutricionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutricionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutricionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
