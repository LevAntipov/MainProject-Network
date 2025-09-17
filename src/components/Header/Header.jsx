import { NavLink } from 'react-router';
import book from './book.png'
import classes from './Header.module.css'
import noPhotoUser from './../../assets/images/noPhotoUser.jpg'

function Header(props) {
    return (
        <header className={classes.header}>
            <img src={book}></img>
            <div className={classes.loginBlock}>
                <div className={classes.userPersonality}>
                    {/* {props.avatar ? <img src={props.avatar} /> : <img src={noPhotoUser} />} */}
                    {props.isAuth ? (props.avatar ? <img src={props.avatar} /> : <img src={noPhotoUser} />) : ""}
                    <NavLink to='/profile'>{props.login}</NavLink>
                </div>
                {props.isAuth
                    ? <div>
                        <button className={classes.headerBtn} onClick={props.logout}>logout</button>
                    </div>
                    : <button className={classes.headerBtn}> <NavLink to='/login'>login</NavLink> </button> }
            </div>
        </header>
    )
}

export default Header;