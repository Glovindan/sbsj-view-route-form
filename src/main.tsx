import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './components/App'
import { context } from './context'
import Scripts from './utils/clientScripts'

const wrapper = document.querySelector('#root') as HTMLElement
const root = createRoot(wrapper)

const store = {
	data: [] as any[],
}

async function getData() {
	store.data = await Scripts.generateDataForRender()
}

async function renderApp() {
	await getData()
	root.render(
		<React.StrictMode>
			<context.Provider value={store}>
				<App />
			</context.Provider>
		</React.StrictMode>
	)
}

renderApp()
