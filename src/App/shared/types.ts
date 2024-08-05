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

	constructor() {
		this.step = 0
		this.isParallel = false
		this.term = 0
		this.roles = []
		this.canAddUser = false
		this.deleted = false
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

	constructor() {
		this.inviter = new RoleItem()
		this.approver = new RoleItem()
		this.status = ''
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

	/** Идентификатор Группы */
	groupId?: string
	/** Название Группы */
	groupName?: string

	constructor() {
		this.roleType = RoleType.user
		this.status = ''
	}
}

/** Функция обратного вызова добавления роли */
export type AddRoleCallback = (roleItems: RoleItem[]) => void

/** Настройки таблицы */
export class TableSettings {
	/** Показывать статус */
	isShowStatus: boolean
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
	/** Показывать дополнительных согласующих */
	showAdditionalApprovers: boolean

	constructor() {
		this.isReadOnly = false
		this.isShowStatus = false

		this.canDeleteStep = true
		this.canAddStep = true
		this.canDeleteRole = true
		this.canAddRole = true

		this.showAdditionalApprovers = true
	}
}
