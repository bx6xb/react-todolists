import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
import { TodolistReducerActionType, todolistReducer } from "./todolistReducer/todolistReducer"
import { ThunkAction, ThunkDispatch, thunk } from "redux-thunk"
import { AppActionType, appReducer } from "./appReducer/appReducer"
import { TasksReducerActionType, tasksReducer } from "./tasksReducer/tasksReducer"
import { LoginReducerActionType, loginReducer } from "./loginReducer/loginReducer"

export const rootReducer = combineReducers({
  app: appReducer,
  login: loginReducer,
  todolist: todolistReducer,
  tasks: tasksReducer,
})

export const store = legacy_createStore(rootReducer, undefined, applyMiddleware(thunk))

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export const useAppDispatch = () =>
  useDispatch<ThunkDispatch<AppRootStateType, unknown, AppRootActionType>>()

// types
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppRootActionType =
  | TodolistReducerActionType
  | AppActionType
  | TasksReducerActionType
  | LoginReducerActionType
export type DispatchType = ThunkDispatch<AppRootStateType, unknown, AppRootActionType>
export type ThunkType = ThunkAction<void, AppRootStateType, unknown, AppRootActionType>
