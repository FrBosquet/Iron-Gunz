import React from 'react'
import styled from 'styled-components'

const Img = styled.img`
	width: ${({ size }) => size + 'px'};
`

export const Icon = ({ icon, size }) => (
	<Img size={size} src={`icons/${icon}.png`} />
)

Icon.displayName = 'Icon'
