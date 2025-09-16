import classes from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './Myposts/MyPostsContainer'

function Profile(props) {

    return (
        <div>
            <ProfileInfo profile = {props.profile} status={props.status} isOwner={props.isOwner}
                        updateUserStatus={props.updateUserStatus} updateUserPhoto={props.updateUserPhoto}
                        updateUserProfile={props.updateUserProfile} authorizedUserId={props.authorizedUserId}
                        incorrectUrlFormat={props.incorrectUrlFormat}/>
            {/* <MyPostsContainer/> */}
        </div>
    )
}

export default Profile;