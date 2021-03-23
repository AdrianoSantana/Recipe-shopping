import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number
  editMode: boolean = false
  recipeForm: FormGroup

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) { }

  private initForm() {
    let recipeName: string = ''
    let recipeImagePath: string = ''
    let recipeDescription: string = ''
    let recipeIngredients: FormArray = new FormArray([])

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id)
      recipeName = recipe.name
      recipeImagePath = recipe.imagePath
      recipeDescription = recipe.description
      if(recipe['ingredients']) {
        recipe.ingredients.forEach(ingredient => {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, [Validators.required] ),
              amount: new FormControl(ingredient.amount,
                [
                  Validators.required,
                  Validators.minLength(1),
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
            })
          )
        });
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, [Validators.required]),
      'description': new FormControl(recipeDescription, [Validators.required]),
      'imagePath': new FormControl(recipeImagePath, [Validators.required]),
      'ingredients': recipeIngredients
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = parseInt(params.id)
        this.editMode = params.id != null
      }
    )
    this.initForm()
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  

  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imagePath,
      this.recipeForm.value.ingredients
    )
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe)
    } else {
      this.recipeService.addRecipe(newRecipe)
    }
    this.backToRecipes()
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup(
        {
          name: new FormControl(null, [Validators.required]),
          amount: new FormControl(
            null, 
            [
              Validators.required,
              Validators.minLength(1),
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ]
          )
        }
      )
    )
  }

  onRemoveIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

  backToRecipes() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

}
