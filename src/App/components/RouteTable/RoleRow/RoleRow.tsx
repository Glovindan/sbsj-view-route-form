import React from 'react';
import { AddRoleCallback, RoleItem, RoleType, RouteItem, TableSettings } from '../../../shared/types';
import { onClickDepartment, onClickGroup, onClickUser } from '../../../shared/utils/utils';

/** Пропсы компонента */
interface RoleRowProps {
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
	/** Данные роли */
	role: RoleItem
}

/** Строка подтаблицы с ролями */
export default function RoleRow({ data, setRowData, role, isShowStatus = false }: RoleRowProps) {
	/** Изменение срока согласования */
	const onChangeTerm = (ev: any) => {
		data.term = Number(ev.target.value);
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

	/** Иконка вверх */
	const upIcon = (
		<svg xmlns="http://www.w3.org/2000/svg" width="23px" height="23px" viewBox="0 0 24 24" fill="none">
			<path xmlns="http://www.w3.org/2000/svg" d="M17 14L12 9L7 14" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	)

	/** Иконка вниз */
	const downIcon = (
		<svg xmlns="http://www.w3.org/2000/svg" width="23px" height="23px" viewBox="0 0 24 24" fill="none">
			<path xmlns="http://www.w3.org/2000/svg" d="M7 10L12 15L17 10" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	)

	return (
		<div className={`route-table__row sub-table__row`}>
			{/* Колонка с действиями */}
			<div className='column-action'>
				{/* Колонка с именем */}
				<div>
					{/* Если указана группа то показать группу, иначе пользователя */}
					{
						role.groupId != undefined
							?
							<span
								className={role.roleType == RoleType.group ? "route-table__link" : ""}
								onClick={role.roleType == RoleType.group ? () => onClickGroup(role.groupId!) : () => { }}
							>
								{role.groupName}
							</span>
							: (role.employeeId && <span className="route-table__user-link" onClick={() => onClickUser(role.employeeId!)}>{role.employeeName}</span>)
					}
					{/* Если указана группа и найден согласующий пользователь */}
					{
						role.groupId != undefined && role.employeeId != undefined &&
						<span>&nbsp;<span className="route-table__user-link" onClick={() => onClickUser(role.employeeId!)}>({role.employeeName})</span></span>
					}
				</div>
				{/* TODO */}
				{/* <div className="column-action__actions">
									<div className="column-action__button">{removeIcon}</div>
									<div className="column-action__button">{upIcon}</div>
									<div className="column-action__button">{downIcon}</div>
								</div> */}
			</div>
			{/* Должность */}
			<div>
				{role.employeeNamePosition}
			</div>
			{/* Подразделение */}
			<div>
				<span className={role.employeeDepartmentId && "route-table__user-link"} onClick={() => role.employeeDepartmentId && onClickDepartment(role.employeeDepartmentId)}>
					{role.employeeDepartmentName}
				</span>
			</div>
			{/* Колонка статуса */}
			{
				isShowStatus &&
				<div>
					{role.status}
				</div>
			}
		</div>
	)
}
