import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConductasComponent } from './conductas.component';

describe('ConductasComponent', () => {
  let component: ConductasComponent;
  let fixture: ComponentFixture<ConductasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConductasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConductasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
