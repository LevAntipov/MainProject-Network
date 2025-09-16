import Profile from './Profile';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserProfile,getUserStatus,updateUserStatus,updateUserPhoto, updateUserProfile } from './../../redux/profileReducer';
import { compose } from 'redux';
import {withParams} from './../../hoc/withParams'
import { useNavigate } from 'react-router';

//import {withAuthRedirect} from './../../hoc/withAuthRedirect'

const ProfileContainer = (props) =>{
    const navigate = useNavigate()
    
    useEffect(()=>{
        let userId = props.profileId
        if (!userId) {
          //  userId=2
        
            userId = props.authorizedUserId
            if(!userId){
                navigate('/login')
                //this.props.history.push('/login')
                return
            }
        }
        props.getUserProfile(userId)
        props.getUserStatus(userId)
        

    },[props.isAuth,navigate])         
        return (
            <div>
                <Profile {...props} profile={props.userProfile} status ={props.userStatus}
                                    updateUserStatus = {props.updateUserStatus} updateUserPhoto={props.updateUserPhoto}
                                    isOwner = {!props.profileId} updateUserProfile={props.updateUserProfile}
                                    authorizedUserId = {props.authorizedUserId} incorrectUrlFormat = {props.incorrectUrlFormat} />
            </div>
        )
    

}

const mapStateToProps = (state) => {
    return {
        userProfile: state.profilePage.userProfile,
        userStatus: state.profilePage.userStatus,
        authorizedUserId: state.auth.userId,
        isAuth:state.auth.isAuth,
        incorrectUrlFormat:state.profilePage.incorrectUrlFormat
    }
}

export default compose(
    connect(mapStateToProps, { getUserProfile,getUserStatus,updateUserStatus,updateUserPhoto,updateUserProfile }),
    withParams,
)(ProfileContainer)

  
{/*class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.profileId
        if (!userId) {
          //  userId=2
        
            userId = this.props.authorizedUserId
            if(!userId){
               
               //this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId)
        this.props.getUserStatus(userId)

    }

    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.userProfile} status ={JSON.stringify(this.props.userStatus)}
                                         updateUserStatus = {this.props.updateUserStatus} />
            </div>
        )
    }

}*/}