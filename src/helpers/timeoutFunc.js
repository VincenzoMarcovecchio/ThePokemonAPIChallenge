import React, { useState, useEffect } from 'react'

export const Message = ({ children }) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false)
    }, 2000)

    return () => {
      clearTimeout(timeId)
    }
  }, [])

  if (!show) {
    return null
  }

  return <h3 className={`alert-error`}>{children}</h3>
}
