import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number,
    PRODUCTS_MICROSERVICES_HOST: string,
    PRODUCTS_MICROSERVICES_PORT: number
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    PRODUCTS_MICROSERVICES_HOST: joi.string().required(),
    PRODUCTS_MICROSERVICES_PORT: joi.number().required()
})
    .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
    throw new Error("Config validation error");
}
const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    products_microservices_host: envVars.PRODUCTS_MICROSERVICES_HOST,
    products_microservices_port: envVars.PRODUCTS_MICROSERVICES_PORT

}
