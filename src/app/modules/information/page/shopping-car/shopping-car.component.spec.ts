import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShoppingCarComponent } from './shopping-car.component';

describe('ShoppingCarComponent', () => {
  let component: ShoppingCarComponent;
  let fixture: ComponentFixture<ShoppingCarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
