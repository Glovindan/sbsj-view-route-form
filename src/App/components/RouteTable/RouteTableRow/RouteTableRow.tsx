import React, { useContext } from 'react'
import { RouteItem } from '../../../shared/types'

/** Пропсы компонента */
interface RouteTableRowProps {
	/** Данные строки */
	data: RouteItem;
	/** Режим чтения */
	isViewMode?: boolean
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
export default function RouteTableRow({ data, isViewMode = true }: RouteTableRowProps) {

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
								{role.roleName}
							</div>
							<div>
								{role.status}
							</div>
						</div>
					)
				}
			</div>
			<div> {data.canAddUser ? BooleanStr.true : BooleanStr.false} </div>
		</div>
	)
}
