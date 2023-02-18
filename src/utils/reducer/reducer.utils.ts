import { AnyAction } from "redux";

// The `Matchable` type represents an action creator function that has a `type` property and a `match` method.
type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>["type"];
  match(action: AnyAction): action is ReturnType<AC>;
};

export function withMatcher<AC extends () => AnyAction & { type: string }>(
  actionCreater: AC
): Matchable<AC>;

export function withMatcher<
  AC extends (...args: any[]) => AnyAction & { type: string }
>(actionCreater: AC): Matchable<AC>;

// The `withMatcher` function takes an action creator function as an argument and
// returns a `Matchable` object that has a `type` property and a `match` method.
export function withMatcher(actionCreater: Function) {
  // Get the `type` property of the action object returned by the action creator function.
  const type = actionCreater().type;

  // Return an object that has the `type` property and a `match` method that checks
  // whether the `type` property of an `AnyAction` object matches the `type` property of the action object.
  return Object.assign(actionCreater, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}

export type ActionWithPayLoad<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayLoad<T, P>;

export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}
