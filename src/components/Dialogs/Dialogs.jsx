import classes from './Dialogs.module.css'
import DialogChats from './DialogChats/DialogChats';
import DialogsMessagesContainer from './DialogMessages/DialogMessagesContainer';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from "redux";




function Dialogs(props) {
    return (
        <div className={classes.dialogs}>

            <DialogChats />
            <DialogsMessagesContainer />

        </div>
    );
}

let mapStateToProps = (state) => {
    return {

    }
}

//let AuthRedirectComponent = withAuthRedirect(Dialogs)
//let DialogsContainer = connect(mapStateToProps, {})(AuthRedirectComponent)

export default compose(
    connect(mapStateToProps, {}),
    withAuthRedirect
)(Dialogs);