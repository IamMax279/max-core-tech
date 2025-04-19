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