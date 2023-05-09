import jwt from 'jsonwebtoken';


export function jwtGenerator(userEmail) {
    const SECRET = process.env.JWT_SECRET
    const infos = {
        email: userEmail
    }

    return jwt.sign(infos, SECRET);
}