/** Маршрутизация по SPA */
export const redirectSPA = (href: string) => {
	let element = document.createElement('a')
	element.href = href
	element.style.display = 'none'
	document.querySelector('body')?.appendChild(element)
	element.click()
	element.remove()
}

/** Открытие пользователя */
export const onClickUser = (employeeId: string) => {
	redirectSPA(`.(p:item/edms_directoties/employee/${employeeId})`)
}

/** Открытие группы */
export const onClickGroup = (groupId: string) => {
	redirectSPA(`(p:group/${groupId})`)
}

export default {
	redirectSPA,
	onClickUser,
	onClickGroup,
}
