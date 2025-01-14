import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Para usar ngModel
import { MatCheckboxModule } from '@angular/material/checkbox'; // Para o mat-checkbox

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisa.component.html',
  styleUrl: './pesquisa.component.scss',
  standalone: true,
  imports: [FormsModule, MatCheckboxModule],  // Módulos importados diretamente no componente standalone
})
export class PesquisaComponent {
  @Output() filter = new EventEmitter<any>();

  selectedCategories = {
    gelado: false,
    quente: false,
    mole: false,
    duro: false,
  };
  onCategoryChange() {
    this.filter.emit(this.selectedCategories);
  }
  filterRecipes() {
    // Filtra receitas com base nas categorias selecionadas
    console.log(this.selectedCategories);
  }
}
