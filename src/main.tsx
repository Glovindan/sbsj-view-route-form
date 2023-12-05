import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './components/App'
const wrapper = document.querySelector('#root') as HTMLElement

const root = createRoot(wrapper)

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
