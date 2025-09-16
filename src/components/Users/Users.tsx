import React, { FC } from "react";
import preloader from './../../assets/images/loader.svg'
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import { UserType } from "../../types/types";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";
import classes from './Users.module.css'
import { RootState } from "../../redux/reduxStore";
import { PayloadAction } from "@reduxjs/toolkit";

type PropsType = {
    ids:Array<number>,
    // entities: Record<number,UserType>
    totalUsersCount: number
    pageSize: number
    isFetching: boolean
    // users: Array<UserType>
    onPageChanged: (page: number) => void
    // followingInProgress: Array<number>
    currentpage: number
    followUnfollowFlow: (arg:{user:UserType,shouldFollow:boolean}) => void
    serverError: boolean,
}
type followUnfollowFlowType = {
    user: UserType, 
    shouldFollow: boolean 
}
let Users: FC<PropsType> = React.memo(({ ids,totalUsersCount, pageSize, isFetching,
     onPageChanged, currentpage, followUnfollowFlow }) => {
    // @ts-ignore
    //const { serverError } = useSelector(state => state.usersPage)
    
    //const { users } = useSelector((state:RootState) => state.usersPage)
    console.log(`users rerender`)
    return (
        <div className={classes.usersWrapper}>
            <Paginator
                totalItemsCount={totalUsersCount}
                pageSize={pageSize}
                onPageChanged={onPageChanged}
                currentpage={currentpage}
                portionSize={10}
            />
            {/* <button onClick={getUsers}>AddUsers</button>*/}
            <div className={classes.cardsWrapper}>
                {ids.map((id:number)=>{
                    return <UserCard id={id} key={id} isFetching={isFetching}
                            followUnfollowFlow={followUnfollowFlow} 
                        />
                })}
                {/* {users.map((user) => {
                    return (
                        <UserCard user={user} key={user.id} isFetching={isFetching}
                            followingInProgress={followingInProgress} 
                            followUnfollowFlow={followUnfollowFlow} 
                        />
                    )
                })} */}
            </div>



            {/* {isFetching
                ? <img alt="" src={preloader} width={200} height={200} />
                : users.map((u, index) => <User user={u} followingInProgress={followingInProgress}
                    key={index} />)} */}


        </div>
    )
})

export default Users;