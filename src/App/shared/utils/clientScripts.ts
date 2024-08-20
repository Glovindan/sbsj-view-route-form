import {
	AddRoleCallback,
	AdditionalApproverItem,
	RoleItem,
	RoleType,
	RouteItem,
	TableSettings,
} from '../types'

/**  Получение данных маршрута согласования */
async function getRouteData(): Promise<RouteItem[]> {
	const routeItems: RouteItem[] = []

	/** Заглушка ожидания ответа сервера */
	function randomDelay() {
		const delay = Math.random() * 1000
		return new Promise((resolve) => {
			setTimeout(resolve, delay)
		})
	}

	await randomDelay()

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

		roleItem.employeeDepartmentName = 'Test Dep'
		roleItem.employeeDepartmentId = 'ebae2-dab21bb12f'
		roleItem.employeeNamePosition = 'Test Position'

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

	roleItem.employeeDepartmentName = 'Test Dep'
	roleItem.employeeDepartmentId = 'ebae2-dab21bb12f'
	roleItem.employeeNamePosition = 'Test Position'

	return addRoleCallback([roleItem])
}

/** Получение настроек таблицы */
async function getSettings(): Promise<TableSettings> {
	const settings = new TableSettings()

	settings.isReadOnly = false
	settings.isShowStatus = true

	return settings
}

/**  Получение данных маршрута согласования */
async function getAdditionalApproversData(): Promise<AdditionalApproverItem[]> {
	const additionalApproversItems: AdditionalApproverItem[] = []

	/** Заглушка ожидания ответа сервера */
	function randomDelay() {
		const delay = Math.random() * 1000
		return new Promise((resolve) => {
			setTimeout(resolve, delay)
		})
	}

	await randomDelay()

	for (let index = 0; index < 3; index++) {
		const rowItem = new AdditionalApproverItem()

		const inviter = new RoleItem()
		inviter.roleType = RoleType.user
		inviter.employeeId = 'Inviter'
		inviter.employeeName = 'Inviter Inviter'

		const approver = new RoleItem()
		approver.roleType = RoleType.user
		approver.employeeId = 'Approver'
		approver.employeeName = 'Approver Approver'

		rowItem.inviter = inviter
		rowItem.approver = approver
		rowItem.status = 'Соглы'

		additionalApproversItems.push(rowItem)
	}

	return additionalApproversItems
}

export default {
	getRouteData,
	saveRouteData,
	toggleAddRole,
	getSettings,
	getAdditionalApproversData,
}
