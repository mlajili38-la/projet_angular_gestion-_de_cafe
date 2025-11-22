import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservTab } from './reserv-tab';

describe('ReservTab', () => {
  let component: ReservTab;
  let fixture: ComponentFixture<ReservTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
