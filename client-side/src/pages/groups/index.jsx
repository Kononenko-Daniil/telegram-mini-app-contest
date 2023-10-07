import { useState, useEffect } from "react";
import API from "../../api";
import WebApp from "@twa-dev/sdk";
import Lottie from "react-lottie";
import { animation, animationOptions } from "../../Animations";
import { useNavigate } from "react-router-dom";
import { MainButton } from '@twa-dev/sdk/react';

const GroupsPage = () => {
    const navigate = useNavigate();

    const [groups, setGroups] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        API.groups.getMy(WebApp.initData)
            .then((result) => {
                setIsLoaded(true);
                setGroups(result);
            }, (error) => {
                setIsLoaded(true);
                setError(error);
            });
    }, []);

    const navigateToGroupById = (id) => {
        navigate(`/groups/${id}`);
    }

    const navigateToGroupCreate = () => {
        navigate("/groups/create");
    }

    if (error) {
        return (
            <div className="center">
                <Lottie
                    options={animationOptions(animation.loading_animation)}
                    height={"50%"}
                    width={"50%"}
                    style={{ margin: "10px" }}
                />
                <p>Something went wrong</p>
            </div>
        )
    }

    if (!isLoaded) {
        return (
            <div className="center">
                <div className="loader" />
            </div>
        )
    }

    if (groups.length === 0) {
        return (
            <div className="center">
                <Lottie
                    options={animationOptions(animation.nothing_here_animation)}
                    height={"50%"}
                    width={"50%"}
                    style={{ margin: "10px" }}
                />
                <p>You are not a member of any group</p>
                <button
                    onClick={navigateToGroupCreate}
                    style={{ width: "80%", marginBottom: "10px" }}>
                    Join existing group
                </button>
                <button
                    className="primary-tinned"
                    onClick={navigateToGroupCreate}
                    style={{ width: "80%" }}>
                    Create group
                </button>
            </div>
        )
    }

    return (
        <div className="center">
            <button
                onClick={navigateToGroupCreate}
                style={{ width: "80%", marginBottom: "10px" }}>
                Join existing group
            </button>

            {
                groups.map((group, index) =>
                    <div className="card" key={index} onClick={() => navigateToGroupById(group.id)}>
                        <div className="avatar md" style={{ marginRight: "10px" }}>
                            <h3 className="avatar-text">{group.name.slice(0, 2)}</h3>
                        </div>

                        <div className="card-text-block">
                            <h3 className="card-text">{group.name}</h3>
                            <p className="card-text">{group.description}</p>
                        </div>
                    </div>)
            }

            <MainButton
                text="Create group"
                onClick={navigateToGroupCreate} />
        </div>
    )
}

export default GroupsPage;