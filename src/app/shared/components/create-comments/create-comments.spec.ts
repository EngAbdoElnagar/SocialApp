import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComments } from './create-comments';

describe('CreateComments', () => {
  let component: CreateComments;
  let fixture: ComponentFixture<CreateComments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateComments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateComments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
