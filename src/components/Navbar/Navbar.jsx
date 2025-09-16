import { NavLink } from 'react-router';
import classes from './Navbar.module.css'
//    .module для генерации объекта classes, в котором лежат
//    уникальные идентификаторы для css селлекторов 


function Navbar() {
    // function activity(obj){
    //     if (obj.isActive){
    //         return classes.activeLink
    //     }
    //     else{
    //         return classes.item
    //     }
    // }
    return (
        <nav className={classes.navigation}>
            <div className={classes.bar}>
                <NavLink to='/profile' className={navData => navData.isActive ? classes.activeLink : classes.bar__item}>Profile</NavLink>
            </div>
            {/* <div className={classes.bar}>
                <NavLink to='/dialogs' className={navData => navData.isActive ? classes.activeLink : classes.bar__item}>Messages</NavLink>
            </div> */}
            <div className={classes.bar}>
                <NavLink to='/users' className={({isActive,isPending})=>isActive ? classes.activeLink : isPending ? classes.isPending : classes.bar__item}>Users</NavLink>
            </div>
            <div className={classes.bar}>
                <NavLink to='/news' className={({isActive,isPending})=>isActive ? classes.activeLink : isPending ? classes.isPending : classes.bar__item}>News</NavLink>
            </div>
            {/* <div className={classes.bar}>
                <NavLink to='/music' className={({isActive,isPending})=>isActive ? classes.activeLink : isPending ? classes.isPending : classes.bar__item}>Music</NavLink>
            </div>
            <div className={classes.bar}>
                <NavLink to='/settings' className={navData => navData.isActive ? classes.activeLink : classes.bar__item}>Settings</NavLink>
            </div> */}
        </nav>
    )
}

export default Navbar;