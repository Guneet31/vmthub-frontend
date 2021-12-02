import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftDetailsComponentComponent } from './nft-details-component.component';

describe('NftDetailsComponentComponent', () => {
  let component: NftDetailsComponentComponent;
  let fixture: ComponentFixture<NftDetailsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftDetailsComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftDetailsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
