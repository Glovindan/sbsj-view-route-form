import React from 'react'
import { Test } from './Test/Test'

export const App: React.FC = () => {
	return (
		<div className="app">
			<Test />
		</div>
	)
}

export default React.memo(App)
