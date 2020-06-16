import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCurrencyRatesComponent } from './all-currency-rates.component';

describe('AllCurrencyRatesComponent', () => {
  let component: AllCurrencyRatesComponent;
  let fixture: ComponentFixture<AllCurrencyRatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCurrencyRatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCurrencyRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
