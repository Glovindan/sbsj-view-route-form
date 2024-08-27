import React, { useContext, useEffect, useState } from 'react'
import Scripts from '../../shared/utils/clientScripts'
import { AddRoleCallback, RoleItem, RouteItem, TableSettings } from '../../shared/types';
import RouteTableRow from './RouteTableRow/RouteTableRow';
import AddItemButton from './AddItemButton/AddItemButton';
import Loader from '../Loader/Loader';
import { DefaultTermByType } from '../../shared/utils/constants';

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
	const [isSaving, setIsSaving] = useState<boolean>(false)

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

	/** Получение последнего неудаленного элемента */
	const getLastNotDeletedElement = (stepNumber: number) => {
		// От шага к началу
		for (let index = stepNumber; index >= 0; index--) {
			const rowData = routeData[index];
			if (!rowData || rowData.deleted) continue;
			return rowData
		}

		// От шага к концу
		for (let index = stepNumber; index < routeData.length; index++) {
			const rowData = routeData[index];
			if (!rowData || rowData.deleted) continue;
			return rowData
		}
	}

	/** Создание функции Добавить роль */
	const editRowFactory = (row: RouteItem) => {
		return (newRowItem: RouteItem) => {
			Object.assign(row, newRowItem);

			// Обновление типов при удалении
			if (newRowItem.deleted) {
				const lastNotDeletedElement = getLastNotDeletedElement(newRowItem.step)
				if (lastNotDeletedElement) updateStepTypes(lastNotDeletedElement.isParallel, lastNotDeletedElement.step)
				// Обновление типов при других изменениях
			} else {
				updateStepTypes(newRowItem.isParallel, newRowItem.step)
			}

			setRouteData([...routeData])
		}
	}

	/** Обработчик добавления строки в маршрут */
	const handleAddRouteRow = () => {
		const routeDataFiltered = routeData.filter(rd => !rd.deleted);
		const lastRow = routeDataFiltered.length ? routeDataFiltered[routeDataFiltered.length - 1] : undefined;
		// Номер последнего шага
		const lastStep = lastRow?.step ?? 0;
		// Является тип согласования последнего шага параллельным
		const isLastParallel = lastRow?.isParallel ?? false;

		const newRow = new RouteItem();
		newRow.step = lastStep + 1;
		newRow.isParallel = !isLastParallel;
		newRow.term = newRow.isParallel ? DefaultTermByType.parallel : DefaultTermByType.sequential;
		newRow.canAddUser = true;

		routeData.push(newRow)

		setRouteData([...routeData])
	}

	/** Обновление типов шагов при изменении типа в одном шаге */
	const updateStepTypes = (isParallel: boolean, stepNumber: number) => {
		const newRouteData = routeData;
		// Индекс измененного шага
		const changedStepIndex = newRouteData.findIndex(rdf => rdf.step === stepNumber);

		let isParallelBuffer = !isParallel;
		// От шага к началу
		for (let index = changedStepIndex - 1; index >= 0; index--) {
			const rowData = newRouteData[index];
			if (!rowData || rowData.deleted) continue;

			rowData.isParallel = isParallelBuffer;
			isParallelBuffer = !isParallelBuffer;
		}

		isParallelBuffer = !isParallel;
		// От шага к концу
		for (let index = changedStepIndex + 1; index < newRouteData.length; index++) {
			const rowData = newRouteData[index];
			if (!rowData || rowData.deleted) continue;

			rowData.isParallel = isParallelBuffer;
			isParallelBuffer = !isParallelBuffer;
		}

		setRouteData([...newRouteData])
	}

	/** Обработка нажатия на кнопку редактирования */
	const handleEditClick = () => {
		setIsEditMode(true)
	}

	/** Обработка нажатия на кнопку сохранения */
	const handleSaveClick = () => {
		setIsSaving(true)
		Scripts.saveRouteData(routeData).then(() => {
			setIsSaving(false)
			getRouteData()
		});
		setIsEditMode(false)
	}

	/** Обработка нажатия на кнопку отмены */
	const handleCancelClick = () => {
		setRouteData(initialRouteData)
		getRouteData()
		setIsEditMode(false)
	}

	/** Перемещение строки вверх */
	const moveRow = (stepNumber: number, isUp: boolean) => {
		const newRouteData = routeData;
		// Индекс шага
		const stepIndex = newRouteData.findIndex(rdf => rdf.step === stepNumber && !rdf.deleted);
		if (stepIndex == -1) return;

		const step = newRouteData[stepIndex];

		let stepBefore: RouteItem | undefined;
		let stepBeforeIndex: number = -1;

		if (isUp) {
			// Найти первый элемент перед текущим
			for (let index = stepIndex - 1; index >= 0; index--) {
				const rowData = newRouteData[index];
				if (!rowData || rowData.deleted) continue;

				stepBefore = rowData;
				stepBeforeIndex = index;
				break;
			}
		} else {
			// Найти первый элемент после текущего текущим
			for (let index = stepIndex + 1; index < newRouteData.length; index++) {
				const rowData = newRouteData[index];
				if (!rowData || rowData.deleted) continue;

				stepBefore = rowData;
				stepBeforeIndex = index;
				break;
			}
		}

		if (stepBeforeIndex == -1 || !stepBefore) return;

		// Поменять типы согласования
		const typeBuff = step.isParallel;
		step.isParallel = stepBefore.isParallel;
		stepBefore.isParallel = typeBuff;

		// Поменять элементы местами в массиве
		[newRouteData[stepBeforeIndex], newRouteData[stepIndex]] = [newRouteData[stepIndex], newRouteData[stepBeforeIndex]];

		setRouteData([...newRouteData])
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
							routeData.map(rowData => !rowData.deleted && <RouteTableRow moveRow={moveRow} tableSettings={tableSettings} setRowData={editRowFactory(rowData)} isEditMode={isEditMode} isShowStatus={tableSettings && tableSettings.isShowStatus} data={rowData} addRoleCallback={addRoleCallbackFactory(rowData.step)} />)
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
				tableSettings && tableSettings.canEditRoute && !tableSettings.isReadOnly &&
				(!isSaving
					? <div className='route-table-actions'>
						{!isEditMode && <button className='route-table-button' onClick={handleEditClick}>Редактировать</button>}
						{isEditMode && <button className='route-table-button' onClick={handleSaveClick}>Сохранить</button>}
						{isEditMode && <button className='route-table-button route-table-button_outline' onClick={handleCancelClick}>Отменить</button>}
					</div>
					: <div className='route-table-actions'>
						<Loader />
					</div>
				)
			}
		</div>
	)
}
