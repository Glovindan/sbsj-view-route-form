import React, { useState, useContext, useEffect } from 'react'
import classNames from 'classnames'
import { context } from '../../context'

export function Test(): React.ReactNode {
	const [buttonName, setbuttonName] = useState(0)
	const [data, setData] = useState(useContext(context).data)

	useEffect(() => {
		if (data.length !== 0) {
			return () => {
				console.log(data)
			}
		}
	}, [buttonName])

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
				{data && data.length
					? data.map((item: any, idx: number) => (
							<li
								className={classNames('app__list-item', { 'app__list-item--green': idx % 2 === 0 })}
							>{`name: ${item.name} Age: ${item.age}`}</li>
					  ))
					: ''}
			</ul>
		</>
	)
}
