import { addPostActionCreator } from '../../../redux/profileReducer';
import Myposts from './Myposts';
import { connect } from 'react-redux';



const mapStateToProps = (state) =>{
    return{
        posts:state.profilePage.postsData,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        addPost: (postText)=>{
            dispatch(addPostActionCreator(postText))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(Myposts)

export default MyPostsContainer;