import { EventEmitter, Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { Ingredient } from '../shared/models/ingrediant.model'

@Injectable({
  providedIn: 'root'
})

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>()
  startedEditing = new Subject<number>()
  private ingredients: Ingredient[] = [
    new Ingredient('Camarão', 30),
    new Ingredient('Tomates', 10)
  ]

  getIngredients(): Ingredient[] {
    return this.ingredients.slice()
  }

  addIngredient(newIngredient: Ingredient): void {
    this.ingredients.push(newIngredient)
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  addIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients)
  }

  getIngredientById(id: number): Ingredient {
    return this.ingredients[id]
  }

  deleteIngredient(id: number): boolean {
    if (this.ingredients[id]) {
      this.ingredients.splice(id, 1)
      this.ingredientsChanged.next(this.ingredients.slice())
      return true
    } else {
      return false
    }
  }

  updateIngredient(id: number, ingredient: Ingredient) {
    this.ingredients[id] = ingredient
    this.ingredientsChanged.next(this.ingredients.slice())
  }
}
