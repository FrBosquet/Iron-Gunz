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

const Container = styled.div`
	position: 'fixed';
`

Container.displayName = 'NotificationWrapper'

export default () => (
	<Container>
		<NotificationEnhanced />
	</Container>
)
