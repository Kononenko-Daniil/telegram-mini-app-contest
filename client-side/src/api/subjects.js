import { config } from "../Constants";
import headers from "./Headers";

const getByGroup = async(groupId) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${groupId}/subjects`, {
        headers
    });

    if (!res.ok) {
        throw Error("Failed to load subjects")
    }

    return res.json();
}

const getById = async(groupId, subjectId) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${groupId}/subjects/${subjectId}`, {
        headers
    });

    if (!res.ok) {
        throw Error("Failed to load subject")
    }
    

    return res.json();
}

const create = async (subjectInput, groupId) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${groupId}/subjects/create`, {
        method: "POST",
        headers,
        body: JSON.stringify(subjectInput)
    });

    if (!res.ok) {
        throw Error("Failed to create subject")
    }

    return res.json();
}

const remove = async (subjectId, groupId) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${groupId}/subjects/${subjectId}/delete`, {
        method: "DELETE",
        headers
    });

    if (!res.ok) {
        throw Error("Failed to delete subject")
    }

    return res;
}

const subjects = {
    getByGroup,
    getById,
    create,
    remove
}

export default subjects;