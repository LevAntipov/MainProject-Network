import messagesReducer from "./messagesReducer";
import profileReducer from "./profileReducer";

let store = {
    // _ это приватность, обращение к такой переменной извне - не рекомендуется
    _state: {
        profilePage: {
            profilePrivateData: {
                birthsday: "04.06.2002",
                location: "Moscow",
                education: "Student",
            },
            postsData: [
                { id: 1, message: 'Привет!', likesCount: 0, },
                { id: 2, message: 'Изучаю пропсы', likesCount: "0", },
            ],
            newPostText: "",
        },
        messagesPage: {
            dialogsData: [
                { id: 1, name: 'Leva', avatar: 'https://zoographia.ru/upload/iblock/af2/17afy2pp1f6cqh1vu6z9q2oi5bxy0li5.jpg', },
                { id: 2, name: 'Vanya', avatar: 'https://blog.okko.tv/thumb/1420x0/filters:quality(75):no_upscale()/imgs/2023/07/06/17/5976722/b7c66c53a71db1bd07f1a94c100d24e06c700ef3.webp', },
                { id: 3, name: 'Boris', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzWFzDp55478PcJs7JyOW7ACDY4jndrIIo2Q&s', },
                { id: 4, name: 'Sasha', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUFkYT274W_wxuAdE5YXSHS3kn53axaJZXAA&s' },
                { id: 5, name: 'Artem', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi0H_B1tfjkAapdAdeQTXP0Gxfa5-vXHp6Eg&s' },
            ],
            messagesData: [
                { id: 1, message: "Hi" },
                { id: 2, message: "How are you" },
                { id: 3, message: "You'r looking good" },
            ],
            newMessageText: "",
        },
    },
    _rerenderTree() {
    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._rerenderTree = observer;
    },

    dispatch(action) {
        
        this._state.profilePage = profileReducer(this._state.profilePage,action);
        this._state.messagesPage = messagesReducer(this._state.messagesPage,action);

        this._rerenderTree(this._state)
    }
}






export default store;