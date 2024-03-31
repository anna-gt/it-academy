import { useState } from 'react'
import './App.css'
import {Button, Alert, Breadcrumb} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
		<Breadcrumb>
      <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
        Library
      </Breadcrumb.Item>
      <Breadcrumb.Item active>Data</Breadcrumb.Item>
    </Breadcrumb>
		<Alert>This is a button</Alert>
    <Button>TEST BUTTON</Button>
    </>
  )
}

export default App
