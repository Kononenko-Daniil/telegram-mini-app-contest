import { MainButton, BackButton } from '@twa-dev/sdk/react';
import { animation, animationOptions } from '../../Animations';
import Lottie from "react-lottie";
import TextInput from '../../components/TextInput';
import { useState } from 'react';
import API from "../../api";
import WebApp from "@twa-dev/sdk";
import { useNavigate } from 'react-router-dom';

const CreateGroupPage = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [accessCode, setAccessCode] = useState("");
    const [ownerNickname, setOwnerNickname] = useState("");

    const [isLoaded, setIsLoaded] = useState(true);
    const [error, setError] = useState(null);

    const handleCreateGroupClick = async () => {
        const groupInput = {
            name,
            description,
            accessCode,
            ownerNickname
        };

        setIsLoaded(false);
        await API.groups.create(groupInput, WebApp.initData)
            .then((result) => {
                setIsLoaded(true);

                navigate("/");
            }, (error) => {
                setIsLoaded(true);
                setError(error);

                WebApp.showAlert(`${error.message}`);
            });
    }

    return (
        <div className="center">
            <BackButton onClick={() => navigate("/")} />
            <Lottie
                options={animationOptions(isLoaded ? animation.create_animation :
                    animation.loading_animation)}
                height={"20%"}
                width={"20%"}
                style={{ margin: "10px" }}
            />
            <h1>New group</h1>
            <TextInput
                style={{ margin: "5px 5px" }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                labelText="Name"
                disabled={!isLoaded} />

            <TextInput
                style={{ margin: "5px 5px" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                labelText="Description"
                disabled={!isLoaded} />

            <TextInput
                style={{ margin: "5px 5px" }}
                value={ownerNickname}
                onChange={(e) => setOwnerNickname(e.target.value)}
                labelText="Your nickname"
                disabled={!isLoaded} />

            <TextInput
                style={{ margin: "5px 5px" }}
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                labelText="Access code"
                disabled={!isLoaded} /> 

            <MainButton
                text="Create group"
                onClick={handleCreateGroupClick} />
        </div>
    )
}

export default CreateGroupPage;
