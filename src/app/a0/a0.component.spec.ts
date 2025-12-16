import { ComponentFixture, TestBed } from '@angular/core/testing';

import { A0Component } from './a0.component';

describe('A0', () => {
  let component: A0Component;
  let fixture: ComponentFixture<A0Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [A0Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(A0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
