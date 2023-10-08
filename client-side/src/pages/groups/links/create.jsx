import { MainButton, BackButton } from '@twa-dev/sdk/react';
import { animation, animationOptions } from '../../../Animations';
import Lottie from "react-lottie";
import TextInput from '../../../components/TextInput';
import { useState } from 'react';
import API from "../../../api";
import WebApp from "@twa-dev/sdk";
import { useNavigate, useParams } from 'react-router-dom';

const CreateLinkPage = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [isLoaded, setIsLoaded] = useState(true);
    const [error, setError] = useState(null);

    const handleCreateLinkClick = async () => {
        const groupId = params.groupId;
        const initData = WebApp.initData;
        const linkInput = {
            name,
            url
        };

        setIsLoaded(false);
        await API.links.create(linkInput, groupId, initData)
            .then((result) => {
                setIsLoaded(true);
                navigateToLinks();
            }, (error) => {
                setIsLoaded(true);
                setError(error);

                WebApp.showAlert(`${error.message}`);
            });
    }

    const navigateToLinks = () => navigate(`/groups/${params.groupId}/links`);

    return (
        <div className="center">
            <BackButton onClick={navigateToLinks} />

            <Lottie
                options={animationOptions(isLoaded ? animation.create_animation :
                    animation.loading_animation)}
                height={"20%"}
                width={"20%"}
                style={{ margin: "10px" }}
            />

            <h1>New link</h1>

            <TextInput
                style={{ margin: "5px 5px" }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                labelText="Name"
                disabled={!isLoaded} />

            <TextInput
                style={{ margin: "5px 5px" }}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                labelText="URL"
                disabled={!isLoaded} />

            <MainButton
                text="Create link"
                onClick={handleCreateLinkClick} />
        </div>
    )
}

export default CreateLinkPage;
