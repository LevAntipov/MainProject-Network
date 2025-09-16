import { NavLink } from 'react-router'
import classes from './DialogChats.module.css'
import { useStore } from 'react-redux'

function DialogChats() {

    // Нужно будет исправить, DialogChats - презентационная компонента, сюда не должен приходить store
    // Либо обернуть выше в контейнер, либо еще что-то
    //let dialogs = props.store.getState().messagesPage.dialogsData
    const store = useStore()
    let dialogs = store.getState().messagesPage.dialogsData
    
    
    const ChatItem = (props) => {
        return (
            <div className={classes.dialogs__chat__item}>
                <div className={classes.dialogs__chat__item__img}>
                  {/*  <img src={props.avatar} />*/}
                </div>
                <div>
                    <NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink>
                </div>
            </div>
        )
    }

    let renderDialogs = dialogs.map((item,index) => <ChatItem name={item.name} id={item.id} 
                                                                avatar={item.avatar} key ={index} />)

    return (
        <div className={classes.dialogs__chat}>
            {renderDialogs}
        </div>
    )
}

export default DialogChats;