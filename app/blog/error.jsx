'use client'

const ErrorWrapper = ({ error }) => {
  return (
    <h1>Ooops!!! {error.message}</h1>
  )
}

export default ErrorWrapper