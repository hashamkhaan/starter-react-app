import { useState } from 'react'

export const useSnackbar = () => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')

  const triggerSnackbar = message => {
    setMessage(message)
    setOpen(true)
  }

  const closeSnackbar = () => {
    setOpen(false)
    setMessage('')
  }

  return { open, message, triggerSnackbar, closeSnackbar }
}
