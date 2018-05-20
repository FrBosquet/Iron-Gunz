import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { setDisplayName, compose } from 'recompose'
import Notification from './Notification'

const mapStateToProps = state => ({
	connectionStatus: state.notification.connectionStatus,
	notificationsVisible: state.notification.notificationsVisible,
	lastMessage: state.notification.lastMessage
})

const enhance = compose(
	setDisplayName('NotificationEnhanced'),
	connect(mapStateToProps)
)

const NotificationEnhanced = enhance(Notification)

const container = styled.div`
	position: 'fixed';
`

container.displayName = 'NotificationWrapper'

export default () => (
	<container>
		<NotificationEnhanced />
	</container>
)
