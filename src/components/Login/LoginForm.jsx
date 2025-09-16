import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { CreateField } from './../common/FormsControls/FormsControls'
import classes from './LoginForm.module.css'

export const LoginForm = ({ login, validationMessage,captchaUrl }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm({
        mode: 'onChange' //отображение ошибки сразу при печати
    });

    const onSubmit = async (data) => {

        const response = await login({email:data.email,password: data.password,captchaValue:data.captchaValue})
        if (response === 1) {
            setError('root.serverError', {
                type: 1,
                message: "invalid email or password"
            })
        }

        if (response === 10) {
            setError('root.serverError', {
                type: 1,
                message: "anti-bot captcha"
            })
        }

    };
    //  console.log(watch("example")); // watch input value by passing the name of it

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form className={classes.loginForm} onSubmit={handleSubmit(onSubmit)}>
            <CreateField Component='input' className={classes.loginInput}
                placeholder='email' register={register} name="email"
                rules={{
                    required: "email is required",
                }}
            />

            {/* {errors.email?.type === "required" && (
                <span role="alert">{errors.email.message}</span>
            )} */}
            {errors?.email && <p>{errors?.email.message || "Error!"}</p>}

            <CreateField Component='input' className={classes.loginInput}
                placeholder='password' register={register} name="password"
                rules={{
                    required: "password is required",
                    minLength: {
                        value: 6,
                        message: "Min 6 symbols"
                    }
                }}
            />

            {errors?.password && <p>{errors?.password.message || "Error!"}</p>}

            {captchaUrl && <img src={captchaUrl}></img>}
            {captchaUrl && 
                    <CreateField Component='input' className={classes.loginInput}
                        placeholder='Captcha value' register={register} name="captchaValue"
                        rules={{
                            required: true,
                        }}
                    />}

            <button className={classes.loginButton} type="submit">send</button>

            {/* {!isValidData && <p>Incorrect password or login</p>} */}
            {/* {errors?.root?.serverError && <p>{errors?.root?.serverError.message}</p>} */}
            {validationMessage && <p className={classes.validationError}>{validationMessage}</p>}
        </form>
    );
}