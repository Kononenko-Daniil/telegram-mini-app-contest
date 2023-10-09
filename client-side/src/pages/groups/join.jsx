import { MainButton, BackButton } from '@twa-dev/sdk/react';
import { animation, animationOptions } from '../../Animations';
import Lottie from "react-lottie";
import TextInput from '../../components/TextInput';
import { useState } from 'react';
import API from "../../api";
import WebApp from "@twa-dev/sdk";
import { useNavigate } from 'react-router-dom';
import React from 'react';

const JoinGroupPage = () => {
    const navigate = useNavigate();

    const [groupId, setGroupId] = useState("");
    const [accessCode, setAccessCode] = useState("");
    const [nickname, setNickname] = useState("");

    const [isLoaded, setIsLoaded] = useState(true);
    const [error, setError] = useState(null);

    const handleJoinGroupClick = async () => {
        const initData = WebApp.initData;
        const joinGroupInput = {
            groupId,
            accessCode,
            nickname
        };

        setIsLoaded(false);

        await API.groups.join(joinGroupInput, initData)
            .then((result) => {
                setIsLoaded(true);
                navigateToGroupById(groupId);
            }, (error) => {
                setIsLoaded(true);
                setError(error);

                WebApp.showAlert(`${error.message}`);
            });
    }

    const navigateToGroupById = (id) => navigate(`/groups/${id}`);
    const navigateHome = () => navigate("/");

    return (
        <div className="center">
            <BackButton onClick={navigateHome} />

            <Lottie
                options={animationOptions(isLoaded ? animation.create_animation :
                    animation.loading_animation)}
                height={"20%"}
                width={"20%"}
                style={{ margin: "10px" }}
            />

            <h1>Join group</h1>

            <TextInput
                style={{ margin: "5px 5px" }}
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
                labelText="Group ID"
                disabled={!isLoaded} />

            <TextInput
                style={{ margin: "5px 5px" }}
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                labelText="Access code"
                disabled={!isLoaded} />

            <TextInput
                style={{ margin: "5px 5px" }}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                labelText="Your nickname"
                disabled={!isLoaded} />

            <MainButton
                text="Join group"
                onClick={handleJoinGroupClick} />
        </div>
    )
}

export default JoinGroupPage;
