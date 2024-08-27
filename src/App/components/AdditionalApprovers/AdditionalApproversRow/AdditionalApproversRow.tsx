import React, { } from 'react'
import { AdditionalApproverItem, TableSettings } from '../../../shared/types'
import { onClickUser, redirectSPA } from '../../../shared/utils/utils';

/** Пропсы компонента */
interface AdditionalApproversRowProps {
	/** Данные строки */
	data: AdditionalApproverItem;
	/** Настройки таблицы */
	tableSettings?: TableSettings
}

/** Строка таблицы Дополнительных согласующих */
export default function AdditionalApproversRow({ data, tableSettings }: AdditionalApproversRowProps) {
	console.log(data)
	return (
		<div className="additional-approvers__row additional-approvers-body__row">
			<div>{data.inviter.employeeId && <span className="additional-approvers__user-link" onClick={() => onClickUser(data.inviter.employeeId!)}>{data.inviter.employeeName}</span>}</div>
			<div>{data.approver.employeeId && <span className="additional-approvers__user-link" onClick={() => onClickUser(data.approver.employeeId!)}>{data.approver.employeeName}</span>}</div>
			<div>{data.status}</div>
			<div>{data.comment}</div>
		</div >
	)
}
