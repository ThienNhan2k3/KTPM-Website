import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Stack, Button, Card } from 'react-bootstrap'

function App() {
  return (
    <>
      <h1>Installed bootstrap successfully!</h1>
      <Stack direction="horizontal" gap={2}>
        <Button as="a" variant="primary">
          Button as link
        </Button>
        <Button as="a" variant="success">
          Button as link
        </Button>
      </Stack>;
    </>
  )
}

export default App
