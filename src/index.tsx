import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './hooks/auth-provider';
import { QuestionProvider } from './hooks/question-provider';
import Header from './components/header';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <QuestionProvider>

        <App></App>
      </QuestionProvider>
    </AuthProvider>
  </React.StrictMode>
);