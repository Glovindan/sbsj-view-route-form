import { AddRoleCallback, RoleItem, RoleType, RouteItem, TableSettings } from '../types'

/**  Получение данных маршрута согласования */
async function getRouteData(): Promise<RouteItem[]> {
	const routeItems: RouteItem[] = []

	for (let index = 0; index < 3; index++) {
		const rowItem = new RouteItem()
		rowItem.step = index

		const roleItem = new RoleItem()
		roleItem.roleType = RoleType.group
		roleItem.employeeId = 'test_id'
		roleItem.employeeName = 'Test T.'
		roleItem.status = 'Согласовано'
		roleItem.groupId = 'test_id'
		roleItem.groupName = '123'

		const roles = [roleItem, roleItem, roleItem]
		rowItem.roles = roles

		routeItems.push(rowItem)
	}

	return routeItems
}

/**  Сохранение данных маршрута согласования */
async function saveRouteData(routeData: RouteItem[]): Promise<void> {
	return
}

/** Открыть окно выбора роли */
async function toggleAddRole(addRoleCallback: AddRoleCallback): Promise<void> {
	const roleItem = new RoleItem()
	roleItem.roleType = RoleType.orgstruct
	roleItem.employeeId = 'test_id'
	roleItem.employeeName = 'Test T.'
	roleItem.status = 'Согласовано'
	roleItem.groupId = 'test_id'
	roleItem.groupName = '123'

	return addRoleCallback([roleItem])
}

/** Получение настроек таблицы */
function getSettings(): TableSettings {
	const settings = new TableSettings()

	settings.isReadOnly = false
	settings.isShowStatus = false

	return settings
}

export default {
	getRouteData,
	saveRouteData,
	toggleAddRole,
	getSettings,
}
