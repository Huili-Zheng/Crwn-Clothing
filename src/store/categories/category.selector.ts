import { createSelector } from "reselect";

import { CategoriesState } from "./category.reducer";

import { CategoryMap } from "./category.types";

import { RootState } from "../store";

//  selector that selects the categories slice of the state from the store
const selectCategoryReducer = (state: RootState): CategoriesState => {
  return state.categories;
};

// Selector that selects the array of categories from the categories slice of the state
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

// Selector that maps the array of categories to an object with lowercased titles as keys and items as values
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
