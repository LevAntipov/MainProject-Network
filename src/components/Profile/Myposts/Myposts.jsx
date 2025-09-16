import classes from './Myposts.module.css'
import Post from './Post/Post';
import React from 'react';
import { AddPostForm } from './AddPostForm';

//const maxLength10 = maxLengthCreator(10)


function Myposts(props) {

    let renderPosts = props.posts.map((item, index) => <Post message={item.message} likesCount={item.likesCount} 
                                                        key = {index}/>)

    console.log('render')
    // let addPostText = (value) => {
    //     props.addPost(value.postText);
    // }

    return (
        <div className={classes['posts-area']}>
            <AddPostForm addPost={props.addPost}/>
            {renderPosts}
        </div>
    )
}

export default Myposts;