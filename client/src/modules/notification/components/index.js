import styled from 'styled-components'

export const Overlay = styled.div`
	position: fixed;
	top: 0px;
	width: 100%;
	overflow: hidden;
`
Overlay.displayName = 'Overlay'

export const Carrier = styled.div`
	display: flex;
	justify-content: space-between;
	margin: auto;
	width: ${({ theme }) => theme.measures.appMaxWidth};
	height: ${({ theme }) => theme.measures.notificationHeight};
	position: relative;
	top: ${({ theme, isOpen }) => {
		return isOpen ? '0px' : `-${theme.measures.notificationHeight}`
	}};
	transition: top linear 1s;
`

Carrier.displayName = 'Carrier'
