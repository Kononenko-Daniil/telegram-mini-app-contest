import { MainButton, BackButton } from '@twa-dev/sdk/react';
import { animation, animationOptions } from '../../Animations';
import Lottie from "react-lottie";
import { useState, useEffect } from 'react';
import API from "../../api";
import WebApp from "@twa-dev/sdk";
import { useNavigate, useParams } from 'react-router-dom';
import TabCard from '../../components/TabCard';

const GroupByIdPage = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [userGroupInfo, setUserGroupInfo] = useState(null);
    const [group, setGroup] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const groupId = params.id;

        const userGroupInfoRequest = API.groups.getUserInfo(groupId);
        const groupByIdRequest = API.groups.getById(params.id);

        Promise.all([userGroupInfoRequest, groupByIdRequest])
            .then(([userGroupInfoResponse, groupResponse]) => {
                setUserGroupInfo(userGroupInfoResponse);
                setGroup(groupResponse);
                setIsLoaded(true);
            })
            .catch((error) => {
                setError(error);
                setIsLoaded(true);
            });
    }, []);

    const handleDeleteGroupClick = async () => {
        const groupId = params.id;

        setIsLoaded(false);
        await API.groups.remove(groupId)
            .then((result) => {
                navigateHome();
            }, (error) => {
                setIsLoaded(true);
                WebApp.showAlert("Something went wrong while deleting group");
            });
    }

    const handleExcludeMeClick = async () => {
        const groupId = params.id;

        setIsLoaded(false);
        await API.groups.excludeMe(groupId)
            .then((result) => {
                navigateHome();
            }, (error) => {
                setIsLoaded(true);
                WebApp.showAlert("Something went wrong while escluding you from this group");
            });
    }

    const handleCopyAccessGroupData = () => {
        const copyInformation = `Group ID: ${group.id}\nAccess code: ${group.accessCode}\n@stud_copilot_bot`;
        navigator.clipboard.writeText(copyInformation)
            .then(() => {
                WebApp.showAlert("Access information copied");
            })
            .catch(() => {
                WebApp.showAlert("Something went wrong");
            });
    }

    const navigateHome = () => navigate("/");
    const navigateToTabPage = (tabName) => navigate(`/groups/${group.id}/${tabName}`)

    if (!isLoaded) {
        return (
            <div className="center">
                <BackButton onClick={navigateHome} />

                <div className="loader" />
            </div>
        )
    }

    if (error || !group) {
        return (
            <div className="center">
                <BackButton onClick={navigateHome} />

                <Lottie
                    options={animationOptions(animation.nothing_here_animation)}
                    height={"50%"}
                    width={"50%"}
                    style={{ margin: "10px" }}
                />

                <p>There isn`t any group yet</p>

                <MainButton
                    text="My groups"
                    onClick={navigateHome} />
            </div>
        )
    }

    return (
        <div className='center'>
            <BackButton onClick={navigateHome} />

            <div style={{ overflow: "hidden" }} className='center'>
                <div className='avatar lg'>
                    <h3 className={"avatar-text"}>
                        {group.name.slice(0, 2)}
                    </h3>
                </div>
                <h1>{group.name}</h1>
                <p>{group.description}</p>
            </div>

            <TabCard
                name={"Hometasks"}
                description={"View group hometasks"}
                logoText={"👨‍🏫"}
                onClick={() => navigateToTabPage("hometasks")} />

            <TabCard
                name={"Subjects"}
                description={"View group subjects"}
                logoText={"📒"}
                onClick={() => navigateToTabPage("subjects")} />

            <TabCard
                name={"Links"}
                description={"Useful links"}
                logoText={"📌"}
                onClick={() => navigateToTabPage("links")} />

            {
                userGroupInfo.isOwner ?
                    <TabCard
                        name={"Participants"}
                        description={"View and edit group participants"}
                        logoText={"👦"}
                        onClick={() => navigateToTabPage("participants")} /> : <></>
            }

            {
                <>
                    <h4>Group ID: {group.id}</h4>
                    <h4 style={{marginTop: "-10px"}}>Access code: {group.accessCode}</h4>
                </>
            }

            <button
                onClick={handleExcludeMeClick}
                className='danger-tinned'
                style={{ width: "90%", margin: "10px 0px" }}>
                Exclude me
            </button>

            {
                userGroupInfo.isOwner ?
                    <button
                        onClick={handleDeleteGroupClick}
                        className='danger'
                        style={{ width: "90%", marginBottom: "10px" }}>
                        Delete group
                    </button> : <></>
            }
        </div>
    )
}

export default GroupByIdPage;
