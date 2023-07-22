import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessContainerComponent } from './access-container.component';

describe('AccessContainerComponent', () => {
  let component: AccessContainerComponent;
  let fixture: ComponentFixture<AccessContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
