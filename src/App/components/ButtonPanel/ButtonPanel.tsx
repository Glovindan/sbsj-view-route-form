import React from 'react'

function ButtonPanel({ searchHandler }) {
	return (
		<div className="button-panel__btn-wrapper">
			<button className="button-panel__btn-search" onClick={searchHandler}>
				Поиск
			</button>
		</div>
	)
}

export default ButtonPanel
