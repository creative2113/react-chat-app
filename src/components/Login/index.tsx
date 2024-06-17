import { Navigate, useNavigate } from "react-router-dom";
import { defaultUserBtnsContainerStyle, errorMessageStyle, goToSignupContainerStyle, goToSignupStyle, loginBtnStyle, loginSampleUsersContainerStyle, loginStyle, loginUidFormStyle, noAccountStyle, userAvatarStyle, userBtnStyle, userNameAndUidContainerStyle, userNameStyle, userUidStyle, usingSampleUsersTextStyle } from "./style";
import { useContext, useEffect, useState } from "react";

import { CometChat } from "@cometchat/chat-sdk-javascript";
import { CometChatThemeContext } from "@cometchat/chat-uikit-react";
import { CometChatUIKit } from "@cometchat/chat-uikit-react"
import { LoginSignup } from "../LoginSignup";
import { TextInput } from "../TextInput";
import { users } from "../../sampleApp/sampledata";

interface ILoginProps {
    loggedInUser : CometChat.User | null | undefined,
    setLoggedInUser : React.Dispatch<React.SetStateAction<CometChat.User | null | undefined>>
    setInterestingAsyncOpStarted : React.Dispatch<React.SetStateAction<boolean>>
};

type User = {
    name : string,
    uid : string,
    avatar : string
};

type UserJson = {
    users : User[]
}

export function Login(props : ILoginProps) {
    const {
        loggedInUser,
        setLoggedInUser,
        setInterestingAsyncOpStarted
    } = props;

    const [uid, setUid] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { theme } = useContext(CometChatThemeContext);
    const [defaultUsers, setDefaultUsers ] = useState<User[]>([]);


    async function fetchDefaultUsers() {
        try {
            const response = await fetch("https://assets.cometchat.io/sampleapp/sampledata.json");
            const data : UserJson = await response.json();
            setDefaultUsers(data.users);
        }
        catch(error) {
            console.log("fetching default users failed, using fallback data", error);
            setDefaultUsers(users.users);
        }
    }

    async function login(uid : string) {
        try {
            setInterestingAsyncOpStarted(true);
            CometChatUIKit.login(uid)?.then(loggedInUser => {

                console.log("Login successful, loggedInUser:", loggedInUser);
                setLoggedInUser(loggedInUser);
                navigate("/home");

            })
        }
        catch(error) {
            console.log("login failed", error);
            if (error instanceof CometChat.CometChatException && error.message) {
                setErrorMessage(error.message);
            }
            console.log(error);
        }
        finally {
            setInterestingAsyncOpStarted(false);
        }
    }

    async function handleLoginWithUidFormSubmit(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await login(uid);
        }
        catch(error) {
            console.log(error);
        }
    }

    function getUserBtnWithKeyAdded({ name, uid, avatar } : User) {
        return (
            <button
                key = {uid}
                onClick = {() => login(uid)}
                style = {userBtnStyle(theme)}
            >
                <img
                    src = {avatar}
                    alt = {`${name}'s avatar`}
                    style = {userAvatarStyle()}
                />
                <span
                    style = {userNameAndUidContainerStyle()}
                >
                    <span
                        style = {userNameStyle(theme)}
                    >
                        {name}
                    </span>
                    <span
                        style = {userUidStyle(theme)}
                    >
                        {uid}
                    </span>
                </span>
            </button>
        );
    }

    function getErrorMessage() {
        if (!errorMessage) {
            return null;
        }
        return (
            <div
                style = {errorMessageStyle(theme)}
            >
                {errorMessage}
            </div>
        );
    }

    useEffect(()=>{
        fetchDefaultUsers();
     return () =>{
        setDefaultUsers([]);
     }
    },[])

    // if (loggedInUser === undefined) {
    //     return null;
    // }

    if (loggedInUser) {
        return <Navigate to = "/home" />;
    }
    return (
        <LoginSignup
            title = "Login to your account"
        >
            <div
                style = {loginStyle()}
            >
                <div
                    style = {loginSampleUsersContainerStyle()}
                >
                    <div
                        style = {usingSampleUsersTextStyle(theme)}
                    >
                        Using our sample users
                    </div>
                    <div
                        style = {defaultUserBtnsContainerStyle()}
                    >
                        {
                            defaultUsers.map(getUserBtnWithKeyAdded)
                        }
                    </div>
                </div>
                <form
                    onSubmit = {handleLoginWithUidFormSubmit}
                    style = {loginUidFormStyle()}
                >
                    <TextInput
                        labelText = "Or else continue with login using UID"
                        placeholderText = "Enter UID here"
                        value = {uid}
                        onValueChange = {setUid}
                        required
                    />
                    <button
                        style = {loginBtnStyle(theme)}
                    >
                        Login
                    </button>
                </form>
                {getErrorMessage()}
                <div
                    style = {goToSignupContainerStyle()}
                >
                    <div
                        style = {noAccountStyle(theme)}
                    >
                        Don't have an account?
                    </div>
                    <button
                        onClick = {() => navigate("/signup")}
                        style = {goToSignupStyle(theme)}
                    >
                        sign up
                    </button>
                </div>
            </div>
        </LoginSignup>
    );
}
