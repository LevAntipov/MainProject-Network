import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './AddPostForm.module.css'

export const AddPostForm = (props) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        mode: 'onChange' //отображение ошибки сразу при печати
    });

    const onSubmit = (data) => props.addPost(data.textOfPost);

    //  console.log(watch("example")); // watch input value by passing the name of it

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)}>

            {/* register your input into the hook by invoking the "register" function */}
            <textarea
                placeholder='write something'
                {...register("textOfPost", {
                    maxLength: 20,
                    required: "this field is required",
                    minLength: 3
                })} 
            />


            {(errors.textOfPost?.type === "maxLength" && <span>Max length is 20 symbols</span>)
                || (errors.textOfPost?.type === "minLength" && <span>Min length is 3 symbols</span>)}

            <button type="submit">send</button>
        </form>
    );
}