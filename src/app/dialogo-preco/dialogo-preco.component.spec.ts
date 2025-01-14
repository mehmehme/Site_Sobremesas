import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoPrecoComponent } from './dialogo-preco.component';

describe('DialogoPrecoComponent', () => {
  let component: DialogoPrecoComponent;
  let fixture: ComponentFixture<DialogoPrecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogoPrecoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogoPrecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
