import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/models/ingrediant.model';
import { ShoppingListService } from '../shopping-list.service'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  ingredientForm: FormGroup
  subscription: Subscription
  editMode: boolean = false
  editItemIndex: number
  ingredientEdit: Ingredient

  constructor(
    private shoppingService: ShoppingListService
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  ngOnInit(): void {
    this.ingredientForm = new FormGroup({
      'ingredientName': new FormControl(null, [
        Validators.required
      ]),
      'amount': new FormControl(null, [
        Validators.required
      ])
    })
    this.subscription = this.shoppingService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true
        this.editItemIndex = index
        this.ingredientEdit = this.shoppingService.getIngredientById(this.editItemIndex)
        this.ingredientForm.setValue({
          ingredientName: this.ingredientEdit.name,
          amount: this.ingredientEdit.amount
        })
      }
    )
  }

  onClear() {
    this.ingredientForm.reset()
    this.editMode = false
  }

  onDelete() {
    this.shoppingService.deleteIngredient(this.editItemIndex)
    this.onClear()
  }

  addIngredient(){
    const newIngredient = new Ingredient(
      this.ingredientForm.value.ingredientName,
      this.ingredientForm.value.amount
    )
    if (this.editMode) {
      this.shoppingService.updateIngredient(this.editItemIndex, newIngredient)
    } else {
      this.shoppingService.addIngredient(newIngredient)
    }
    this.editMode = false
    this.ingredientForm.reset()
  }

}
