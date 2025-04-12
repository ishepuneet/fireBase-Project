import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from './Form.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Form/>
  </StrictMode>,
)
