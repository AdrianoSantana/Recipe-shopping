import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from './models/recipe.model';
import { RecipeService } from './recipes.service'

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  selectedRecipe: any
  constructor(
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
  }

}
