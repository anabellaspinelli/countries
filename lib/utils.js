export const generateCountrySlug = (country) => {
    return `${country.code}-${country.name.toLowerCase().split(' ').join('-')}`
}
