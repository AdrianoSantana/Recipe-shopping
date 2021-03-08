import { EventEmitter, Injectable } from '@angular/core'
import { Ingredient } from '../shared/models/ingrediant.model'

@Injectable({
  providedIn: 'root'
})

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>()
  private ingredients: Ingredient[] = [
    new Ingredient('Camarão', 30),
    new Ingredient('Tomates', 10)
  ]

  getIngredients(): Ingredient[] {
    return this.ingredients.slice()
  }

  addIngredient(newIngredient: Ingredient): void {
    this.ingredients.push(newIngredient)
    this.ingredientsChanged.emit(this.ingredients.slice())
  }

  addIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients)
  }
}
