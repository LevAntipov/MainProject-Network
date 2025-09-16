import React, { useState } from "react"

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateUserStatus(this.state.status)
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps, prevStatus) {
        if (prevProps.status != this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }


    render() {
        return (
            <div>
                {(!this.state.editMode)
                    ? <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
                    </div>
                    : <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status} />
                    </div>}
            </div>
        )
    }
}


/*const ProfileStatus = (props) => {
    
    const [localState, setLocalState] = useState({
        editMode: false,
        status: props.status
    })

    const activateEditMode = () => {
        setLocalState({
            ...localState,
            editMode: true
        })
    }

    const deactivateEditMode = () => {
        setLocalState({
            ...localState,
            editMode: false
        })
        props.updateUserStatus(localState.status)
    }

    const onStatusChange = (e) => {
        setLocalState({
            ...localState,
            status: e.currentTarget.value
        })
    }


    return (
        <div>
            {(!localState.editMode)
                ? <div>
                    <span onDoubleClick={activateEditMode}>{props.status || "Пусто"}</span>
                </div>
                : <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={localState.status} />
                </div>}
        </div>
    )
}*/

export default ProfileStatus