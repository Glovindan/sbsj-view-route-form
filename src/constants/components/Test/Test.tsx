import React, { useState, useEffect } from 'react'
import Scripts from '../../utils/clientScripts'
import classNames from 'classnames'

export function Test(): React.ReactNode {
	const [buttonName, setbuttonName] = useState(0)
	const [list, setList] = useState<any>()

	useEffect(() => {
		async function getData() {
			const data = await Scripts.generateDataForRender()
			setList(data)
			console.log('test')
		}
		getData()
	}, [])

	async function hendler() {
		setbuttonName((prev) => prev + 1)
	}

	return (
		<>
			<button className="app__button" onClick={hendler}>
				{`click: ${buttonName}`}
			</button>
			<br />
			<ul className="app__list">
				{list
					? list.map((item: any, idx: number) => (
							<li
								className={classNames('app__list-item', { 'app__list-item--green': idx % 2 === 0 })}
							>{`name: ${item.name} Age: ${item.age}`}</li>
					  ))
					: ''}
			</ul>
		</>
	)
}
