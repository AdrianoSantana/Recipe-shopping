import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/models/ingrediant.model';
import { ShoppingListService } from '../shopping-list.service'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  ingredientName: string = ''
  ingredientAmount: number = 1
  @Output() ingredientAdded = new EventEmitter<Ingredient>()
  constructor(
    private shoppingService: ShoppingListService
  ) { }

  ngOnInit(): void {
  }

  addIngredient(
  ){
    const newIngredient = new Ingredient(this.ingredientName, this.ingredientAmount)
    this.shoppingService.addIngredient(newIngredient)
  }

}
