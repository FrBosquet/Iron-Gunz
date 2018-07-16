import React, { Component } from 'react'
import styled from 'styled-components'
import ScreenRouter from './modules/screens/ScreenRouterEnhanced'
import Notification from './modules/notification/NotificationEnhanced'

const AppWrapper = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
`

AppWrapper.displayName = 'AppWrapper'

class App extends Component {
	render() {
		return (
			<AppWrapper>
				<Notification />
				<ScreenRouter />
			</AppWrapper>
		)
	}
}

export default App
