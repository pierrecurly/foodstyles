import { DocumentNode } from 'graphql';
import { action, makeObservable, observable, runInAction } from "mobx";
import initClient from '../libs/apollo/client';
import { CREATE_FOOD_STYLE, GET_FOOD_STYLES } from '../libs/graphql/food-styles';
import { FoodStyleInterface } from '../types.d';
import { DELETE_FOOD_STYLE, DUPLICATE_FOOD_STYLE, SHARE_FOOD_STYLE } from './../libs/graphql/food-styles';

const client = initClient();
class FoodStylesStore {
  foodStyles = [] as Array<FoodStyleInterface>
  isLoading = true as boolean
  selectedFood = null as null | FoodStyleInterface
  loading = false as boolean

  constructor() {
    makeObservable(this, {
      foodStyles: observable,
      loading: observable,
      selectedFood: observable,
      foodSelection: action.bound,
      resetSelection: action.bound,
      reloadFoodStyles: action.bound,
      createFoodStyle: action.bound,
      deleteFoodStyle: action.bound,
      shareFoodStyle: action.bound,
      duplicateFoodStyle: action.bound,
    });
    this.reloadFoodStyles();
  }

  resetSelection() {
    this.selectedFood = null;
  }

  foodSelection(food: FoodStyleInterface) {
    this.selectedFood = food
  }

  async reloadFoodStyles() {
    const foodList = await client.query({ query: GET_FOOD_STYLES, fetchPolicy: "network-only" });
    runInAction(() => {
      this.foodStyles = foodList.data.cards;
      this.resetSelection();
      this.loading = false;
    })
  }

  async createFoodStyle() {
    if (this.loading) return;

    this.loading = true;
    await client.mutate({
      mutation: CREATE_FOOD_STYLE as DocumentNode, variables: {
        data: {
          name: `My Food Style ${this.foodStyles.length + 1}`,
          minPrice: null,
          maxPrice: null,
          locationTypeIds: [],
          locationCuisineTypeIds: [],
          dishTypeIds: [],
          courseTypeIds: [],
          dietIds: [],
          excludedIngredientIds: []
        }
      }
    });

    this.reloadFoodStyles();
  }

  async deleteFoodStyle() {
    this.loading = true;
    await client.mutate({
      mutation: DELETE_FOOD_STYLE as DocumentNode, variables: {
        id: this.selectedFood?.id
      }
    });
    this.reloadFoodStyles();
  }

  async shareFoodStyle() {
    return await client.mutate({
      mutation: SHARE_FOOD_STYLE as DocumentNode, variables: {
        id: this.selectedFood?.id
      }
    });
  }

  async duplicateFoodStyle() {
    if (this.loading) return;
    this.loading = true;
    await client.mutate({
      mutation: DUPLICATE_FOOD_STYLE as DocumentNode, variables: {
        id: this.selectedFood?.id
      }
    });

    this.reloadFoodStyles();
  }
}

export interface FoodStylesStoreInteface {
  foodStyles: Array<FoodStyleInterface>
  loading: boolean;
  selectedFood: FoodStyleInterface;
  foodSelection: (food: FoodStyleInterface) => void;
  resetSelection: () => void;
  reloadFoodStyles: () => void;
  createFoodStyle: () => void;
  deleteFoodStyle: (id: number) => void;
  shareFoodStyle: (id: number) => void;
  duplicateFoodStyle: (id: number) => void;
}

export default FoodStylesStore;
