import React, { useContext, useEffect, useState } from 'react'
import Scripts from '../../shared/utils/clientScripts'
import { RouteItem } from '../../shared/types';
import RouteTableRow from './RouteTableRow/RouteTableRow';

/** Таблица Маршрута согласования */
export default function RouteTable() {
	const [routeData, setRouteData] = useState<RouteItem[]>([]);

	useEffect(() => {
		getRouteData();
	}, [])

	/** Получение данных Маршрута */
	const getRouteData = async () => {
		const data = await Scripts.getRouteData();
		setRouteData(data);
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
						<div> Статус </div>
					</div>
				</div>
				<div> Возможность добавления </div>
			</div>
			<div className="route-table__body">
				{
					routeData.map(rowData => <RouteTableRow data={rowData} />)
				}
			</div>
		</div>
	)
}
