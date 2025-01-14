import { Component } from '@angular/core';
import { ListaComponent } from './lista/lista.component';
import { PesquisaComponent } from "./pesquisa/pesquisa.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [ListaComponent, PesquisaComponent], // Importando o componente standalone para não haver reclamação
})
export class AppComponent {
  title = 'app';
}

