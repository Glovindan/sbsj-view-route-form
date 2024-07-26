import React, { useContext } from 'react'
import { AddRoleCallback, RouteItem } from '../../../shared/types'
import { redirectSPA } from '../../../shared/utils/utils';
import Scripts from '../../../shared/utils/clientScripts';

/** Пропсы компонента */
interface AddItemButtonProps {
	/** Обработчик нажатия на кнопку */
	handleAddClick: () => any;
}

/** Кнопка добавления строки в таблице */
export default function AddItemButton({ handleAddClick }: AddItemButtonProps) {
	/** Иконка добавления */
	const addIcon = (
		<svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" viewBox="0 0 24 24" fill="none">
			<path d="M12 7V17M7 12H17" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	)

	return (
		<div className='add-item-button' onClick={handleAddClick}>
			<span>{addIcon}</span>
			<span>Добавить</span>
		</div>
	)
}
