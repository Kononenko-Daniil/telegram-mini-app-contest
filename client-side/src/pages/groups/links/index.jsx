import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import API from "../../../api";
import WebApp from "@twa-dev/sdk";
import { MainButton, BackButton } from '@twa-dev/sdk/react';
import Lottie from "react-lottie";
import { animation, animationOptions } from "../../../Animations";

const LinksPage = () => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [userGroupInfo, setUserGroupInfo] = useState(null);
    const [links, setLinks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const groupId = params.groupId;

        const userGroupInfoRequest = API.groups.getUserInfo(groupId);
        const linksByGroupRequest = API.links.getByGroup(groupId);

        setIsLoaded(false);
        Promise.all([userGroupInfoRequest, linksByGroupRequest])
            .then(([userGroupInfoResponse, linksByGroupResponse]) => {
                setUserGroupInfo(userGroupInfoResponse);
                setLinks(linksByGroupResponse);
                setIsLoaded(true);
            })
            .catch((error) => {
                setError(error);
                setIsLoaded(true);
            });
    }, []);

    const handleLinkClick = (link) => {
        if (!userGroupInfo.canEdit) {
            WebApp.openLink(link.url);
        }

        const openLinkButton = {
            id: "open-link-button",
            type: "default",
            text: "Open"
        };
        const deleteLinkButton = {
            id: "delete-link-button",
            text: "Delete",
            type: "destructive"
        };

        WebApp.showPopup({
            title: "Action",
            message: "What you want to do?",
            buttons: [
                openLinkButton,
                deleteLinkButton
            ]
        }, (buttonId) => {
            const groupId = params.groupId;

            switch (buttonId) {
                case openLinkButton.id: {
                    WebApp.openLink(link.url);
                    break;
                }
                case deleteLinkButton.id: {
                    API.links.remove(link.id, groupId)
                        .then((result) => {
                            window.location.reload(true)
                        }, (error) => {
                            WebApp.showAlert("Something went wrong while deleting link");
                        })
                    break;
                }
            }
        })
    }

    const navigateToLinkCreate = () => navigate(`/groups/${params.groupId}/links/create`);
    const navigateToGroupById = () => navigate(`/groups/${params.groupId}`);

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
                
                {
                    userGroupInfo.canEdit ?
                        <button
                            onClick={navigateToLinkCreate}
                            style={{ width: "80%" }}>
                            Create link
                        </button> : <></>
                }
            </div>
        )
    }

    return (
        <div className="center">
            <BackButton onClick={navigateToGroupById} />

            {
                links.map((link, index) =>
                    <div className="card" key={index}
                        onClick={() => handleLinkClick(link)}>
                        <div className="card-text-block" style={{ marginLeft: "10px" }}>
                            <h2 className="card-text">{link.name}</h2>
                            <p className="card-text">{link.url}</p>
                        </div>
                    </div>)
            }

            {
                userGroupInfo.canEdit ?
                    <MainButton
                        text="Create link"
                        onClick={navigateToLinkCreate} /> : <></>
            }
        </div>
    )
}

export default LinksPage;
