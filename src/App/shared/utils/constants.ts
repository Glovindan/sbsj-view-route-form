import { RouteTableCaptions } from "../types";

/** Срок согласования по умолчанию */
export enum DefaultTermByType {
	parallel = 16,
	sequential = 8,
}

/** Надписи для согласования */
export const ApprovalCaptions: RouteTableCaptions = {
	title: "Маршрут согласования",
	type: "Тип согласования",
	term: "Срок согласования",
	termSubTable: "Срок согласования",
	additionalTableTitle: "Дополнительные согласующие",
	additionalTableInviter: "Согласующий",
	additionalTableApprover: "Привлеченный к согласованию",
}

/** Надписи для голосования */
export const VotingCaptions: RouteTableCaptions = {
	title: "Маршрут голосования",
	type: "Тип голосования",
	term: "Срок голосования",
	termSubTable: "Срок голосования",
	additionalTableTitle: "Дополнительные голосующие",
	additionalTableInviter: "Голосующий",
	additionalTableApprover: "Привлеченный к голосованию",
}