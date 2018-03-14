import React from 'react'
import { ScreenWrapper } from './components'
import { 
  TitleScreen,
  OptionsScreen,
  NotFoundScreen
} from './screens'

const withProps = (Component, props) => <Component {...props} />

const routeScreen = (screen, handlers) => {
  let ScreenComponent = {
    title: TitleScreen ,
    options: OptionsScreen
  }[screen]

  ScreenComponent = ScreenComponent || NotFoundScreen
  // const screenWithHandlers = withProps(screenComponent || NotFoundScreen, handlers)
  return <ScreenComponent {...handlers}/>
}

const ScreenRouter = ({screen, ...handlers}) => {
  return <ScreenWrapper>
    {routeScreen(screen, handlers)}
  </ScreenWrapper>
}

export default ScreenRouter
