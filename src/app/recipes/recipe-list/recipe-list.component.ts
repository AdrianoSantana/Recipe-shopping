import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Bobó de camarão', 'bobó', 'https://www.supermercadosmundial.com.br/content/816x480/N2Bha6v1iYpzPQeA.jpg'),
    new Recipe('Bife a milanesa', 'Bife', 'https://www.anamariabrogui.com.br/assets/uploads/receitas/fotos/usuario-4064-35c61146be48e8e75e793182ad82ff3c.jpg') 
  ]

  constructor() {}

  ngOnInit(): void {
  }

}
