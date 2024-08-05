import React, { useContext, useState } from 'react'
import RouteTable from './components/RouteTable/RouteTable'
import AdditionalApprovers from './components/AdditionalApprovers/AdditionalApprovers'

export default function App() {

	return (
		<div className='tables-wrapper'>
			<RouteTable />
			<AdditionalApprovers />
		</div>
	)
}
