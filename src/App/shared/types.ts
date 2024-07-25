/** Элемент таблицы Маршрут согласования */
export class RouteItem {
	/** Шаг */
	step: number
	/** Тип согласования (Является параллельным согласованием) */
	isParallel: boolean
	/** Срок согласования */
	term: number
	/** Таблица Роль - статус */
	roles: RoleItem[]
	/** Возможность добавления */
	canAddUser: boolean

	constructor() {
		this.step = 0
		this.isParallel = false
		this.term = 0
		this.roles = []
		this.canAddUser = false
	}
}

/** Элемент таблицы Роль */
export class RoleItem {
	/** Идентификатор Роли */
	roleId: string
	/** Название Роли */
	roleName: string
	/** Название Роли */
	roleType: string
	/** Статус согласования */
	status: string

	constructor() {
		this.roleId = ''
		this.roleName = ''
		this.roleType = ''
		this.status = ''
	}
}
