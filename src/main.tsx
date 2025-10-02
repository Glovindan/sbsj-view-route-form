import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/App'
import Scripts from './App/shared/utils/clientScripts'
import { ApprovalCaptions, VotingCaptions } from './App/shared/utils/constants';

// Рендер приложений
const rootElement = document.getElementById(Scripts.getElmaUUID());
if(rootElement) {
	ReactDOM.createRoot(rootElement as HTMLElement).render(
		// Для согласования
		<App captions={ApprovalCaptions}/>
		// Для голосования
		// <App captions={VotingCaptions}/>
	)
}
