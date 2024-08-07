import SnackbarUI from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import { memo } from "react"

type SnackbarPropsType = {
  error: string | null
  onClose: () => void
}

export const Snackbar = memo((props: SnackbarPropsType) => {
  const { error, onClose } = props

  const isOpen = !!props.error

  return (
    <SnackbarUI open={isOpen} autoHideDuration={3000} onClose={onClose}>
      <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
        {error}
      </Alert>
    </SnackbarUI>
  )
})
