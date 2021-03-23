import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs'
import { Ingredient } from '../shared/models/ingrediant.model';
import { ShoppingListService } from './shopping-list.service'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = []
  private igChangeSub: Subscription

  constructor(
    private shoppingService: ShoppingListService
  ) { }
  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe()
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients()
    this.igChangeSub = this.shoppingService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => this.ingredients = ingredients
    )
  }

  onEditItem(index: number) {
    this.shoppingService.startedEditing.next(index)
  }
}
