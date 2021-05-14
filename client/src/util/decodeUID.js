import jwtDecode from 'jwt-decode';

export const uiddecoded = (token) => {
    const {uid} = jwtDecode(token);
    return uid;
}