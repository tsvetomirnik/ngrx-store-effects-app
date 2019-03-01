import { Pizza } from "src/products/models/pizza.model";
import * as fromActions from "../actions/pizzas.actions";

export interface PizzaState {
  entities: { [id: number]: Pizza };
  loaded: boolean;
  loading: boolean;
}

export const initialState: PizzaState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromActions.PizzasAction
): PizzaState {
  switch (action.type) {
    case fromActions.LOAD_PIZZAS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromActions.LOAD_PIZZAS_SUCCESS: {
      const pizzas = action.payload;

      const entities = pizzas.reduce(
        (entities: { [id: number]: Pizza }, pizza) => {
          return {
            ...entities,
            [pizza.id]: pizza
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

    case fromActions.LOAD_PIZZAS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case fromActions.CREATE_PIZZA_SUCCESS:
    case fromActions.UPDATE_PIZZA_SUCCESS: {
      const pizza = action.payload;
      const entities = {
        ...state.entities,
        [pizza.id]: pizza
      };

      return {
        ...state,
        entities
      };
    }

    case fromActions.REMOVE_PIZZA_SUCCESS: {
      const pizza = action.payload;
      const { [pizza.id]: removed, ...entities } = state.entities;
      
      return {
        ...state,
        entities
      };
    }
  }

  return state;
}

// state selectors

export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
export const getPizzasEntities = (state: PizzaState) => state.entities;
