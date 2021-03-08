import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../recipes.service'

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe
  id: number
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = parseInt(params.id)
          this.recipe = this.recipeService.getRecipeById(this.id)
        }
      )
  }

  addIngredientsToShop(recipe: Recipe): void {
    this.recipeService.addIngredientsToShop(recipe.ingredients)
  }

}
