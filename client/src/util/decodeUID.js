import jwtDecode from 'jwt-decode';

export const uiddecoded = (token) => {
    const {uid} = jwtDecode(token);
    return uid;
}

export const emaildecoded = (token) => {
    const {email} = jwtDecode(token);
    return email;
}

export const providerdecode = (token) => {
    const {provider} = jwtDecode(token);
    return provider;
}