import { model, Schema } from "mongoose";
import { ICountry, IUser } from "../types/db";

const countrySchema = new Schema<ICountry>({
    name: { type: String, required: true }
})

export const Country = model<IUser>('country', countrySchema)