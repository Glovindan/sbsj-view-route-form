import React, { SyntheticEvent, useContext } from 'react'
import { AddRoleCallback, RoleType, RouteItem } from '../../../shared/types'
import { redirectSPA } from '../../../shared/utils/utils';
import Scripts from '../../../shared/utils/clientScripts';
import AddItemButton from '../AddItemButton/AddItemButton';

/** Пропсы компонента */
interface RouteTableRowProps {
	/** Данные строки */
	data: RouteItem;
	/** Добавить роль */
	addRoleCallback: AddRoleCallback
	/** Изменить значения строки маршрута */
	setRowData: (newRowItem: RouteItem) => void
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
export default function RouteTableRow({ data, addRoleCallback, setRowData, isEditMode = false, isShowStatus = false }: RouteTableRowProps) {
	/** Открытие пользователя */
	const onClickUser = (employeeId: string) => {
		redirectSPA(`.(p:item/edms_directoties/employee/${employeeId})`)
	}

	/** Открытие группы */
	const onClickGroup = (groupId: string) => {
		redirectSPA(`(p:group/${groupId})`)
	}

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
		data.term = Number(ev.target.value);
		setRowData(data)
	}

	/** Изменение возможности добавления */
	const onChangeCanAddUser = (ev: any) => {
		data.canAddUser = ev.target.value == '1';
		setRowData(data)
	}

	return (
		<div className="route-table__row route-table-body__row">
			<div> {data.step} </div>
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
						<div className={`route-table__row sub-table__row ${isShowStatus ? '' : 'sub-table__row_single'}`}>
							<div>
								<span className="route-table__user-link" onClick={() => onClickUser(role.employeeId)}>{role.employeeName}</span>
								{
									role.groupId != undefined &&
									<span>&nbsp;
										(<span
											className={role.roleType == RoleType.group ? "route-table__link" : ""}
											onClick={role.roleType == RoleType.group ? () => onClickGroup(role.groupId!) : () => { }}
										>
											{role.groupName}
										</span>)
									</span>
								}
							</div>
							{
								isShowStatus &&
								<div>
									{role.status}
								</div>
							}
						</div>
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
					: (<div> {data.canAddUser ? BooleanStr.true : BooleanStr.false} </div>)
			}
		</div >
	)
}
