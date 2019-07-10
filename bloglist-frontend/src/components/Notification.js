import React from 'react'
import { connect } from 'react-redux'
import { Message, Icon } from 'semantic-ui-react'

const Notification = (props) => {

  const notification = props.notification

  if (notification.message) {
    if (notification.type === 'error') {
      return (
        <Message icon negative>
          <Icon name='frown outline' />
          <Message.Content>
            <Message.Header>Oops!</Message.Header>
            {props.notification.message}
          </Message.Content>
        </Message>
      )
    }
    return (
      <Message icon positive>
        <Icon name='smile outline' />
        <Message.Content>
          <Message.Header>Excellent!</Message.Header>
          {props.notification.message}
        </Message.Content>
      </Message>
    )
  }

  return null
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps, null)(Notification)
