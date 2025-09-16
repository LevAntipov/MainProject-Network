import classes from "./ProfileInfo.module.css"
import settingsIcon from './../../../assets/images/settingsIcon.png'
import { useForm } from 'react-hook-form';
import { CreateField } from './../../common/FormsControls/FormsControls'

export const ProfileDataForm = ({ onSubmit, profile, incorrectUrlFormat }) => {

    //Монумент глупости (формирование объекта из двух массивов)
    // let arrayKeys = Object.keys(profile.contacts)
    // let arraykeysValue = arrayKeys.map((key) => profile.contacts[key])
    // const obj = arrayKeys.reduce((acc, key, index) => {
    //     acc[key] = arraykeysValue[index]
    //     return acc
    // }, {})
    // console.log(obj)


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onChange', //отображение ошибки сразу при печати,
        defaultValues: {
            fullName: profile.fullName,
            lookingForAJobDescription: profile.lookingForAJobDescription,
            lookingForAJob: profile.lookingForAJob,
            aboutMe: profile.aboutMe,
            contacts: {
                ...profile.contacts
            }
        }
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes['profile-info']}>
            <div>
                <b>Full name</b>:
                <CreateField Component='input' props={{}}
                    placeholder='What is your name?' register={register} name="fullName"
                    rules={{
                        required: true,
                    }}
                />
            </div>
            <div>
                <b>Looking for a job</b>:
                <CreateField Component='input' props={{ type: 'checkbox' }}
                    placeholder='' register={register} name="lookingForAJob"
                    rules={{

                    }}
                />
            </div>
            <div>
                <b>My professional skills</b>:
                <CreateField Component='textarea'
                    placeholder='Description' register={register} name="lookingForAJobDescription"
                    rules={{
                        required: true,
                    }}
                />
            </div>
            <div>
                <b>About me</b>:
                <CreateField Component='input'
                    placeholder='Write about yourself' register={register} name="aboutMe"
                    rules={{
                        required: true,
                    }}
                />
            </div>
            <div>
                <b>Contacts</b>:
                {Object.keys(profile.contacts).map((key) => {
                    return (<div key={key}>
                        <span>{key}:
                            <CreateField Component='input'
                                placeholder={key} register={register} name={"contacts." + key} //Так пишется, чтобы на сервак отправлялся ОБЪЕКТ
                            />
                        </span>
                        {Object.values(incorrectUrlFormat).map((item) => {
                            if (item == key) {
                                return <p className={classes.validationError}>Incorrect URL</p>
                            }
                            
                        })}
                    </div>)
                })}
            </div>
            <button>Save</button>
        </form>
    )
}

// function Contact({ contactTitle, contactValue }) {
//     return <div><span className={classes.contact}>{contactTitle}: {contactValue}</span></div>
// }