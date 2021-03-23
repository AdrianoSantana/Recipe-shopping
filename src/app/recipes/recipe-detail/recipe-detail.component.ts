import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'
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
    private route: ActivatedRoute,
    private router: Router
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

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route })
  }

  deleteRecipe(recipe: Recipe) {
    this.recipeService.deleteRecipe(recipe)
    this.router.navigate(['recipes'])
  }

}
