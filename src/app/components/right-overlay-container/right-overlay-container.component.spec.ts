import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightOverlayContainerComponent } from './right-overlay-container.component';

describe('RightOverlayContainerComponent', () => {
  let component: RightOverlayContainerComponent;
  let fixture: ComponentFixture<RightOverlayContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightOverlayContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightOverlayContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
