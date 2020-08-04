import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationLayoutComponent } from './information-layout.component';

describe('InformationLayoutComponent', () => {
  let component: InformationLayoutComponent;
  let fixture: ComponentFixture<InformationLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
