import React, { useState } from 'react';
import Scripts from '../../shared/utils/clientScripts';
import { AdditionalApproverItem, TableSettings } from '../../shared/types';
import Loader from '../Loader/Loader';
import AdditionalApproversRow from './AdditionalApproversRow/AdditionalApproversRow';

/** Пропсы компонента */
interface AdditionalApproversProps {
	/** Показывать статус */
	// isShowStatus?: boolean
}

/** Таблица Дополнительные согласущие */
export default function AdditionalApprovers({ }: AdditionalApproversProps) {
	const [approversData, setApproversData] = useState<AdditionalApproverItem[]>([]);
	const [tableSettings, setTableSettings] = useState<TableSettings>()
	const [isLoading, setIsLoading] = useState<boolean>(false)

	React.useLayoutEffect(() => {
		Scripts.getSettings().then((tableSettings) => setTableSettings(tableSettings))
	}, [])

	React.useLayoutEffect(() => {
		if (!tableSettings) return;
		getAdditionalApproversData();
	}, [tableSettings])

	/** Получение данных Дополнительных согласующих */
	const getAdditionalApproversData = async () => {
		setIsLoading(true);
		const data = await Scripts.getAdditionalApproversData();
		setApproversData(data);
		setIsLoading(false);
	}

	return (
		<>
			{
				tableSettings && tableSettings.showAdditionalApprovers &&
				<div className='additional-approvers-wrapper'>
					<div className="my-table additional-approvers">
						<div className="additional-approvers__header additional-approvers__row">
							<div> Кто привлек </div>
							<div> Кого привлекли </div>
							<div> Статус </div>
						</div>
						{!isLoading
							? <div className="additional-approvers__body">
								{
									approversData.map(rowData => <AdditionalApproversRow tableSettings={tableSettings} data={rowData} />)
								}
							</div>
							: <div className="additional-approvers__body">
								<Loader />
							</div>
						}
					</div>
				</div>
			}
		</>
	)
}
