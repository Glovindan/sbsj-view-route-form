export interface IProject {
	projectName: string
	id: string
	projectManager?: IPeople
	team?: IPeople[]
}

interface IPeople {
	name: string
	id: string
}

export interface IStore {
	data: IProject[]
	dataRender: IProject[]
}

export interface IPropsForTable {
	data: IProject[]
}
