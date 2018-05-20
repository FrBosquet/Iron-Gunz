import React from 'react'
import { Overlay, Carrier } from './components'
import { Icon, Label } from '../shared'

const Notifications = ({
	connectionStatus,
	notificationsVisible,
	lastMessage
}) => (
	<Overlay>
		<Carrier isOpen={notificationsVisible}>
			<Label color={connectionStatus ? 'lightLime' : 'errorRed'}>
				{lastMessage}
			</Label>
			<Icon icon={connectionStatus ? 'linkOn' : 'linkOff'} size="16" />
		</Carrier>
	</Overlay>
)

export default Notifications
