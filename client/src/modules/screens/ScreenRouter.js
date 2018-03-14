import React from 'react'
import { ScreenWrapper } from './components'
import { 
  AboutScreen,
  TitleScreen,
  OptionsScreen,
  LobbyScreen,
  NotFoundScreen
} from './screens'

const withProps = (Component, props) => <Component {...props} />

const routeScreen = (screen, handlers) => {
  let ScreenComponent = {
    title: TitleScreen,
    lobby: LobbyScreen,
    options: OptionsScreen,
    about: AboutScreen
  }[screen]

  ScreenComponent = ScreenComponent || NotFoundScreen
  return <ScreenComponent {...handlers}/>
}

const ScreenRouter = ({screen, ...handlers}) => {
  return <ScreenWrapper>
    {routeScreen(screen, handlers)}
  </ScreenWrapper>
}

export default ScreenRouter
