import React from 'react'
import { 
  ScreenWrapper,
  TitleScreen,
  OptionsScreen,
  NotFoundScreen
} from './components'


const ScreenRouter = ({screen, ...handlers}) => {
  return <ScreenWrapper>
    {{
      title: <TitleScreen {...handlers}/>,
      options: <OptionsScreen {...handlers} />
      }[screen] || <NotFoundScreen {...handlers} />}
  </ScreenWrapper>

}

export default ScreenRouter
