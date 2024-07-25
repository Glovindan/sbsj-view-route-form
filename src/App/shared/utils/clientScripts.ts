import { RoleItem, RouteItem } from '../types'

/**  Получение данных маршрута согласования */
async function getRouteData(): Promise<RouteItem[]> {
	const rowItem = new RouteItem()

	const roleItem = new RoleItem()
	roleItem.roleName = 'Test T.'
	roleItem.roleId = 'test_id'
	roleItem.roleType = 'user'
	roleItem.status = 'Согласовано'

	const roles = [roleItem, roleItem, roleItem]

	rowItem.roles = roles

	return [rowItem, rowItem, rowItem]
}

/**  Сохранение данных маршрута согласования */
async function saveRouteData(routeData: RouteItem[]): Promise<void> {
	return
}

export default {
	getRouteData,
	saveRouteData,
}
