import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    sub: number;
    role: string;
    exp: number;
}

export function getRoleFromToken(
    token: string
) {

    try {

        const payload =
            jwtDecode<JwtPayload>(token);

        return payload.role;

    } catch {

        return null;

    }

}