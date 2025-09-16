import { connect } from "react-redux";
import { addFriend, deleteFriend, setFollowingInProgress, requestUsers, setCurrentPage,followStatusChange, followUnfollowFlow} from '../../redux/usersReducer'
import Users from './Users';
import React, { useCallback, useEffect, useRef } from 'react';
import { compose } from "redux";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from "../../redux/usersSelectors";
import { UserType } from "../../types/types";
import { RootState } from "../../redux/reduxStore";

// type PropsType = {
//     users: Array<UserType>
//     page:number
//     pageSize: number
//     isFetching:boolean
//     totalUsersCount: number
//     followingInProgress:Array<number>

//     followStatusChange: (user: UserType, shouldFollow: boolean) => void
//     requestUsers: (page:number, pageSize:number) => void   
//     setCurrentPage: (page: number) => void
// }

// class UsersAPIcomponent extends React.Component<PropsType> {
 
//     componentDidMount() {

//         this.props.requestUsers(this.props.page,this.props.pageSize)
//     }

//     onPageChanged = (page: number) => {
//         this.props.requestUsers(page,this.props.pageSize)
//         this.props.setCurrentPage(page)
//     }

//     render() {
//         return (
//             <>
//             <Users
//                 totalUsersCount={this.props.totalUsersCount}
//                 pageSize={this.props.pageSize}
//                 onPageChanged={this.onPageChanged}
//                 isFetching={this.props.isFetching}
//                 currentpage={this.props.page}
//                 users={this.props.users}
//                 followingInProgress = {this.props.followingInProgress}
//                 followStatusChange = {this.props.followStatusChange}
//             />
//             </>
//         )
//     }
// }

function UsersAPIcomponent({ids,pageSize,totalUsersCount,
    page,isFetching,requestUsers,setCurrentPage,}){
    
    // const lastPageRef = useRef(null);
    useEffect(() => {
    // if (lastPageRef.current === page) return;         // тот же page — не запрашиваем снова (фикс StrictMode)
    // lastPageRef.current = page;
    requestUsers({ page, pageSize });
  }, [page, pageSize, requestUsers]);

    const onPageChanged = useCallback((p) => setCurrentPage(p), [setCurrentPage]);


    
    return(
            <Users
                ids = {ids}
                // entities = {entities}
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
                onPageChanged={onPageChanged}
                isFetching={isFetching}
                currentpage={page}
                // users={users}
                followUnfollowFlow={followUnfollowFlow}
            />
    )
}

//addSelectors
const mapStateToProps = (state) => { //: RootState
    return {
        // users: getUsers(state),
        ids:state.usersPage.ids,
        // entities:state.usersPage.entities,
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        page: getCurrentPage(state),
        isFetching: getIsFetching(state),
        // followingInProgress: getFollowingInProgress(state),
    }
}


export default compose(
    connect(mapStateToProps, 
        { addFriend, deleteFriend,setCurrentPage,//в сокращенной записи сюда попадают именно колбеки
        requestUsers,followUnfollowFlow}),
    //withAuthRedirect
)(UsersAPIcomponent)





// const mapDispatchToProps = (dispatch) => {
//     return ({
//         addFriend: (userId) => {
//             /какая-нибудь логика/
//             dispatch(addFriendAC(userId))
//         }, 
//     }
//     )
// }
