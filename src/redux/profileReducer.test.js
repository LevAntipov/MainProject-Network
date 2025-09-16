import {profileReducer,addPostActionCreator,deletePostActionCreator} from "./profileReducer";

let state = {
    postsData: [
        { id: 1, message: 'Привет!', likesCount: 0, },
        { id: 2, message: 'Изучаю пропсы', likesCount: 0, },
    ]
}

test('length should be incremented', () => {
    let action = addPostActionCreator('lova lova')
    let newstate = profileReducer(state,action)

    expect(newstate.postsData.length).toBe(3)
});

test('after deliting length of posts should be decremented', () => {
    let action = deletePostActionCreator(1)
    let newstate = profileReducer(state,action)

    expect(newstate.postsData.length).toBe(1)
});

test('message of new post should be correct', () => {
    let action = addPostActionCreator('lova lova')
    let newstate = profileReducer(state,action)

    expect(newstate.postsData[1]).toBe("lova lova")
});