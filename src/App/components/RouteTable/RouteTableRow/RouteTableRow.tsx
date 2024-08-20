import React from 'react';
import { AddRoleCallback, RouteItem, TableSettings } from '../../../shared/types';
import Scripts from '../../../shared/utils/clientScripts';
import AddItemButton from '../AddItemButton/AddItemButton';
import RoleRow from '../RoleRow/RoleRow';

/** Пропсы компонента */
interface RouteTableRowProps {
	/** Данные строки */
	data: RouteItem;
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
	const { data, addRoleCallback, setRowData, tableSettings, isEditMode = false } = props;
	/** Нажатие на кнопку добавления роли */
	const onClickAddRole = () => {
		Scripts.toggleAddRole(addRoleCallback)
	}

	/** Изменение типа согласования */
	const onChangeType = (ev: any) => {
		data.isParallel = ev.target.value == '1';
		setRowData(data)
	}

	/** Изменение срока согласования */
	const onChangeTerm = (ev: any) => {
		const num = Number(ev.target.value);
		data.term = num > 0 ? num : 0;
		setRowData(data)
	}

	/** Изменение возможности добавления */
	const onChangeCanAddUser = (ev: any) => {
		data.canAddUser = ev.target.value == '1';
		setRowData(data)
	}

	/** Удаление строки */
	const deleteRow = () => {
		data.deleted = true;
		setRowData(data)
	}

	/** Иконка удаления */
	const removeIcon = (
		<svg xmlns="http://www.w3.org/2000/svg" width="23px" height="23px" viewBox="0 0 24 24" fill="none">
			<path xmlns="http://www.w3.org/2000/svg" d="M14 9.5C14 9.5 14.5 10.5 14.5 12.5C14.5 14.5 14 15.5 14 15.5M10 9.5C10 9.5 9.5 10.5 9.5 12.5C9.5 14.5 10 15.5 10 15.5M5.99999 6C5.99999 11.8587 4.63107 20 12 20C19.3689 20 18 11.8587 18 6M4 6H20M15 6V5C15 3.22496 13.3627 3 12 3C10.6373 3 9 3.22496 9 5V6" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	)



	return (
		<div className="route-table__row route-table-body__row">
			<div className="column-action">
				<div>{data.step} </div>
				{
					isEditMode &&
					<div className="column-action__actions">
						{tableSettings && tableSettings.canDeleteStep && <div className="column-action__button" onClick={deleteRow}>{removeIcon}</div>}
						{/* TODO */}
						{/* <div className="column-action__button">{upIcon}</div>
						<div className="column-action__button">{downIcon}</div> */}
					</div>
				}
			</div>
			{/* Тип согласования */}
			{
				isEditMode
					? (<div>
						<select className='route-input-field' name="" id="" onChange={onChangeType} value={data.isParallel ? '1' : '0'}>
							<option value="0">{ApprovalType.sequential}</option>
							<option value="1">{ApprovalType.parallel}</option>
						</select>
					</div>)
					: (<div> {data.isParallel ? ApprovalType.parallel : ApprovalType.sequential} </div>)
			}
			{/* Срок согласования */}
			{
				isEditMode
					? (<div>
						<input className='route-input-field' type="number" name="term" id="term" onChange={onChangeTerm} value={data.term} />
					</div>)
					: (<div> {data.term} </div>)
			}
			{/* Роли */}
			<div className="sub-table__body">
				{
					data.roles.map(role =>
						<RoleRow {...props} role={role} />
					)
				}
				{isEditMode && data.canAddUser && <AddItemButton handleAddClick={onClickAddRole} />}
			</div>
			{/* Возможность добавления */}
			{
				isEditMode
					? (<div>
						<select className='route-input-field' name="canAddUser" onChange={onChangeCanAddUser} value={data.canAddUser ? '1' : '0'}>
							<option value="1">Да</option>
							<option value="0">Нет</option>
						</select>
					</div>)
					: (<div> {data.canAddUser && tableSettings && tableSettings.canAddRole ? BooleanStr.true : BooleanStr.false} </div>)
			}
		</div >
	)
}
