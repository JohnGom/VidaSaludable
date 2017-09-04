import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedLinkComponent } from './assigned-link.component';

describe('AssignedLinkComponent', () => {
  let component: AssignedLinkComponent;
  let fixture: ComponentFixture<AssignedLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
