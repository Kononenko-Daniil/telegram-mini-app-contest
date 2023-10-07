import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../api";
import WebApp from "@twa-dev/sdk";
import { MainButton, BackButton } from '@twa-dev/sdk/react';
import Lottie from "react-lottie";
import { animation, animationOptions } from "../../../Animations";

const LinksPage = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [links, setLinks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        API.links.getByGroup(params.groupId, WebApp.initData)
            .then((result) => {
                setLinks(result);
                setIsLoaded(true);
            }, (error) => {
                setError(error);
                setIsLoaded(true);
            })
    }, []);

    const navigateToLinkCreate = () => {
        navigate(`/groups/${params.groupId}/links/create`);
    }

    const navigateToGroupById = () => {
        navigate(`/groups/${params.groupId}`);
    }

    if (error) {
        return (
            <div className="center">
                <BackButton onClick={navigateToGroupById} />
                <Lottie
                    options={animationOptions(animation.loading_animation)}
                    height={"50%"}
                    width={"50%"}
                    style={{ margin: "10px" }}
                />
                <p>Something went wrong, while fetching links</p>
            </div>
        )
    }

    if (!isLoaded) {
        return (
            <div className="center">
                <BackButton onClick={navigateToGroupById} />
                <div className="loader" />
            </div>
        )
    }

    if (links.length === 0) {
        return (
            <div className="center">
                <BackButton onClick={navigateToGroupById} />
                <Lottie
                    options={animationOptions(animation.nothing_here_animation)}
                    height={"50%"}
                    width={"50%"}
                    style={{ margin: "10px" }}
                />
                <p>There aren`t any links in this group yet</p>
                <button
                    onClick={navigateToLinkCreate}
                    style={{ width: "80%" }}>
                    Create link
                </button>
            </div>
        )
    }

    return (
        <div className="center">
            <BackButton onClick={navigateToGroupById} />

            {
                links.map((link, index) =>
                    <div className="card" key={index}
                        onClick={() => WebApp.openLink(link.url)}>
                        <div className="card-text-block" style={{ marginLeft: "10px" }}>
                            <h2 className="card-text">{link.name}</h2>
                            <p className="card-text">{link.url}</p>
                        </div>
                    </div>)
            }

            <MainButton
                text="Create link"
                onClick={navigateToLinkCreate} />
        </div>
    )
}

export default LinksPage;
