import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {

  const style = {
    color: 'white',
    background: props.notification.type === 'error' ? 'crimson' : 'darkgreen',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (props.notification.message) {
    return (
      <div style={style}>
        {props.notification.message}
      </div>
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
