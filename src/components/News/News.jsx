import React, { useEffect, useState } from "react";
import classes from './News.module.css'
import { usersAPI } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from './../../redux/reduxStore'
import { requestUsers } from "../../redux/usersReducer";

// function deepCopy(obj) {

//     if (Array.isArray(obj)) {
//         return obj.map(deepCopy) // return obj.map((item) => deepCopy(item))
//     }

//     if (obj === null || obj.__proto__ !== Object.prototype) {
//         return obj // сюда попадет примитивный случай
//     }

//     let copy = {}

//     for (let i in obj) {
//         copy[i] = deepCopy(obj[i])
//     }
//     return copy

// }





function News() {
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(requestUsers({ page: 1, pageSize: 4 }))
    }, [])
    let users = useSelector((state) => state.usersPage.users)
    return (
        // <div className={classes['user-card']}>
        //     <div className={classes['user-icon']}>
        //         <NavLink to={'/profile/' + user.id}>
        //             <img alt="" src={user.photos.small == null ? noPhotoUser : user.photos.small} />
        //         </NavLink>
        //         <div>
        //             {user.followed === true
        //                 ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => (dispatch as any)(followUnfollowFlow({ user, shouldFollow: false }))}>unFollow</button>
        //                 : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => (dispatch as any)(followUnfollowFlow({ user, shouldFollow: true }))}>Follow</button>}
        //         </div>
        //     </div>
        //     {(serverError.userId === user.id)
        //         ? <div><h1>Something wrong!</h1></div>
        //         : <div className={classes['user-info']}>
        //             <div className={classes['user-name']}>
        //                 <div>{user.name}</div>
        //                 <div>{user.status == null ? 'no status' : user.status}</div>
        //             </div>
        //             <div className={classes['user-location']}>
        //                 <div>{"user.location.city"}</div>
        //                 <div>{"user.location.country"}</div>
        //             </div>
        //         </div>}
        // </div>


        

        <div className={classes.userCard}>
            <img className={classes.userImg} src="https://rgo.ru/upload/content_block/images/05ea58e9ad632e4c0ccb746048afe4cd/6409b809f3362efbc6291d259feab33fb.jpg"></img>
            <div>Name</div>
        </div>
    )




    // function useArray(arr) {
    //     const [value, setValue] = useState(arr);
    //     return {
    //         value,
    //         push() {
    //             let newArr = [...value, value.length + 1];
    //             setValue(newArr);
    //         },
    //         removeByIndex(index1) {
    //             setValue(value.filter((item, index) => index !== index1));
    //         }
    //     };
    // }

    // const { value, push, removeByIndex } = useArray([1, 2, 3]);

    // const [flag,setFlag] = useState()
    // useEffect(()=>{
    //     console.log('effect')
    // },[flag])
    // console.log('12')
    // return <div>
    //     {value.map((item, index) => {
    //         return <>
    //             {item}
    //             <button onClick={() => removeByIndex(index)}>Удалить</button>
    //         </>;
    //     })}
    //     <br />
    //     <button onClick={push}>Добавить</button>
    //     <br />
    //     <div>--------------</div>
    //     <span>{String(flag)}</span>
    //     <button onClick={()=>setFlag(!flag)}>Нажми на кнопку</button>
    // </div>;
}



export default News