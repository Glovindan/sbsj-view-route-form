import React from 'react'
import ReactDOM from 'react-dom/client'
import Context from './App/stores/context'
import App from './App/App'
import { IStore } from './App/shared/types'

import Scripts from './App/shared/utils/clientScripts'

// Инициализация Хранилища данных
const store: IStore = {
	data: [],
	dataRender: [],
}

async function setDataStore() {
	store.data = await Scripts.generateDataForRender()
	store.dataRender = structuredClone(store.data)
}

setDataStore()

// Рендер приложений
ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
	<Context.Provider value={store}>
		<App />
	</Context.Provider>
)
