import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftOverlayComponent } from './left-overlay.component';

describe('LeftOverlayComponent', () => {
  let component: LeftOverlayComponent;
  let fixture: ComponentFixture<LeftOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftOverlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
