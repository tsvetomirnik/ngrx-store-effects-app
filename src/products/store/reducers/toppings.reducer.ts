import * as formToppings from "../actions/toppings.actions";
import { Topping } from "../../models/topping.model";

export interface ToppingsState {
  entities: { [id: number]: Topping };
  loaded: boolean;
  loading: boolean;
  selectedToppings: number[];
}

export const initialState: ToppingsState = {
  entities: {},
  loaded: false,
  loading: false,
  selectedToppings: []
};

export function reducer(
  state = initialState,
  action: formToppings.ToppingsAction
): ToppingsState {
  switch (action.type) {
    case formToppings.VISUALISE_TOPPINGS: {
      const selectedToppings = action.payload;
      return {
        ...state,
        selectedToppings
      };
    }

    case formToppings.LOAD_TOPPINGS: {
      return {
        ...state,
        loading: true
      };
    }

    case formToppings.LOAD_TOPPINGS_SUCCESS: {
      const toppings = action.payload;

      const entities = toppings.reduce(
        (entities: { [id: number]: Topping }, topping) => {
          return {
            ...entities,
            [topping.id]: topping
          };
        },
        {
          ...state.entities
        }
      );

      return {
        ...state,
        entities,
        loading: false,
        loaded: true
      };
    }

    case formToppings.LOAD_TOPPINGS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getToppingEntities = (state: ToppingsState) => state.entities;
export const getToppingsLoaded = (state: ToppingsState) => state.loaded;
export const getToppingsLoading = (state: ToppingsState) => state.loading;
export const getSelectedToppings = (state: ToppingsState) =>
  state.selectedToppings;
