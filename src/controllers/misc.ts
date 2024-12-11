import { Country } from "../models/country"

export const getCountries = async () => {
    return await Country.find().select('_id name')
}