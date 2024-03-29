import { CircularProgress, Typography } from "@mui/material";
import Unlock from "../components/unlock";
import icon from "../../public/logo.png"
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../consfig";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atom/user";
import { useNavigate } from "react-router-dom";
import LandingPageNavBar from "../components/LandingPageNav";
export default function LandingPage() {
    const navigate = useNavigate()
    const currentUser = useSetRecoilState(userState)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [usernameCookie, setUsernameCookie] = useState<string | null>(null)
    const [passwordCookie, setPasswordCookie] = useState<string | null>(null)
    const getCookie = (name: string) => {
        const cookies = document.cookie.split(";")
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=')
            if (cookieName.trim() === name) {
                return decodeURIComponent(cookieValue)
            }
        }
        return null
    }
    useEffect(() => {
        const init = async () => {
            const usernamecookievalue = getCookie("username")
            const passwordCookievalue = getCookie("password")
            if (!usernamecookievalue || !passwordCookievalue) {
                setIsLoading(false)
            }
            else {
                setUsernameCookie(usernamecookievalue)

                setPasswordCookie(passwordCookievalue)

                const res = await axios.post(`${BASE_URL}/unlock`, {
                    username: usernameCookie,
                    password: passwordCookie
                })
                if (res.data) {
                    if (res.data.id && res.data.username) {
                        currentUser({
                            id: res.data.id,
                            username: res.data.username
                        })
                        navigate(`/dashboard`)
                    }
                    else {

                        setIsLoading(false)
                    }
                }
                else {

                    setIsLoading(false)
                }
            }
        }

        init()

    }, [usernameCookie, passwordCookie])
    if (isLoading) {
        return <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
                <LandingPageNavBar />
                <hr />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: "center", height: "101vh", gap: "4rem" }}>
                <CircularProgress />
            </div>
        </div>
    }
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
                <LandingPageNavBar />
                <hr />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: "center", height: "101vh", gap: "4rem" }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "50%" }}>
                        <img src={icon} alt="" style={{ width: "100%" }} />
                    </div>
                    <div>
                        <Typography variant="h2">Bud Ping</Typography>
                    </div>
                </div>
                <div>
                    <Unlock />
                </div>
            </div>
        </div>
    )
}