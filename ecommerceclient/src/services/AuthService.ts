import cookies from "js-cookie"
import axios from "axios"

export class AuthService {
    static async getJwt(): Promise<string | undefined> {
        const jwt = cookies.get('jwt')
        if(jwt) {
            return jwt
        } else {
            const refresh = this.getRefresh()
            if(refresh) {
                const res = await axios.post(
                    "/api/user/refresh-token",
                    {refresh}
                )
                if(res.data.accessToken) {
                    this.setJwt(res.data.accessToken)
                    return res.data.accessToken
                } else {
                    return undefined
                }
            } else {
                return undefined
            }
        }
    }

    static getRefresh(): string | undefined {
        return cookies.get('refresh')
    }

    static setJwt(token: string): void {
        cookies.set('jwt', token, {
            expires: 1 / 48,
            secure: true,
            sameSite: 'strict',
            path: '/'
        })
        document.dispatchEvent(new CustomEvent('cookieChange'))
    }

    static setRefresh(token: string): void {
        cookies.set('refresh', token, {
            expires: 7,
            secure: true,
            sameSite: 'strict',
            path: '/'
        })
        document.dispatchEvent(new CustomEvent('cookieChange'))
    }

    static removeJwt(): void {
        cookies.remove('jwt')
        document.dispatchEvent(new CustomEvent('cookieChange'))
    }

    static removeRefresh(): void {
        cookies.remove('refresh')
        document.dispatchEvent(new CustomEvent('cookieChange'))
    }

    static async retrievePayload(claim: string): Promise<string | undefined> {
        const token = await this.getJwt()
        if(!token) {
            return undefined
        }

        const payload = JSON.parse(atob(token.split('.')[1]))
        return payload[claim]
    }

    static logout(): void {
        this.removeJwt()
        this.removeRefresh()
    }
}