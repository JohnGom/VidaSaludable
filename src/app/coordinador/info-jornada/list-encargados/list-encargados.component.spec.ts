import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEncargadosComponent } from './list-encargados.component';

describe('ListEncargadosComponent', () => {
  let component: ListEncargadosComponent;
  let fixture: ComponentFixture<ListEncargadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEncargadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEncargadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
