import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestadorComponent } from './encuestador.component';

describe('EncuestadorComponent', () => {
  let component: EncuestadorComponent;
  let fixture: ComponentFixture<EncuestadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncuestadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuestadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
