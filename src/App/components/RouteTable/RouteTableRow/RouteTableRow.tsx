import React, { useContext } from 'react'
import { AddRoleCallback, RouteItem } from '../../../shared/types'
import { redirectSPA } from '../../../shared/utils/utils';
import Scripts from '../../../shared/utils/clientScripts';

/** Пропсы компонента */
interface RouteTableRowProps {
	/** Данные строки */
	data: RouteItem;
	/** Добавить роль */
	addRoleCallback: AddRoleCallback
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
export default function RouteTableRow({ data, addRoleCallback, isEditMode: isViewMode = true, isShowStatus = false }: RouteTableRowProps) {
	/** Открытие пользователя */
	const onClickUser = (employeeId: string) => {
		redirectSPA(`.(p:item/edms_directoties/employee/${employeeId})`)
	}

	/** Открытие группы */
	const onClickGroup = (groupId: string) => {
		redirectSPA(`(p:group/${groupId})`)
	}

	/** Иконка добавления роли */
	const addIcon = (
		<svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" viewBox="0 0 24 24" fill="none">
			<path d="M12 7V17M7 12H17" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	)

	/** Нажатие на кнопку добавления роли */
	const onClickAddRole = () => {
		Scripts.toggleAddRole(addRoleCallback)
	}

	return (
		<div className="route-table__row route-table-body__row">
			<div> {data.step} </div>
			<div> {data.isParallel ? ApprovalType.parallel : ApprovalType.sequential} </div>
			<div> {data.term} </div>
			<div className="sub-table__body">
				{
					data.roles.map(role =>
						<div className="route-table__row sub-table__row">
							<div>
								<span className="route-table__user-link" onClick={() => onClickUser(role.employeeId)}>{role.employeeName}</span>
								{
									role.groupId != undefined && <span> (<span className="route-table__link" onClick={() => onClickGroup(role.groupId!)}>{role.groupName}</span>)</span>
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
				<div className='sub-table__add-item' onClick={onClickAddRole}>
					<span>{addIcon}</span>
					<span>Добавить</span>
				</div>
				{/* <div className="route-table__row sub-table__row">
				</div> */}
			</div>
			<div> {data.canAddUser ? BooleanStr.true : BooleanStr.false} </div>
		</div >
	)
}
