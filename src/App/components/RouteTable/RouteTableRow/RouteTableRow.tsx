import React, { useState } from 'react';
import { AddRoleCallback, RouteItem, TableSettings } from '../../../shared/types';
import Scripts from '../../../shared/utils/clientScripts';
import AddItemButton from '../AddItemButton/AddItemButton';
import RoleRow from '../RoleRow/RoleRow';
import { DefaultTermByType } from '../../../shared/utils/constants';
import { downIcon, removeIcon, upIcon } from '../../../shared/utils/icons';

/** Пропсы компонента */
interface RouteTableRowProps {
	/** Данные строки */
	data: RouteItem;
	/** Перенос шага */
	moveRow: (stepNumber: number, isUp: boolean) => void
	/** Добавить роль */
	addRoleCallback: AddRoleCallback
	/** Изменить значения строки маршрута */
	setRowData: (newRowItem: RouteItem) => void
	/** Настройки таблицы */
	tableSettings?: TableSettings
	/** Режим изменения */
	isEditMode?: boolean
	/** Показывать статус */
	isShowStatus?: boolean
	/** Настройки ширины столбцов */
	gridTemplateColumns?: string
	/** Индекс строки */
	index: number
}

/** Тип согласования */
enum ApprovalType {
	parallel = "Параллельное",
	sequential = "Последовательное"
}

/** Да/Нет */
enum BooleanStr {
	true = "Да",
	false = "Нет"
}

/** Строка таблицы Маршрута согласования */
export default function RouteTableRow(props: RouteTableRowProps) {
	const { index, data, addRoleCallback, setRowData, tableSettings, isEditMode = false, moveRow, gridTemplateColumns } = props;
	/** Нажатие на кнопку добавления роли */
	const onClickAddRole = () => {
		Scripts.toggleAddRole(addRoleCallback)
	}

	/** Изменение типа согласования */
	const onChangeType = (ev: any) => {
		data.isParallel = ev.target.value == '1';
		// updateStepTypes(data.isParallel, data.step)
		if (!termChanged) {
			data.term = data.isParallel ? DefaultTermByType.parallel : DefaultTermByType.sequential
		}

		setRowData(data)
	}

	/** Флажок ручного изменения срока согласования */
	const [termChanged, setTermChanged] = useState<boolean>(data.isParallel && data.term != DefaultTermByType.parallel || !data.isParallel && data.term != DefaultTermByType.sequential);
	/** Изменение срока согласования */
	const onChangeTerm = (ev: any) => {
		setTermChanged(true)
		const num = Number(ev.target.value);
		data.term = num > 0 ? num : 0;
		setRowData(data)
	}

	/** Изменение возможности добавления */
	const onChangeCanAddUser = (ev: any) => {
		data.canAddUser = ev.target.value == '1';
		setRowData(data)
	}

	/** Изменение условия */
	const onChangeCondition = (ev: any) => {
		data.condition = ev.target.value;
		setRowData(data)
	}

	/** Удаление строки */
	const deleteRow = () => {
		data.deleted = true;
		setRowData(data)
	}

	/** Перемещение строки вверх */
	const moveRowUp = () => {
		moveRow(data.step, true)
	}

	/** Перемещение строки вниз */
	const moveRowDown = () => {
		moveRow(data.step, false)
	}

	/** Перемещение строки роли */
	const moveRoleRow = (index: number, isUp: boolean) => {
		const newRowData = data;

		// Индекс строки с которой меняютяся местами
		let swapIndex = index;
		if (isUp && index > 0) {
			swapIndex = index - 1
		}
		if (!isUp && index < data.roles.length - 1) {
			swapIndex = index + 1
		}

		// Поменять элементы местами в массиве
		[newRowData.roles[swapIndex], newRowData.roles[index]] = [data.roles[index], data.roles[swapIndex]];

		setRowData(newRowData)
	}

	/** Разметка подтаблицы ролей */
	const rolesLayout = (
		data.roles.map((role, index) =>
			<RoleRow {...props} roleIndex={index} role={role} moveRow={moveRoleRow} />
		)
	)


	/** Разметка режима редактирования */
	const editLayout = (
		<>
			<div className="column-action">
				<div>{index + 1}</div>
				<div className="column-action__actions">
					{tableSettings && tableSettings.canDeleteStep && <div className="column-action__button" onClick={deleteRow}>{removeIcon}</div>}
					<div onClick={moveRowUp} className="column-action__button">{upIcon}</div>
					<div onClick={moveRowDown} className="column-action__button">{downIcon}</div>
				</div>
			</div>
			{/* Тип согласования */}
			<div>
				<select className='route-input-field' name="" id="" onChange={onChangeType} value={data.isParallel ? '1' : '0'}>
					<option value="0">{ApprovalType.sequential}</option>
					<option value="1">{ApprovalType.parallel}</option>
				</select>
			</div>
			{/* Срок согласования */}
			{tableSettings && tableSettings.isShowTerm &&
				<div>
					<input className='route-input-field' type="number" name="term" id="term" onChange={onChangeTerm} value={data.term} />
				</div>
			}
			{/* Роли */}
			<div className="sub-table__body">
				{rolesLayout}
				{data.canAddUser && <AddItemButton handleAddClick={onClickAddRole} />}
			</div>
			{/* Возможность добавления */}
			{
				tableSettings && tableSettings.isShowAddAbility &&
				<div>
					<select className='route-input-field' name="canAddUser" onChange={onChangeCanAddUser} value={data.canAddUser ? '1' : '0'}>
						<option value="1">Да</option>
						<option value="0">Нет</option>
					</select>
				</div>
			}
			{/* Условие */}
			{
				tableSettings && tableSettings.isShowCondition &&
				<div>
					<textarea className='route-input-field route-textarea' name="condition" value={data.condition} onChange={onChangeCondition}></textarea>
				</div>
			}
		</>
	)

	/** Разметка режима просмотра */
	const viewLayout = (
		<>
			<div className="column-action">
				<div>{index + 1}</div>
			</div>
			{/* Тип согласования */}
			<div> {data.isParallel ? ApprovalType.parallel : ApprovalType.sequential} </div>
			{/* Срок согласования */}
			{tableSettings && tableSettings.isShowTerm &&
				<div> {data.term} </div>
			}
			{/* Роли */}
			<div className="sub-table__body"> {rolesLayout} </div>
			{/* Возможность добавления */}
			{
				tableSettings && tableSettings.isShowAddAbility &&
				<div> {(data.canAddUser && tableSettings && tableSettings.canAddRole) ? BooleanStr.true : BooleanStr.false} </div>
			}
			{/* Условие */}
			{
				tableSettings && tableSettings.isShowCondition &&
				<div>
					<div className='route-textarea-view'>
						{data.condition}
					</div>
				</div>
			}
		</>
	)

	return (
		<div className="route-table__row route-table-body__row" style={{ gridTemplateColumns: gridTemplateColumns }}>
			{isEditMode ? editLayout : viewLayout}
		</div>
	)
}
