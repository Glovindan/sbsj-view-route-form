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
	/** Достаточно решения одного из группы */
	isSingleApprove: boolean
	/** Возможность удаления шага */
	canDelete: boolean
    /** Возможность перемещения шага */
    canMove: boolean

	constructor() {
		this.step = 0
		this.isParallel = false
		this.term = 0
		this.roles = []
		this.canAddUser = false
		this.deleted = false
		this.isSingleApprove = true
		this.canDelete = true
        this.canMove = false
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
	/** Условие */
	condition: string
	/** Запрет удаления */
	cantDelete: boolean
    /** Запрет перемещения вверх */
    cantMoveUp:boolean
    /** Запрет перемещения вниз */
    cantMoveDown:boolean

	constructor() {
		this.roleType = RoleType.user
		this.status = ''
		this.condition = ''
		this.isDeadlineOverdue = false
		this.cantDelete = false;
        this.cantMoveUp = false;
        this.cantMoveDown = false;
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
	/** Показывать достаточно решения одного из группы */
	isShowIsSingleApprove: boolean
	/** Показывать запрет удаления роли */
	isShowDeleteRole: boolean
	/** Показывать запрет удаления шага */
	isShowDeleteStep: boolean
	/** Настройки по умолчанию? */
	isDefaultSettings?: boolean

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
		this.isShowIsSingleApprove = true
		this.isShowDeleteRole = true
		this.isShowDeleteStep = true
	}
}

/** Да/Нет */
export enum BooleanStr {
	true = 'Да',
	false = 'Нет',
}

/** Статусы согласования */
export enum ApprovalStatuses {
    /** На согласовании */
    atApproval = "На согласовании",
    /** Согласовано */
    approved = "Согласовано",
    /** На устранении замечаний */
    atEdit = "На устранении замечаний",
    /** Отказано */
    rejected = "Отказано"
}

/** Статус голосования */
export enum VoteStatus {
    /** На голосовании */
    inProgress = "На голосовании",
    /** Голосование завершено */
    complete = "Голосование завершено",
    /** Удален */
    deleted = "Удален", // Добавлен новый статус 22.09
    /** Переведено по процессу */
    moved = "Переведено по процессу", // Добавлен новый статус 22.09
}

/** Надписи в маршруте */
export type RouteTableCaptions = {
	title: string,
	type: string,
	term: string,
	termSubTable: string,
	additionalTableTitle: string,
	additionalTableInviter: string,
	additionalTableApprover: string,
}