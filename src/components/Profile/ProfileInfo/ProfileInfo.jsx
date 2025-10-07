import React, { useState } from "react";
import classes from "./ProfileInfo.module.css";
import preloader from "./../../../assets/images/loader.svg";
import noPhotoUser from "./../../../assets/images/noPhotoUser3.png";
import settingsIcon from "./../../../assets/images/settingsIcon.png";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import { ProfileDataForm } from "./ProfileDataForm";
import { NavLink } from "react-router";

function ProfileInfo(props) {
    const [editMode, setEditMode] = useState(false);

    const savePhoto = (e) => {
        if (e.target.files && e.target.files.length) {
            props.updateUserPhoto(e.target.files[0]);
        }
    };

    const onSubmit = async (data) => {
        let response = await props.updateUserProfile(
            data,
            setEditMode,
            props.authorizedUserId
        );
        if (response) {
            setEditMode(false);
        }
    };

    if (!props.profile) {
        return <SkeletonProfile />;
    }

    return (
        <div className={classes.profile}>
            {/* Фото */}
            <div className={classes.avatarWrapper}>
                <img
                    className={classes.avatar}
                    src={props.profile.photos.large || noPhotoUser}
                    alt="avatar"
                />
                {props.isOwner && (
                    <div>
                        <label className={classes.uploadBtn}>
                            Загрузить фото
                            <input type="file" onChange={savePhoto} hidden />
                        </label>
                    </div>
                )}
                <ProfileStatusWithHooks
                    status={props.status}
                    updateUserStatus={props.updateUserStatus}
                />
            </div>

            {/* Информация */}
            <div className={classes.infoWrapper}>
                {editMode ? (
                    <ProfileDataForm
                        onSubmit={onSubmit}
                        profile={props.profile}
                        incorrectUrlFormat={props.incorrectUrlFormat}
                    />
                ) : (
                    <ProfileBlock
                        profile={props.profile}
                        status={props.status}
                        updateUserStatus={props.updateUserStatus}
                    />
                )}

                {/* Кнопки */}
                {props.isOwner && (
                    <div className={classes.settingsWrapper}>
                        {!editMode &&
                            <img
                                src={settingsIcon}
                                onClick={() => setEditMode(true)}
                                width={40}
                                alt="settings"
                                className={classes.settingsIcon}
                            />
                        }
                    </div>
                )}
                {!props.isOwner &&
                    <NavLink to='/users'>
                        <button className={classes.backToUsersBtn}>Вернуться к просмотру пользователей</button>
                    </NavLink>}
            </div>
        </div>
    );
}

function ProfileBlock(props) {
    return (
        <div className={classes.profileInfo}>
            <h2 className={classes.fullName}>{props.profile.fullName}</h2>

            <div>
                <b>Обо мне:</b> {props.profile.aboutMe || "пока пусто"}
            </div>

            <div>
                <b>Ищу работу:</b> {props.profile.lookingForAJob ? "Да" : "Нет"}
                {props.profile.lookingForAJob && (
                    <div>
                        <b>Мои навыки:</b> {props.profile.lookingForAJobDescription}
                    </div>
                )}
            </div>

            <div>
                <b>Контакты:</b>
                <div className={classes.contacts}>
                    {Object.keys(props.profile.contacts).map((key) => {
                        if (props.profile.contacts[key]) {
                            return (
                                <Contact
                                    key={key}
                                    contactTitle={key}
                                    contactValue={props.profile.contacts[key]}
                                />
                            );
                        }
                        return null;
                    })}
                </div>
            </div>
        </div>
    );
}

function Contact({ contactTitle, contactValue }) {
    return (
        <div className={classes.contact}>
            <span>
                <b>{contactTitle}:</b> {contactValue}
            </span>
        </div>
    );
}

export const SkeletonProfile = () => {
    return (
        <div className={classes.profile}>
            <div className={classes.avatarWrapper}>
                <div className={`${classes.skeleton} ${classes.skeletonAvatar}`}></div>
                <div className={`${classes.skeleton} ${classes.skeletonLine} short`}></div>
            </div>
            <div className={classes.infoWrapper}>
                <div className={`${classes.skeleton} ${classes.skeletonLine}`}></div>
                <div className={`${classes.skeleton} ${classes.skeletonLine}`}></div>
                <div className={`${classes.skeleton} ${classes.skeletonLine}`}></div>
                <div className={`${classes.skeleton} ${classes.skeletonLine} short`}></div>
            </div>
        </div>
    );
};

export default ProfileInfo;
