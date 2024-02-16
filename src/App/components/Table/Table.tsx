import React from 'react'
import { IPropsForTable } from '../../shared/types'

export default function Table({ data }: IPropsForTable) {
	return (
		<div className="table">
			<div className="wrp"></div>
			<div className="table__header">
				<div className="table__header-col table__header-col--name">
					<span>Название проекта</span>
				</div>
				<div className="table__header-col table__header-col--rp">
					<span>РП</span>
				</div>
				<div className="table__header-col table__header-col--team">
					<span>Команда проекта</span>
				</div>
			</div>
			<div className="table__body">
				<ul className="table__body-list-row">
					{data && data.length
						? data.map((project, idx) => (
								<li key={Date.now() + idx + 1} className="table__body-row">
									<ul className="table__body-list-col">
										<li className="table__body-col table__body-col--name">
											<p>{project.projectName ? project.projectName : ''}</p>
										</li>
										<li className="table__body-col table__body-col--rp">
											<p>
												{project.projectManager && project.projectManager.name
													? project.projectManager.name
													: ''}
											</p>
										</li>
										<li className="table__body-col table__body-col--team">
											<ul className="table__body-list-team">
												{project.team && project.team.length
													? project.team.map((human, idx) => (
															<li key={Date.now() + idx + 1}>
																<p>{human.name}</p>
															</li>
													  ))
													: ''}
											</ul>
										</li>
									</ul>
								</li>
						  ))
						: ''}
				</ul>
			</div>
		</div>
	)
}
