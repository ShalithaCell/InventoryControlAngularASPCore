import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAddDialogComponent } from './category-add-dialog.component';

describe('CategoryAddDialogComponent', () => {
  let component: CategoryAddDialogComponent;
  let fixture: ComponentFixture<CategoryAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
