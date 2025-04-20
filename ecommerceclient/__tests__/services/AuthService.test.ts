import { AuthService } from "@/services/AuthService";
import cookies from "js-cookie";
import axios from "axios";

jest.mock("js-cookie", () => ({
    get: jest.fn(),
    set: jest.fn(),
    remove: jest.fn(),
}))

jest.mock("axios")

describe("AuthService", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe("getJwt", () => {
        test("returns jwt when available in cookies", async () => {
            (cookies.get as jest.Mock).mockReturnValue("test-token")

            const result = await AuthService.getJwt()

            expect(result).toBe("test-token")
            expect(cookies.get).toHaveBeenCalledWith("jwt")
        })

        test("return jwt when only refresh token is present", async () => {
            (cookies.get as jest.Mock).mockImplementation((key) => {
                if (key === "jwt") return undefined
                if(key === "refresh") return "refresh-token"
                return undefined
            })

            jest.spyOn(AuthService, "getRefresh").mockReturnValue("refresh-token");

            (axios.post as jest.Mock).mockResolvedValue({
                data: {accessToken: 'new-access-token'}
            })

            const setJwtSpy = jest.spyOn(AuthService, 'setJwt');
    
            const result = await AuthService.getJwt();
            
            expect(result).toBe('new-access-token');
            expect(cookies.get).toHaveBeenCalledWith('jwt');
            expect(AuthService.getRefresh).toHaveBeenCalled();
            expect(axios.post).toHaveBeenCalledWith(
                '/api/user/refresh-token',
                { refresh: 'refresh-token' }
            );
            expect(setJwtSpy).toHaveBeenCalledWith('new-access-token');
        })
    })

    describe("logout", () => {
        test("removes cookies and dispatches logout event", () => {
            const dispatchEventSpy = jest.spyOn(document, "dispatchEvent");

            AuthService.logout()

            expect(cookies.remove).toHaveBeenCalledWith("jwt")
            expect(cookies.remove).toHaveBeenCalledWith("refresh")
            expect(dispatchEventSpy).toHaveBeenCalled()
            const eventArg = dispatchEventSpy.mock.calls[0][0]
            expect(eventArg.type).toBe("cookieChange")
        })
    })
})