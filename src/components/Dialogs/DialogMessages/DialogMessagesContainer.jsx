import { addMessage } from '../../../redux/messagesReducer'
import DialogMessage from './DialogMessage'
import { connect } from 'react-redux'


const mapStateToProps = (state) => {
    return {
        messages: state.messagesPage.messagesData,
        newMessageText: state.messagesPage.newMessageText,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addMessage: (message) => {
            dispatch(addMessage(message))
        },
    }
}

const DialogMessagesContainer = connect(mapStateToProps,mapDispatchToProps)(DialogMessage)


export default DialogMessagesContainer;