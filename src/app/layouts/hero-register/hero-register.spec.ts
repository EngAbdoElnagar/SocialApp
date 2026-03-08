import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroRegister } from './hero-register';

describe('HeroRegister', () => {
  let component: HeroRegister;
  let fixture: ComponentFixture<HeroRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroRegister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
