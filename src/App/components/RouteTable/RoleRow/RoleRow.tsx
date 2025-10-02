import React from 'react';
import { AddRoleCallback, ApprovalStatuses, BooleanStr, RoleItem, RoleType, RouteItem, TableSettings, VoteStatus } from '../../../shared/types';
import { onClickDepartment, onClickGroup, onClickUser } from '../../../shared/utils/utils';
import { downIcon, removeIcon, upIcon } from '../../../shared/utils/icons';
import moment from 'moment';
import RouteTableFieldBool from '../RouteTableRow/RouteTableFieldBool/routeTableFieldBool';

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
	/** Перенос шага */
	moveRow: (index: number, isUp: boolean) => void
}

/** Строка подтаблицы с ролями */
export default function RoleRow({ data, setRowData, role, roleIndex, isShowStatus = false, isEditMode, tableSettings, moveRow }: RoleRowProps) {
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

	/** Изменение условия */
	const onChangeCondition = (ev: any) => {
		role.condition = ev.target.value;
		setRowData(data)
	}

	/** Изменение запрета на удаление */
	const onChangeCanDeleteRole = (ev: any) => {
		role.cantDelete = ev.target.value == '1';
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

	/** Перемещение строки вверх */
	const moveRowUp = () => {
		moveRow(roleIndex, true)
	}

	/** Перемещение строки вниз */
	const moveRowDown = () => {
		moveRow(roleIndex, false)
	}
	
	// Для текущего согласующего = жирный шрифт
	const getBoldClassName = () => {
		const approvalCondition = ApprovalStatuses.atApproval || role.status == ApprovalStatuses.atEdit;
		const voteCondition = role.status == VoteStatus.inProgress;

		return role.status == approvalCondition || voteCondition ? "route-table__bold" : null;
	}

	/** Получить наименование класса для группы */
	const getGroupClassName = () => {
		// Для оргструктуры без стиля
		const linkClassName = role.roleType == RoleType.group ? "route-table__link" : null;
		// Для текущего согласующего = жирный шрифт
		const boldClassName = getBoldClassName();
		
		return [linkClassName, boldClassName].filter(className => className).join(" ");
	}
	
	/** Получить наименование класса для пользователя */
	const getUserClassName = () => {
		const linkClassName = "route-table__user-link";
		// Для текущего согласующего = жирный шрифт
		const boldClassName = getBoldClassName();

		return [linkClassName, boldClassName].filter(className => className).join(" ");
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
								className={getGroupClassName()}
								onClick={role.roleType == RoleType.group ? () => onClickGroup(role.groupId!) : () => { }}
							>
								{role.groupName}
							</span>
							: (role.employeeId && <span className={getUserClassName()} onClick={() => onClickUser(role.employeeId!)}>{role.employeeName}</span>)
					}
					{/* Если указана группа и найден согласующий пользователь */}
					{
						role.groupId != undefined && role.employeeId != undefined &&
						<span>&nbsp;<span className={getUserClassName()} onClick={() => onClickUser(role.employeeId!)}>({role.employeeName})</span></span>
					}
				</div>
				{
					isEditMode &&
					<div className="column-action__actions">
						{tableSettings && tableSettings.canDeleteRole && !role.cantDelete && <div onClick={deleteRow} className="column-action__button">{removeIcon}</div>}
						{!role.cantMoveUp && <div onClick={moveRowUp} className="column-action__button">{upIcon}</div>}
						{!role.cantMoveDown && <div onClick={moveRowDown} className="column-action__button">{downIcon}</div>}
					</div>
				}
			</div>
			{/* Должность */}
			<div className={getBoldClassName() ?? ""}>
				{role.employeeNamePosition}
			</div>
			{/* Подразделение */}
			<div className={getBoldClassName() ?? ""}>
				<span className={role.employeeDepartmentId && "route-table__user-link"} onClick={() => role.employeeDepartmentId && onClickDepartment(role.employeeDepartmentId)}>
					{role.employeeDepartmentName}
				</span>
			</div>
			{/* Срок согласования */}
			{
				tableSettings && tableSettings.isShowDeadline &&
				<div className={getBoldClassName() ?? ""}>
					{role.deadline ? moment(role.deadline).format("DD.MM.YYYY HH:mm") : ""}
					<div className='role-row-overdue'>
						{role.deadline && role.isDeadlineOverdue && "Просрочено"}
					</div>
				</div>
			}
			
			{/* Колонка статуса */}
			{
				isShowStatus &&
				<div className={getBoldClassName() ?? ""}>
					{role.status}
				</div>
			}
			{/* Условие */}
			{

				isEditMode
					? (
						tableSettings && tableSettings.isShowCondition &&
						<div>
							<textarea className='route-input-field route-textarea' name="condition" value={role.condition} onChange={onChangeCondition}></textarea>
						</div>
					)
					: (
						tableSettings && tableSettings.isShowCondition &&
						<div>
							<div className='route-textarea-view'>
								{role.condition}
							</div>
						</div>
					)
			}
			{/* Запрет удаления */}
			{

				isEditMode
					? (
						tableSettings && tableSettings.isShowDeleteRole &&
						<div>
							<RouteTableFieldBool onChangeValue={onChangeCanDeleteRole} value={role.cantDelete} />
						</div>
					)
					: (
						tableSettings && tableSettings.isShowDeleteRole &&
						<div> {(role.cantDelete) ? BooleanStr.true : BooleanStr.false} </div>
					)
			}
		</div>
	)
}
