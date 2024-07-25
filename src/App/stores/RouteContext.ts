// import React from 'react'
// import { initGlobalContext } from './GlobalContext'

// /** Данные обращения */
// export class SelectTaskData {
// 	/** Фильтры поиска */
// 	filters: SelectTaskFilters
// 	/** Состояние оберток фильтров */
// 	filterStates: SelectTaskFiltersStates
// 	/** Обработчик нажатия на кнопку поиск */
// 	onClickSearch: () => Promise<void>
// 	/** Количество отобранных элементов */
// 	elementsCount: number

// 	constructor() {
// 		this.filters = new SelectTaskFilters()
// 		this.filterStates = new SelectTaskFiltersStates()
// 		this.onClickSearch = async () => {
// 			alert('test')
// 		}
// 		this.elementsCount = 0
// 	}
// }
// export const selectTaskContext = initGlobalContext<SelectTaskData>(new SelectTaskData())
