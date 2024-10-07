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
		for (let j = 0; j < 3; j++) {
			rowItem.step = index

			const roleItem = new RoleItem()
			roleItem.roleType = RoleType.group
			roleItem.deadline = new Date()
			roleItem.isDeadlineOverdue = true
			roleItem.employeeId = (Math.random() + 1).toString(36).substring(7)
			roleItem.employeeName = (Math.random() + 1).toString(36).substring(7)
			roleItem.status = 'Согласовано'
			roleItem.groupId = (Math.random() + 1).toString(36).substring(7)
			roleItem.groupName = '123' + (Math.random() + 1).toString(36).substring(7)

			roleItem.employeeDepartmentName = 'Test Dep'
			roleItem.employeeDepartmentId = 'ebae2-dab21bb12f'
			roleItem.employeeNamePosition = 'Test Position'

			rowItem.roles.push(roleItem)
		}
		rowItem.condition =
			'Lorem ipsum odor amet, consectetuer adipiscing elit. Cursus tortor fusce dapibus, taciti egestas ante suspendisse. Velit odio eros pulvinar tortor varius dignissim netus. In penatibus aenean massa iaculis vulputate, potenti rhoncus nulla. Leo integer amet vel cras luctus; vivamus est scelerisque. Vehicula commodo accumsan iaculis senectus tellus. Interdum aptent imperdiet ultrices dignissim curae ornare rutrum? Egestas pellentesque posuere lectus etiam aliquet.'
		routeItems.push(rowItem)
	}

	return routeItems
}

/**  Сохранение данных маршрута согласования */
async function saveRouteData(routeData: RouteItem[]): Promise<void> {
	console.log(routeData)
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
	settings.canEditRoute = true

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
		rowItem.comment = 'Test'

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
