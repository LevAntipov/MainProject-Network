import React, { FC, useState } from 'react'
import { UserType } from '../../types/types'
import classes from './UserCard.module.css'
import noPhotoUser3 from './../../assets/images/noPhotoUser3.png'
import noPhotoUser2 from './../../assets/images/noPhotoUser2.png'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/reduxStore'
import { NavLink } from 'react-router'

type PropsType = {
    // user: UserType
    id:number
    // index:number
    isFetching: boolean
    followUnfollowFlow: (arg: followUnfollowFlowType) => void
}
type followUnfollowFlowType = {
    user: UserType,
    shouldFollow: boolean
}


const UserCard: FC<PropsType> = React.memo(({isFetching, followUnfollowFlow,id }) => {

    const [subMode, setSubMode] = useState(false)
    const dispatch = useDispatch()
    let user = useSelector((state:RootState)=> state.usersPage.entities[id])
    let isBusy = useSelector((state:RootState)=> state.usersPage.followingInProgress.includes(user.id))
    console.log(`userCard rerender ${user.id}`)


    function followUnfollowClick() {
        if (user.followed) {
            (dispatch as any)(followUnfollowFlow({ user: user, shouldFollow: false }))
        } else {
            (dispatch as any)(followUnfollowFlow({ user: user, shouldFollow: true }))
        }
    }

    function onMouseEnter(e:any){
        setSubMode(true)
        console.log(e.target)
    }

    return (
        <div className={`${classes.card} ${isFetching ? classes.smLoading : ""}`}>
            <div className={`${classes.cardImgWrapper} ${classes.smCardImgWrapper}`}>
                {isFetching
                    ? <div className={classes.smPrimaryItem}></div>
                    : <img className={classes.cardImg} src={user.photos.large ?? noPhotoUser3}></img>
                }
            </div>
            <div className={classes.cardBody} onMouseEnter={() => setSubMode(true)} onMouseLeave={() => setSubMode(false)}>
                {(subMode && !isFetching)
                    ? <div className={`${classes.cardDetails}`}>
                        <NavLink to={'/profile/' + user.id}>
                            <button className={classes.learnMoreButton} >learn more</button>
                        </NavLink>
                        <button onClick={followUnfollowClick} disabled={isBusy}
                        className={user.followed ? classes.unfollowButton : classes.followButton}>
                            {user.followed ? "unfollow" : "follow"}
                        </button>
                    </div>
                    : <div className={classes.cardDetails}>
                        <p className={`${classes.cardName} ${isFetching ? classes.smSecondaryItem : ""}`}>{user.name}</p>
                        <p className={`${classes.cardStatus} ${isFetching ? classes.smSecondaryItem : ""}`}>{user.status ?? "no status"}</p>
                    </div>
                }
            </div>
        </div>
    )
})


export default UserCard