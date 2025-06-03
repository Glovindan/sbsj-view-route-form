import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/App'
import Scripts from './App/shared/utils/clientScripts'

// Рендер приложений
const rootElement = document.getElementById(Scripts.getElmaUUID());
if(rootElement) {
	ReactDOM.createRoot(rootElement as HTMLElement).render(
		<App />
	)
}
