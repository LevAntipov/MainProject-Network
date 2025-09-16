import classes from './Post.module.css'

function Post(props) {
    return (
        <div className={classes.item}>
            <div>
                <img src="https://www.shutterstock.com/image-vector/cartoon-insect-happy-bug-cute-600nw-2508704967.jpg" alt="" />
                {props.message}
            </div>
            <div>
                <span>{props.likesCount} likes</span>
            </div>
        </div>

    )
}

export default Post;