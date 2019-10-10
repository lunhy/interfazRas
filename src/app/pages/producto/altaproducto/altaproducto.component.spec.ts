import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaproductoComponent } from './altaproducto.component';

describe('AltaproductoComponent', () => {
  let component: AltaproductoComponent;
  let fixture: ComponentFixture<AltaproductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaproductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
