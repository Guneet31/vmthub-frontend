import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNftComponentComponent } from './create-nft-component.component';

describe('CreateNftComponentComponent', () => {
  let component: CreateNftComponentComponent;
  let fixture: ComponentFixture<CreateNftComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNftComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNftComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
