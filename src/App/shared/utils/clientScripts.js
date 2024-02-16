async function generateDataForRender() {
	const data = [
		{
			'projectName': 'Project 1',
			'id': '018ce89d-6c2c-7e38-af4b-f3b634009f27',
			'projectManager': {
				'name': 'User 1',
				'id': '018ce89d-ca9a-7aac-ab95-21106993be8b',
			},
			'team': [
				{
					'name': 'User 4',
					'id': '018ce89e-34db-7083-ac5b-4f98069dbbdf',
				},
				{
					'name': 'User 5',
					'id': '018ce89e-4699-7f2d-88dc-3b3400fac811',
				},
			],
		},
		{
			'projectName': 'Project 2',
			'id': '018ce8a2-2927-7684-9a65-ade564f344e3',
			'projectManager': {
				'name': 'User 2',
				'id': '018ce89e-0879-7372-8abc-87ef29db5a96',
			},
			'team': [
				{
					'name': 'User 1',
					'id': '018ce89d-ca9a-7aac-ab95-21106993be8b',
				},
				{
					'name': 'User 3',
					'id': '018ce89e-1f89-75cc-a356-e44f6d03dd30',
				},
			],
		},
	]

	return data
}

export default {
	generateDataForRender,
}
