import classes from "./ProfileInfo.module.css"
import React, {useState} from "react"
import preloader from './../../../assets/images/loader.svg'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks"
import noPhotoUser from "./../../../assets/images/noPhotoUser3.png"
import settingsIcon from './../../../assets/images/settingsIcon.png'
import { ProfileDataForm } from "./ProfileDataForm"

//updateUserPhoto

function ProfileInfo(props) {

    const [editMode, setEditMode] = useState(false)

    const savePhoto = (e) => {
        props.updateUserPhoto(e.target.files[0])
    }

    const onSubmit = async(data) => {
        let response = await props.updateUserProfile(data, setEditMode, props.authorizedUserId)
        if(response){
            setEditMode(false)
        }
    };

    if (!props.profile) {
        return <img src={preloader} />
    }

    return (
        <div className={classes.profile}>
            <div>
                <img className={`${classes.profile__img} ${classes.profile__item}`} src={props.profile.photos.large || noPhotoUser}></img>
                {props.isOwner && <input type="file" onChange={savePhoto} />}
            </div>

            {editMode
                    ? <ProfileDataForm onSubmit={onSubmit} profile={props.profile} incorrectUrlFormat={props.incorrectUrlFormat}/>
                    :<ProfileBlock profile={props.profile} status={props.status} updateUserStatus={props.updateUserStatus} />}
            
            <div>
                {props.isOwner && !editMode &&<img src={settingsIcon} onClick={()=>setEditMode(true)} width={50}/>}
                {editMode&& <button onClick={()=>setEditMode(false)}>Save</button>}
            </div>
        </div>
    )
}

function ProfileBlock(props) {
    return (
        <div className={classes['profile-info']}>
            <div >
                <b>{props.profile.fullName}</b>
            </div>
            <div>
                <b>About me</b>: {props.profile.aboutMe || "пока пусто"}
            </div>
            <div>
                <b>Looking for a job </b>: {props.profile.lookingForAJob ? "yes" : "пока пусто"}
                {props.profile.lookingForAJob &&
                    <div><b>My professional skills </b>: {props.profile.lookingForAJobDescription}</div>}
            </div>
            <div>
                <b>Contacts:</b>
                {Object.keys(props.profile.contacts).map(key => {
                    if (props.profile.contacts[key]) {
                        return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]} />
                    }
                })}
            </div>
            <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus} />
        </div>
    )
}

function Contact({ contactTitle, contactValue }) {
    return <div><span className={classes.contact}>{contactTitle}: {contactValue}</span></div>
}
//.replace(/\\"/g, '').replace(/"/g, '')
export default ProfileInfo