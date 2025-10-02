import React, { useContext, useState } from 'react'
import RouteTable from './components/RouteTable/RouteTable'
import AdditionalApprovers from './components/AdditionalApprovers/AdditionalApprovers'
import { RouteTableCaptions } from './shared/types'

type AppProps = {
	/** Надписи */
	captions: RouteTableCaptions
}
export default function App({captions}: AppProps) {

	return (
		<div className='tables-wrapper'>
			<RouteTable captions={captions} />
			<AdditionalApprovers captions={captions}  />
		</div>
	)
}
