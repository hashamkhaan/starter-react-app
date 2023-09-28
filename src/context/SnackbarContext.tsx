import React, { createContext, useContext, useState } from 'react'

const SnackbarContext = createContext()

export function useSnackbar() {
  return useContext(SnackbarContext)
}

export interface SnackbarMessage {
  key: number
  message: string
  status: string
}

export function SnackbarProvider({ children }) {
  const [open, setOpen] = useState<boolean>(false)
  const [snackPack, setSnackPack] = useState<SnackbarMessage[]>([])
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(undefined)

  const triggerSnackbar = (status: string, message: string) => {
    setSnackPack(prev => [...prev, { status, message, key: new Date().getTime() }])

    // setMessage(message)
    // setStatus(status)
    // setOpen(true)
  }

  const handleClose = (event: Event | SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const handleExited = () => {
    setMessageInfo(undefined)
  }

  return (
    <SnackbarContext.Provider
      value={{
        messageInfo,
        open,
        setMessageInfo,
        triggerSnackbar,
        setOpen,
        handleClose,
        handleExited,
        setSnackPack,
        snackPack
      }}
    >
      {children}
    </SnackbarContext.Provider>
  )
}
