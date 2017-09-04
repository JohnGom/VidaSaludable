import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BioquimicasComponent } from './bioquimicas.component';

describe('BioquimicasComponent', () => {
  let component: BioquimicasComponent;
  let fixture: ComponentFixture<BioquimicasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BioquimicasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BioquimicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
