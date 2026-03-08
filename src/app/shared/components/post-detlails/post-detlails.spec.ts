import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetlails } from './post-detlails';

describe('PostDetlails', () => {
  let component: PostDetlails;
  let fixture: ComponentFixture<PostDetlails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostDetlails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDetlails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
