import { config } from "../Constants";
import headers from "./Headers";

const getBySubject = async (groupId, subjectId) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${groupId}/subjects/${subjectId}/hometasks`, {
        headers
    });

    if (!res.ok) {
        throw Error("Failed to load hometasks")
    }


    return res.json();
}

const getByGroup = async (groupId) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${groupId}/hometasks`, {
        headers
    });

    if (!res.ok) {
        throw Error("Failed to load hometasks")
    }


    return res.json();
}

const getById = async (groupId, hometaskId) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${groupId}/hometasks/${hometaskId}`, {
        headers
    });

    if (!res.ok) {
        throw Error("Failed to load hometask")
    }

    return res.json();
}

const create = async (hometaskInput, groupId, subjectId) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${groupId}
        /subjects/${subjectId}/hometasks/create`, {
        method: "POST",
        headers,
        body: JSON.stringify(hometaskInput)
    });

    if (!res.ok) {
        throw Error("Failed to create hometask")
    }

    return res.json();
}


const remove = async (groupId, hometaskId) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${groupId}/hometasks/${hometaskId}/delete`, {
        method: "DELETE",
        headers
    });

    if (!res.ok) {
        throw Error("Failed to delete hometask");
    }

    return res;
}

const hometasks = {
    getBySubject,
    getById,
    getByGroup,
    create,
    remove
}

export default hometasks