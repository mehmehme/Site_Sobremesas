import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoNomeComponent } from './dialogo-nome.component';

describe('DialogoNomeComponent', () => {
  let component: DialogoNomeComponent;
  let fixture: ComponentFixture<DialogoNomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogoNomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogoNomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
