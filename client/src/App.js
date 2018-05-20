import React, { Component } from 'react'
import Logger from './modules/logger/LoggerEnhanced'
import RoomSelector from './modules/roomSelector/RoomSelectorEnhanced'
import Identity from './modules/identity/IdentityEnhanced'
import Chat from './modules/chat/ChatEnhanced'
import GameRoom from './modules/gameRoom/GameRoomEnhanced'
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
