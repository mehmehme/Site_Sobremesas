import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PesquisaComponent } from '../pesquisa/pesquisa.component';
import {MatPaginator} from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogoComponent} from '../dialogo/dialogo.component';
import { NomeDialogoComponent } from '../dialogo-nome/dialogo-nome.component';
import { PrecoDialogoComponent } from '../dialogo-preco/dialogo-preco.component';

interface Recipe {
  name: string;
  ingredients: string;
  price: number;
  types: string[];
  edited: boolean;
}

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    CommonModule,
    MatCheckboxModule,
    PesquisaComponent,
    MatPaginator,
    MatDialogModule,
  ],
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})

export class ListaComponent {
  //sobremesas já prontas, pois não achei uma API de apenas sobremesas
  recipes = [
    { name: 'Sorvete', ingredients: 'Leite, Açúcar, Frutas', price: 10, types: ['gelado', 'mole'], edited: false },
    { name: 'Bolo Quente', ingredients: 'Farinha, Chocolate', price: 15, types: ['quente'],edited: false },
    { name: 'Pirulito', ingredients: 'Açúcar, Corante,caramelo', price: 8, types: ['duro'],edited: false },
    { name: 'Maria Mole', ingredients: 'Farinha, Açucar, recheio', price: 15, types: ['quente','mole'],edited: false },
    { name: 'Hamburguer', ingredients: 'pão, carne bovina, alface,queijo,tomate', price: 25, types: ['quente'],edited: false },
    { name: 'Pão de Queijo', ingredients: 'Farinha, queijo,sal', price: 5, types: ['quente'],edited: false },
    { name: 'MilkShake', ingredients: 'Leite, Açúcar, sorvete,calda', price: 16, types: ['gelado', 'mole'],edited: false },
    { name: 'Pé de Moleke', ingredients: 'açucar, amendoin,caramelo', price: 3, types: ['quente','duro'],edited: false },
  ];
  //a paginação
  paginatedRecipes: Recipe[] = [];
  itemsPerPage = 5;
  pageIndex=0;

  formData: any = { name: '', ingredients: '', price: null, types: [] };
  recipeTypes: string[] = ['Gelado', 'Quente', 'Mole', 'Duro'];
  showForm: boolean = false;
  filteredRecipes = [...this.recipes];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.updatePaginatedRecipes();
  }

  ngOnChanges() {
    this.updatePaginatedRecipes();
  }

  // Método para atualizar com base na filtragem e página
  updatePaginatedRecipes() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
  
    this.paginatedRecipes = this.filteredRecipes.slice(startIndex, endIndex);
  }

  filterRecipes(selectedCategories: any) {
    this.filteredRecipes = this.recipes.filter(recipe =>
      recipe.types.some(type => selectedCategories[type])
    );
    this.pageIndex = 0; // Resetar a página ao filtrar
    this.updatePaginatedRecipes(); 
  }

  
  pageChanged(event: any) {
    this.pageIndex = event.pageIndex;
    this.updatePaginatedRecipes();
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  constructor(private dialog: MatDialog) {}

  addRecipe() {
    if (this.formData.ingredients.split(',').length < 3) {
      this.openDialogIngredientes();
      return;
    }
    if (this.formData.name.length == 0) {
      this.openDialogNome();
      return;
    }
    if (this.formData.price == 0) {
      this.openDialogPreco();
      return;
    }

    // Adicionar a receita
    this.recipes.push({ ...this.formData });
    this.formData = { name: '', ingredients: '', price: null, types: [] };
    this.filteredRecipes = [...this.recipes];
    this.toggleForm();
    this.showForm = false;
  }

  openDialogIngredientes() {
    this.dialog.open(DialogoComponent);
  }
  openDialogNome() {
    this.dialog.open(NomeDialogoComponent);
  }
  openDialogPreco() {
    this.dialog.open(PrecoDialogoComponent);
  }

  onTypeChange(type: string, isChecked: boolean) {
    if (isChecked) {
      this.formData.types.push(type);
    } else {
      this.formData.types = this.formData.types.filter((t: string) => t !== type);
    }
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.updatePaginatedRecipes();
  }
  

  editRecipe(index: number) {
    // Copia os dados da receita que será editada
    this.formData = { ...this.recipes[index] };
    this.showForm = true;
  
    // Remove a receita antiga antes de editar (caso queira substituir)
    this.recipes.splice(index, 1);
  }
}