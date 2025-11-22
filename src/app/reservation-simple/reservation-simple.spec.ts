import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationSimple } from './reservation-simple';

describe('ReservationSimple', () => {
  let component: ReservationSimple;
  let fixture: ComponentFixture<ReservationSimple>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationSimple]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationSimple);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
