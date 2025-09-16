import { useForm, SubmitHandler } from 'react-hook-form';

export const MessageForm = (props) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: 'onChange' //отображение ошибки сразу при печати
    });

    const onSubmit = (data) => {
        props.addMessage(data.text)
        reset()
    };

    //  console.log(watch("example")); // watch input value by passing the name of it

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)}>

            {/* register your input into the hook by invoking the "register" function */}
            <textarea
                placeholder='write something'
                {...register("text", {
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