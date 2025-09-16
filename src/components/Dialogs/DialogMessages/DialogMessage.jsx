import React from 'react'
import classes from './DialogMessages.module.css'
import { MessageForm } from './MessageForm'

const DialogMessages = (props) => {

    const MessageItem = (props) => {
        return (
            <div className={classes.dialogs__message__item}>
                {props.message}
            </div>
        )
    }

    let renderMessages = props.messages.map((item, index) => <MessageItem key={index} message={item.message} />)

    return (
        <div className={classes.dialogs__message}>
            <div>
                {renderMessages}
            </div>
           {<MessageForm addMessage={props.addMessage}/>}
        </div>
    )
}

export default DialogMessages;