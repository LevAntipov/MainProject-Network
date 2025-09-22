import React, { FC } from "react";
import noPhotoUser from './../../assets/images/noPhotoUser.jpg'
import classes from './Users.module.css'
import { NavLink } from "react-router";
import { UserType } from "../../types/types";
import { followUnfollowFlow } from "../../redux/usersReducer";
import { useDispatch, useSelector } from "react-redux";

type PropsType = {
    user: UserType
    // index:number
    key: number
    followingInProgress: Array<number>
}

let User: FC<PropsType> = ({ user, key, followingInProgress }) => {

    const dispatch = useDispatch()
    // @ts-ignore
    const { serverError } = useSelector(state => state.usersPage)
    
    return (
        <div className={classes['user-card']}>
            <div className={classes['user-icon']}>
                <NavLink to={'/profile/' + user.id}>
                    <img alt="" src={user.photos.small == null ? noPhotoUser : user.photos.small} />
                </NavLink>
                <div>
                    {user.followed === true
                        ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => (dispatch as any)(followUnfollowFlow({ user, shouldFollow: false }))}>unFollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => (dispatch as any)(followUnfollowFlow({ user, shouldFollow: true }))}>Follow</button>}
                </div>
            </div>
            {(serverError.userId === user.id)
                ? <div><h1>Something wrong!</h1></div>
                : <div className={classes['user-info']}>
                    <div className={classes['user-name']}>
                        <div>{user.name}</div>
                        <div>{user.status == null ? 'no status' : user.status}</div>
                    </div>
                    <div className={classes['user-location']}>
                        <div>{"user.location.city"}</div>
                        <div>{"user.location.country"}</div>
                    </div>
                </div>}

        </div>
    )





}

export default User;