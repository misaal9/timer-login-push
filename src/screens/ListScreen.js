import React from 'react'
import { connect } from 'react-redux'
import {
  View, Text, Button
} from 'react-native'
import { commonStyles } from '../common/styles'
import { NavigationActions } from 'react-navigation'

class ListScreen extends React.Component {
  renderTimerList () {
    const { timers } = this.props
    const arrTimer = []

    if (!timers) {
      return (<Text>You have not saved any timers yet!</Text>)
    }

    for (const timer in timers) {
      arrTimer.push(timers[timer])
    }

    return arrTimer.map((timer, idx) =><Button key={idx} title={timer.title} onPress={()=>this.selectTimer(timer)} />)
  }

  selectTimer (timerDetails) {
    // TODO: refactor this later. move to NavActions
    const navigateAction = NavigationActions.navigate({
      routeName: 'Timer',
      params: timerDetails
    })
    this.props.navigation.dispatch(navigateAction)
  }

  render () {
    return (
      <View style={commonStyles.view}>
        { this.renderTimerList() }
      </View>
    ) 
  }
}

const mapStateToProps = state => {
  const { timers } = state.login.userDetails.userData
  
  // offline
  // TODO: remove offline code
  // const timers = {
  //   goHome: {
  //     hh: '10',
  //     mm: '20',
  //     title: 'Go home'
  //   },
  //   fullOfficeDay: {
  //     hh: '07',
  //     mm: '30',
  //     title: 'Full day office'
  //   },
  //   tennisTime: {
  //     hh: '02',
  //     mm: '00',
  //     title: 'Tennis time'
  //   }
  // }

  return {
    timers
  }
}

export default connect(mapStateToProps)(ListScreen)