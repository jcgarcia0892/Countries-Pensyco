
import { TestBed } from '@angular/core/testing';
import { DestinationsComponent } from './destinations.component';

describe('DestinationsComponent', () => {
  let component: DestinationsComponent;
  let fixture = TestBed.createComponent(DestinationsComponent);

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ DestinationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
