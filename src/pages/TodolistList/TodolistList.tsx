import { memo, useCallback, useEffect } from "react"
import { useActions, useAppSelector } from "../../store/store"
import { Navigate } from "react-router-dom"
import { Input } from "../../components/Input/Input"
import { TaskStatuses } from "../../api/api"
import { Todolist } from "./Todolist/Todolist"
import { Grid } from "@mui/material"
import { selectIsAuthorized } from "../../store/loginReducer/selectors"
import { selectTodolists } from "../../store/todolistReducer/selectors"
import { selectTasks } from "../../store/tasksReducer/selectors"
import { todolistActions } from "../../store/todolistReducer"

export const TodolistList = memo(() => {
  const todolists = useAppSelector(selectTodolists)
  const tasks = useAppSelector(selectTasks)
  const isAuthorized = useAppSelector(selectIsAuthorized)
  const { fetchTodolists, createTodolist } = useActions(todolistActions)

  // fetch todolist on first init if authorized
  useEffect(() => {
    if (isAuthorized) {
      fetchTodolists()
    }
  }, [])

  const createTodolistCallback = useCallback(
    async (value: string) => {
      const action = await createTodolist(value)
      if (todolistActions.createTodolist.rejected.match(action)) {
        return action.meta.arg
      } else {
        return ""
      }
    },
    [createTodolist, todolistActions.createTodolist],
  )

  // redirect
  if (!isAuthorized) {
    return <Navigate to={"/login"} />
  }

  return (
    <>
      <Input getItem={createTodolistCallback} label="Add todolist" />

      <Grid
        container
        spacing={4}
        sx={{ marginTop: "10px", overflowX: "scroll", flexWrap: "nowrap" }}
      >
        {todolists.map((tl) => {
          let filteredTasks = tasks[tl.id]

          if (tl.filter === "active") {
            filteredTasks = filteredTasks.filter((t) => t.status === TaskStatuses.New)
          }
          if (tl.filter === "completed") {
            filteredTasks = filteredTasks.filter((t) => t.status === TaskStatuses.Completed)
          }

          return (
            <Grid item key={tl.id} sx={{ width: "400px" }}>
              <Todolist
                id={tl.id}
                title={tl.title}
                todolistStatus={tl.entityStatus}
                filter={tl.filter}
                tasks={filteredTasks}
              />
            </Grid>
          )
        })}
      </Grid>
    </>
  )
})
