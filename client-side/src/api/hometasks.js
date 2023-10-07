import { config } from "../Constants";

const getBySubject = async(groupId, subjectId, initData) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${groupId}/subjects/${subjectId}/hometasks`, {
        headers: {
            "Content-Type": "application/json",
            "InitData": initData
        }
    });

    if (!res.ok) {
        throw Error("Failed to load subject")
    }
    

    return res.json();
}

const hometasks = {
    getBySubject
}

export default hometasks