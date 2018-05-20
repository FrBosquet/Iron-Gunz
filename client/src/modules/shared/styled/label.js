import styled from 'styled-components'

export const Label = styled.span`
	color: ${props => props.theme.color[props.color || 'lightGrey']};
	font-family: ${props => props.theme.font.main};
	font-weight: ${props => (props.bold ? 'bold' : 'regular')};
	padding-left: ${props => (props.padded ? '8px' : 0)};
`

Label.displayName = 'Label'
