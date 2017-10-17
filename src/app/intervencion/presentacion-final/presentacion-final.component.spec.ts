import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentacionFinalComponent } from './presentacion-final.component';

describe('PresentacionFinalComponent', () => {
  let component: PresentacionFinalComponent;
  let fixture: ComponentFixture<PresentacionFinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentacionFinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentacionFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
