import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BajaproductoComponent } from './bajaproducto.component';

describe('BajaproductoComponent', () => {
  let component: BajaproductoComponent;
  let fixture: ComponentFixture<BajaproductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BajaproductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BajaproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
