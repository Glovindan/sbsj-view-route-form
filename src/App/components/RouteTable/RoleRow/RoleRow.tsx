import React from 'react';
import { AddRoleCallback, RoleItem, RoleType, RouteItem, TableSettings } from '../../../shared/types';
import { onClickDepartment, onClickGroup, onClickUser } from '../../../shared/utils/utils';
import { removeIcon } from '../../../shared/utils/icons';

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
	/** Индекс */
	roleIndex: number
}

/** Строка подтаблицы с ролями */
export default function RoleRow({ data, setRowData, role, roleIndex, isShowStatus = false, isEditMode }: RoleRowProps) {
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
		data.roles = data.roles.filter((value, index) => {
			console.log(index, roleIndex)
			return index != roleIndex;
		});
		setRowData(data)
	}

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
				{
					isEditMode &&
					<div className="column-action__actions">
						<div onClick={deleteRow} className="column-action__button">{removeIcon}</div>
						{/* <div className="column-action__button">{upIcon}</div>
						<div className="column-action__button">{downIcon}</div> */}
					</div>
				}
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
