import { useNavigate } from "react-router-dom";
import services from "../misc/Services";
import WebApp from "@twa-dev/sdk";
import API from "../api";

const HometasksList = (props) => {
    const { hometasks, groupId, userGroupInfo, onDeleting } = props;
    const navigate = useNavigate();

    const handleHometaskClick = (hometask) => {
        if (!userGroupInfo.canEdit) {
            navigateToHometaskById(hometask.id)
        }

        const openHometaskButton = {
            id: "open-hometask-button",
            type: "default",
            text: "Open"
        };
        const deleteHometaskButton = {
            id: "delete-hometask-button",
            text: "Delete",
            type: "destructive"
        };

        WebApp.showPopup({
            title: "Action",
            message: "What you want to do?",
            buttons: [
                openHometaskButton,
                deleteHometaskButton
            ]
        }, (buttonId) => {
            switch (buttonId) {
                case openHometaskButton.id: {

                    navigateToHometaskById(hometask.id);
                    break;
                }
                case deleteHometaskButton.id: {
                    API.hometasks.remove(groupId, hometask.id)
                        .then((result) => {
                            onDeleting();
                        }, (error) => {
                            WebApp.showAlert("Something went wrong while deleting hometask");
                        })
                    break;
                }
            }
        })
    }

    const navigateToHometaskById = (id) => navigate(`/groups/${groupId}/hometasks/${id}`);

    return (
        <>
            {
                hometasks.map((hometask, index) =>
                    <div className="card" key={index}
                        onClick={() => handleHometaskClick(hometask)}>
                        <div
                            className="card-text-block"
                            style={{ width: "100%", paddingLeft: "10px" }}>
                            <div className={`tag ${new Date() < services.asUTCDate(hometask.deadline) ?
                                "success" : "danger"}`} style={{ margin: "5px 0px 0px 0px" }}>
                                {services.asUTCDate(hometask.deadline).toLocaleString()}
                            </div>

                            {
                                hometask.content.length === 0 ?
                                    <h4 className="card-text"
                                        style={{ color: "var(--hint-color)" }}>
                                        Hometask not specified
                                    </h4>
                                    :
                                    <h3 className="card-text">
                                        {hometask.content}
                                    </h3>
                            }

                        </div>
                    </div>)
            }
        </>
    )
}

export default HometasksList;
