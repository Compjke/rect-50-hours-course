export type Item = {
  id: number;
  text: string;
};

export type ItemsState = Item[];

type ItemActionsType = "ADD_ITEM" | "REMOVE_ITEM" | "UPDATE_ITEM";

export const itemReducer = (
  state: ItemsState,
  action: { type: ItemActionsType; payload: Item }
) => {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, action.payload];
    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.payload.id);
    case "UPDATE_ITEM":
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );
    default:
      return state;
  }
};
