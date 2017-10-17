import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SociodemograficosComponent } from './sociodemograficos.component';

describe('SociodemograficosComponent', () => {
  let component: SociodemograficosComponent;
  let fixture: ComponentFixture<SociodemograficosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SociodemograficosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SociodemograficosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
