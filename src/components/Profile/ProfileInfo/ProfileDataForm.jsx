import React from "react";
import classes from "./ProfileInfo.module.css";
import { useForm } from "react-hook-form";
import { CreateField } from "./../../common/FormsControls/FormsControls";

export const ProfileDataForm = ({ onSubmit, profile, incorrectUrlFormat }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullName: profile.fullName,
      lookingForAJobDescription: profile.lookingForAJobDescription,
      lookingForAJob: profile.lookingForAJob,
      aboutMe: profile.aboutMe,
      contacts: {
        ...profile.contacts,
      },
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.profileInfo}>
      <div>
        <b>Full name</b>:
        <CreateField
          Component="input"
          props={{ className: classes.input }}
          placeholder="What is your name?"
          register={register}
          name="fullName"
          rules={{ required: true }}
        />
        {errors.fullName && (
          <p className={classes.validationError}>Full name is required</p>
        )}
      </div>

      <div>
        <b>Looking for a job</b>:
        <CreateField
          Component="input"
          props={{ type: "checkbox", className: classes.checkbox }}
          register={register}
          name="lookingForAJob"
        />
      </div>

      <div>
        <b>My professional skills</b>:
        <CreateField
          Component="textarea"
          props={{ className: classes.textarea }}
          placeholder="Description"
          register={register}
          name="lookingForAJobDescription"
          rules={{ required: true }}
        />
        {errors.lookingForAJobDescription && (
          <p className={classes.validationError}>Skills are required</p>
        )}
      </div>

      <div>
        <b>About me</b>:
        <CreateField
          Component="input"
          props={{ className: classes.input }}
          placeholder="Write about yourself"
          register={register}
          name="aboutMe"
          rules={{ required: true }}
        />
        {errors.aboutMe && (
          <p className={classes.validationError}>This field is required</p>
        )}
      </div>

      <div>
        <b>Contacts</b>:
        {Object.keys(profile.contacts).map((key) => (
          <div key={key}>
            <span>
              {key}:
              <CreateField
                Component="input"
                props={{ className: classes.input }}
                placeholder={key}
                register={register}
                name={"contacts." + key}
              />
            </span>
            {incorrectUrlFormat &&
              Object.values(incorrectUrlFormat).map((item) =>
                item === key ? (
                  <p key={item} className={classes.validationError}>
                    Incorrect URL
                  </p>
                ) : null
              )}
          </div>
        ))}
      </div>

      <button type="submit" className={classes.saveBtn}>
        Save
      </button>
    </form>
  );
};
