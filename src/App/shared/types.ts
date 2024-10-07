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
	/** Удален */
	deleted: boolean
	/** Условие */
	condition: string

	constructor() {
		this.step = 0
		this.isParallel = false
		this.term = 0
		this.roles = []
		this.canAddUser = false
		this.deleted = false
		this.condition = ''
	}
}

/** Элемент таблицы Дополнительные согласующие */
export class AdditionalApproverItem {
	/** Кто привлек */
	inviter: RoleItem
	/** Кого привлек */
	approver: RoleItem
	/** Статус */
	status: string
	/** Статус */
	comment: string

	constructor() {
		this.inviter = new RoleItem()
		this.approver = new RoleItem()
		this.status = ''
		this.comment = ''
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
	employeeId?: string
	/** Название Сотрудника */
	employeeName?: string

	/** Название должности Сотрудника */
	employeeNamePosition?: string
	/** Название подразделения Сотрудника */
	employeeDepartmentName?: string
	/** Идентификатор подразделения Сотрудника */
	employeeDepartmentId?: string

	/** Идентификатор Группы */
	groupId?: string
	/** Название Группы */
	groupName?: string
	/** Срок согласования */
	deadline?: Date
	/** Срок согласования просрочен */
	isDeadlineOverdue?: boolean

	constructor() {
		this.roleType = RoleType.user
		this.status = ''
		this.isDeadlineOverdue = false
	}
}

/** Функция обратного вызова добавления роли */
export type AddRoleCallback = (roleItems: RoleItem[]) => void

/** Настройки таблицы */
export class TableSettings {
	/** Показывать статус */
	isShowStatus: boolean
	/** Показывать столбец Возможность добавления */
	isShowAddAbility: boolean
	/** Только для чтения */
	isReadOnly: boolean

	/** Возможность удаления шага */
	canDeleteStep: boolean
	/** Возможность добавления шага */
	canAddStep: boolean
	/** Возможность удаления Роли */
	canDeleteRole: boolean
	/** Возможность добавления Роли */
	canAddRole: boolean
	/** Возможность Изменения маршрута */
	canEditRoute: boolean
	/** Показывать дополнительных согласующих */
	showAdditionalApprovers: boolean
	/** Показывать срок согласования по задаче (Кол-во часов)*/
	isShowTerm: boolean
	/** Показывать срок согласования по задаче (Датой) */
	isShowDeadline: boolean
	/** Показывать условие */
	isShowCondition: boolean

	constructor() {
		this.isReadOnly = false
		this.isShowStatus = false
		this.isShowAddAbility = true

		this.canDeleteStep = true
		this.canAddStep = true
		this.canDeleteRole = true
		this.canAddRole = true
		this.canEditRoute = false

		this.showAdditionalApprovers = true
		this.isShowDeadline = true
		this.isShowTerm = false
		this.isShowCondition = true
	}
}
