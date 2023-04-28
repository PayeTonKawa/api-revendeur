import QRCode from 'qrcode';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export function jwtGenerator(userInfos) {
    const infos = {
        email: userInfos
    }

    return jwt.sign(infos, 'secret');
}