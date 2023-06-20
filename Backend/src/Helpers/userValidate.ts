import Joi from "joi";

export const userValidateSchema =Joi.object({
    profile_pic:Joi.string(),
    first_name:Joi.string().required(),
    second_name:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().pattern(new  RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,30}$`))
})