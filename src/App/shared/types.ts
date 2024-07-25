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

/** Типы ролей */
export enum RoleType {
	/** Группа */
	group = 'group',
	/** Пользователь */
	user = 'user',
	/** Оргструктура */
	orgstruct = 'orgstruct',
}

/** Элемент таблицы Роль */
export class RoleItem {
	/** Тип роли */
	roleType: RoleType
	/** Статус согласования */
	status: string

	/** Идентификатор Сотрудника */
	employeeId: string
	/** Название Сотрудника */
	employeeName: string

	/** Идентификатор Группы */
	groupId?: string
	/** Название Группы */
	groupName?: string

	constructor() {
		this.employeeId = ''
		this.employeeName = ''
		this.roleType = RoleType.user
		this.status = ''
	}
}

/** Функция обратного вызова добавления роли */
export type AddRoleCallback = (roleItems: RoleItem[]) => void
