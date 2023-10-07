import { config } from "../Constants";

const getBySubject = async(groupId, subjectId, initData) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${groupId}/subjects/${subjectId}/hometasks`, {
        headers: {
            "Content-Type": "application/json",
            "InitData": initData
        }
    });

    if (!res.ok) {
        throw Error("Failed to load hometasks")
    }
    

    return res.json();
}

const getByGroup = async(groupId, initData) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${groupId}/hometasks`, {
        headers: {
            "Content-Type": "application/json",
            "InitData": initData
        }
    });

    if (!res.ok) {
        throw Error("Failed to load hometasks")
    }
    

    return res.json();
}

const getById = async(groupId, hometaskId, initData) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${groupId}/hometasks/${hometaskId}`, {
        headers: {
            "Content-Type": "application/json",
            "InitData": initData
        }
    });

    if (!res.ok) {
        throw Error("Failed to load hometask")
    }

    return res.json();
}

const create = async (hometaskInput, groupId, subjectId, initData) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${groupId}
        /subjects/${subjectId}/hometasks/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "InitData": initData
        },
        body: JSON.stringify(hometaskInput)
    });

    if (!res.ok) {
        throw Error("Failed to create hometask")
    }

    return res.json();
}

const hometasks = {
    getBySubject,
    getById,
    getByGroup,
    create
}

export default hometasks