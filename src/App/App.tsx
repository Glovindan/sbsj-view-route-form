import React, { useContext, useState } from 'react'
import ButtonPanel from './components/ButtonPanel/ButtonPanel'
import Table from './components/Table/Table'
import Context from './stores/context'

export default function App() {
	const store = useContext(Context)
	const [dataRender, setDataRender] = useState(store.dataRender)

	async function buttonSearchHandler() {
		store.dataRender = store.dataRender.filter(
			(project) => project.projectManager?.name === 'User 1'
		)

		setDataRender(store.dataRender)
		console.log('data:')
		console.log(store.data)
		console.log('data_render:')
		console.log(store.dataRender)
	}

	return (
		<>
			<ButtonPanel searchHandler={buttonSearchHandler} />
			<Table />
		</>
	)
}
