import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewproductsByCategoryComponent } from './viewproducts-by-category.component';

describe('ViewproductsByCategoryComponent', () => {
  let component: ViewproductsByCategoryComponent;
  let fixture: ComponentFixture<ViewproductsByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewproductsByCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewproductsByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
