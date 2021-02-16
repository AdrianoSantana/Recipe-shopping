import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/models/ingrediant.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Camarão', 30),
    new Ingredient('Tomates', 10)
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
