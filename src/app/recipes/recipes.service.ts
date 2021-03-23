import { EventEmitter, Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { Ingredient } from '../shared/models/ingrediant.model'
import { ShoppingListService } from '../shopping-list/shopping-list.service'
import { Recipe } from './models/recipe.model'

@Injectable({
  providedIn: 'root'
})

export class RecipeService {
  recipesChanged = new Subject<Recipe[]>()
  constructor(
    private shoppingService: ShoppingListService
  ) {}
  
  private recipes: Recipe[] = [
    new Recipe(
      'Bobó de camarão',
      'Uma gostosa receita para quem ama camarão', 
      'https://www.supermercadosmundial.com.br/content/816x480/N2Bha6v1iYpzPQeA.jpg',
      [
        new Ingredient('Cebola', 1),
        new Ingredient('Cenoura', 1)
      ]
      ),
    new Recipe(
      'Bife a milanesa',
      'Feita por amantes de carne para amantes de carne',
      'https://www.anamariabrogui.com.br/assets/uploads/receitas/fotos/usuario-4064-35c61146be48e8e75e793182ad82ff3c.jpg',
      [
        new Ingredient('Carne', 1),
        new Ingredient('Molho de tomate', 1)
      ]
      ) 
  ]

  getRecipes(): Recipe[] {
    return this.recipes.slice()
  }

  getRecipeById(id: number): Recipe {
    return this.recipes[id]
  }

  addIngredientsToShop(ingredients: Ingredient[]): void {
    this.shoppingService.addIngredients(ingredients)
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.recipesChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(recipe: Recipe) {
    const indexRecipe = this.recipes.indexOf(recipe)
    if (indexRecipe !== -1) {
      this.recipes.splice(indexRecipe, 1)
      this.recipesChanged.next(this.recipes.slice())
    }
  }
}