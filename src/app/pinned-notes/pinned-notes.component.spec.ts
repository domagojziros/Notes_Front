import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinnedNotesComponent } from './pinned-notes.component';

describe('PinnedNotesComponent', () => {
  let component: PinnedNotesComponent;
  let fixture: ComponentFixture<PinnedNotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PinnedNotesComponent]
    });
    fixture = TestBed.createComponent(PinnedNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
