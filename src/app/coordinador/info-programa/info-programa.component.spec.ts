import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProgramaComponent } from './info-programa.component';

describe('InfoProgramaComponent', () => {
  let component: InfoProgramaComponent;
  let fixture: ComponentFixture<InfoProgramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoProgramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
