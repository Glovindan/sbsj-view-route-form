import React, { useContext, useEffect, useState } from 'react'
import Scripts from '../../shared/utils/clientScripts'
import { AddRoleCallback, RoleItem, RouteItem } from '../../shared/types';
import RouteTableRow from './RouteTableRow/RouteTableRow';

/** Пропсы компонента */
interface RouteTableRowProps {
	/** Показывать статус */
	isShowStatus?: boolean
}

/** Таблица Маршрута согласования */
export default function RouteTable({ isShowStatus = false }: RouteTableRowProps) {
	const [routeData, setRouteData] = useState<RouteItem[]>([]);

	useEffect(() => {
		getRouteData();
	}, [])

	useEffect(() => {
		getRouteData();
	}, [])

	/** Получение данных Маршрута */
	const getRouteData = async () => {
		const data = await Scripts.getRouteData();
		setRouteData(data);
	}

	/** Создание функции Добавить роль */
	const addRoleCallbackFactory = (step: number): AddRoleCallback => {
		return (roleItems: RoleItem[]) => {
			const row = routeData.find(routeRow => routeRow.step === step);

			if (row) {
				row.roles = row.roles.concat(roleItems);
			}

			console.log(routeData)
			setRouteData([...routeData])
		}
	}

	return (
		<div className="my-table route-table">
			<div className="route-table__header route-table__row">
				<div> Шаг </div>
				<div> Тип согласования </div>
				<div> Срок согласования </div>
				<div className="sub-table__body">
					<div className='route-table__header route-table__row sub-table__row'>
						<div> Роль </div>
						{isShowStatus && <div> Статус </div>}
					</div>
				</div>
				<div> Возможность добавления </div>
			</div>
			<div className="route-table__body">
				{
					routeData.map(rowData => <RouteTableRow data={rowData} addRoleCallback={addRoleCallbackFactory(rowData.step)} />)
				}
			</div>
		</div>
	)
}
