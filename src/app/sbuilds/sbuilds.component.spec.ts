import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SbuildsComponent } from './sbuilds.component';

describe('SbuildsComponent', () => {
  let component: SbuildsComponent;
  let fixture: ComponentFixture<SbuildsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SbuildsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SbuildsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
