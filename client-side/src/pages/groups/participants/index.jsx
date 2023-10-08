import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../api";
import WebApp from "@twa-dev/sdk";
import { BackButton } from '@twa-dev/sdk/react';
import Lottie from "react-lottie";
import { animation, animationOptions } from "../../../Animations";
import ParticipantTypeTag from "../../../components/ParticipantTypeTag";
import { UserType } from "../../../misc/Enums";

const ParticipantsPage = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [userGroupInfo, setUserGroupInfo] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const groupId = params.groupId;
        const initData = WebApp.initData;

        const userGroupInfoRequest = API.groups.getUserInfo(groupId, initData);
        const participantsRequest = API.groups.getParticipants(groupId, initData);

        Promise.all([userGroupInfoRequest, participantsRequest])
            .then(([userGroupInfoResponse, perticipantsResponse]) => {
                setUserGroupInfo(userGroupInfoResponse);
                setParticipants(perticipantsResponse);
                setIsLoaded(true);
            })
            .catch((error) => {
                setError(error);
                setIsLoaded(true);
            });
    }, []);

    const handleParticipantClick = (participant) => {
        const makeOwnerButton = {
            id: "make-owner-button",
            text: "Make owner",
            type: "default"
        };
        const makeEditorButton = {
            id: "make-editor-button",
            text: "Make editor",
            type: "default"
        };
        const makeViewerButton = {
            id: "make-viewer-button",
            text: "Make viewer",
            type: "default"
        };
        const excludeButton = {
            id: "exclude-button",
            text: "Exclude",
            type: "destructive"
        }
        var buttons = [excludeButton]

        switch (participant.type) {
            case UserType.OWNER: {
                buttons.push(makeEditorButton, makeViewerButton); break;
            }
            case UserType.EDITOR: {
                buttons.push(makeOwnerButton, makeViewerButton); break;
            }
            case UserType.VIEWER: {
                buttons.push(makeOwnerButton, makeEditorButton); break;
            }
        }

        WebApp.showPopup({
            title: "Action",
            message: "Choose what to do with this participant",
            buttons
        }, (buttonId) => {
            const groupId = params.groupId;
            const initData = WebApp.initData;

            if (buttonId === excludeButton.id) {
                API.groups.excludeUser(groupId, participant.userId, initData)
                    .then((result) => {
                        getParticipants();
                    }, (error) => {
                        WebApp.showAlert("Something went wrong while excluding user")
                    });

                return;
            }

            var updatedParticipant = {
                userId: participant.userId,
                groupId: participant.groupId,
                nickname: participant.nickname
            }

            switch (buttonId) {
                case makeOwnerButton.id:
                    updatedParticipant.type = UserType.OWNER; break;
                case makeEditorButton.id:
                    updatedParticipant.type = UserType.EDITOR; break;
                case makeViewerButton.id:
                    updatedParticipant.type = UserType.VIEWER; break;
            }

            API.groups.updateParticipant(updatedParticipant, groupId, initData)
                .then((result) => {
                    navigateCurrent();
                }, (error) => {
                    WebApp.showAlert("Something went wrong while updating participants")
                });
        })
    }

    const navigateToGroupById = () => navigate(`/groups/${params.groupId}`);
    const navigateCurrent = () => navigate(0);

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

                <p>Something went wrong, while fetching participants</p>
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

    if (participants.length === 0) {
        return (
            <div className="center">
                <BackButton onClick={navigateToGroupById} />
                <Lottie
                    options={animationOptions(animation.nothing_here_animation)}
                    height={"50%"}
                    width={"50%"}
                    style={{ margin: "10px" }}
                />
                <p>There aren`t any participants in this group yet</p>
            </div>
        )
    }

    return (
        <div className="center">
            <BackButton onClick={navigateToGroupById} />
            {
                participants.map((participant, index) =>
                    <div
                        className="card"
                        key={index}
                        onClick={() => handleParticipantClick(participant)}>
                        <div
                            className="card-text-block"
                            style={{ width: "100%", paddingLeft: "10px" }}>
                            <ParticipantTypeTag
                                participantType={participant.type}
                                style={{ margin: "5px 0px 0px 0px" }} />
                            <h3 className="card-text">{participant.nickname}</h3>
                        </div>
                    </div>)
            }
        </div>
    )
}

export default ParticipantsPage;
