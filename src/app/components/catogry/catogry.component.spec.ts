import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatogryComponent } from './catogry.component';

describe('CatogryComponent', () => {
  let component: CatogryComponent;
  let fixture: ComponentFixture<CatogryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatogryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatogryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
