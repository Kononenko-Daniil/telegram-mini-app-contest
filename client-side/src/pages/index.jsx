import { useState, useEffect } from "react";
import API from "../api";
import WebApp from "@twa-dev/sdk";
import Lottie from "react-lottie";
import { animation, animationOptions } from "../Animations";
import { useNavigate } from "react-router-dom";
import { MainButton } from '@twa-dev/sdk/react';

const HomePage = () => {
    const navigate = useNavigate();

    const [isLoaded, setIsLoaded] = useState(false);
    const [groups, setGroups] = useState([]);
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

    const navigateToCreateGroup = () => {
        navigate("/groups/create");
    }

    const navigateToGroup = (id) => {
        navigate(`/groups/${id}`);
    }

    if (!isLoaded) {
        return (
            <div className="center">
                <div className="loader" />
            </div>
        )
    } else {
        if (groups.length !== 0) {
            return (
                <div>
                    {
                        groups.map((group, index) => 
                        <div className="card" key={index} onClick={() => navigateToGroup(group.id)}>
                            <div className="avatar md" style={{marginRight: "10px"}}>
                                <h3 className="avatar-text">{group.name.slice(0,2)}</h3>
                            </div>
                            <div className="card-text-block">
                                <h3 className="card-text">{group.name}</h3>
                                <p className="card-text">{group.description}</p>
                            </div>
                        </div>)
                    }
                    <MainButton
                        text="Create group"
                        onClick={navigateToCreateGroup} />
                </div>
            )
        } else {
            if (error) {
                return (
                    <div className="center">
                        <Lottie 
                            options={animationOptions(animation.loading_animation)}
                            height={"50%"}
                            width={"50%"}
                            style={{margin: "10px"}}
                        />         
                        <p>Something went wrong( Try again later</p>       
                    </div>
                )
            } else {
                return (
                    <div className="center">
                        <Lottie 
                            options={animationOptions(animation.nothing_here_animation)}
                            height={"50%"}
                            width={"50%"}
                            style={{margin: "10px"}}
                        />         
                        <p>You are not a member of any groups</p>       
                        <button 
                            onClick={navigateToCreateGroup} 
                            style={{ width: "80%" }}>
                                Create group
                        </button>
                    </div>
                )
            }
        }
    }

}

export default HomePage;