import React, { useContext, useEffect, useState } from 'react'
import Scripts from '../../shared/utils/clientScripts'
import { AddRoleCallback, RoleItem, RouteItem, TableSettings } from '../../shared/types';
import RouteTableRow from './RouteTableRow/RouteTableRow';
import AddItemButton from './AddItemButton/AddItemButton';
import Loader from '../Loader/Loader';

/** Пропсы компонента */
interface RouteTableRowProps {
	/** Показывать статус */
	// isShowStatus?: boolean
}

/** Таблица Маршрута согласования */
export default function RouteTable({ }: RouteTableRowProps) {
	const [routeData, setRouteData] = useState<RouteItem[]>([]);
	const [initialRouteData, setInitialRouteData] = useState<RouteItem[]>([]);
	const [tableSettings, setTableSettings] = useState<TableSettings>()
	const [isEditMode, setIsEditMode] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	React.useLayoutEffect(() => {
		Scripts.getSettings().then((tableSettings) => setTableSettings(tableSettings))
	}, [])

	React.useLayoutEffect(() => {
		if (!tableSettings) return;
		getRouteData();
	}, [tableSettings])

	/** Получение данных Маршрута */
	const getRouteData = async () => {
		setIsLoading(true);
		const data = await Scripts.getRouteData();
		setRouteData(data);
		setInitialRouteData(data)
		setIsLoading(false);
	}

	/** Создание функции Добавить роль */
	const addRoleCallbackFactory = (step: number): AddRoleCallback => {
		return (roleItems: RoleItem[]) => {
			const row = routeData.find(routeRow => routeRow.step === step);

			if (row) {
				row.roles = row.roles.concat(roleItems);
			}

			setRouteData([...routeData])
		}
	}

	/** Создание функции Добавить роль */
	const editRowFactory = (row: RouteItem) => {
		return (newRowItem: RouteItem) => {
			Object.assign(row, newRowItem);

			setRouteData([...routeData])
		}
	}

	/** Обработчик добавления строки в маршрут */
	const handleAddRouteRow = () => {
		const routeDataFiltered = routeData.filter(rd => !rd.deleted);
		const lastStep = routeDataFiltered[routeDataFiltered.length - 1].step;

		const newRow = new RouteItem();
		newRow.step = lastStep + 1;
		newRow.term = 8;

		routeData.push(newRow)

		setRouteData([...routeData])
	}

	/** Обработка нажатия на кнопку редактирования */
	const handleEditClick = () => {
		setIsEditMode(true)
	}

	/** Обработка нажатия на кнопку сохранения */
	const handleSaveClick = () => {
		Scripts.saveRouteData(routeData).then(() => getRouteData());
		setIsEditMode(false)
	}

	/** Обработка нажатия на кнопку отмены */
	const handleCancelClick = () => {
		setRouteData(initialRouteData)
		getRouteData()
		setIsEditMode(false)
	}

	return (
		<div className='route-table-wrapper'>
			<div className='table-title'>Маршрут согласования</div>
			<div className="my-table route-table">
				<div className="route-table__header route-table__row">
					<div> Шаг </div>
					<div> Тип согласования </div>
					<div> Срок согласования </div>
					<div className="sub-table__body">
						<div className='route-table__header route-table__row sub-table__row'>
							<div> Роль </div>
							<div> Должность </div>
							<div> Подразделение </div>
							{tableSettings && tableSettings.isShowStatus && <div> Статус </div>}
						</div>
					</div>
					<div> Возможность добавления </div>
				</div>
				{!isLoading
					? <div className="route-table__body">
						{
							routeData.map(rowData => !rowData.deleted && <RouteTableRow tableSettings={tableSettings} setRowData={editRowFactory(rowData)} isEditMode={isEditMode} isShowStatus={tableSettings && tableSettings.isShowStatus} data={rowData} addRoleCallback={addRoleCallbackFactory(rowData.step)} />)
						}
						{
							isEditMode && tableSettings && tableSettings.canAddStep &&
							<div className='route-table__add-button-wrapper'>
								<AddItemButton handleAddClick={handleAddRouteRow} />
							</div>
						}
					</div>
					: <div className="route-table__body">
						<Loader />
					</div>
				}
			</div>
			{
				tableSettings && !tableSettings.isReadOnly &&
				<div className='route-table-actions'>
					{!isEditMode && <button className='route-table-button' onClick={handleEditClick}>Редактировать</button>}
					{isEditMode && <button className='route-table-button' onClick={handleSaveClick}>Сохранить</button>}
					{isEditMode && <button className='route-table-button route-table-button_outline' onClick={handleCancelClick}>Отменить</button>}
				</div>
			}
		</div>
	)
}
