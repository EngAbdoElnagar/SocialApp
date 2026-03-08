import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPostComments } from './get-post-comments';

describe('GetPostComments', () => {
  let component: GetPostComments;
  let fixture: ComponentFixture<GetPostComments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetPostComments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetPostComments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
