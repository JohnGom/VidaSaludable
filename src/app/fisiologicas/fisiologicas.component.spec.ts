import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FisiologicasComponent } from './fisiologicas.component';

describe('FisiologicasComponent', () => {
  let component: FisiologicasComponent;
  let fixture: ComponentFixture<FisiologicasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FisiologicasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FisiologicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
