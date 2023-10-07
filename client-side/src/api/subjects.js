import { config } from "../Constants";

const getByGroup = async(groupId, initData) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${groupId}/subjects`, {
        headers: {
            "Content-Type": "application/json",
            "InitData": initData
        }
    });

    if (!res.ok) {
        throw Error("Failed to load subjects")
    }

    return res.json();
}

const getById = async(groupId, subjectId, initData) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${groupId}/subjects/${subjectId}`, {
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

const create = async (subjectInput, groupId, initData) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${groupId}/subjects/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "InitData": initData
        },
        body: JSON.stringify(subjectInput)
    });

    if (!res.ok) {
        throw Error("Failed to create subject")
    }

    return res.json();
}

const remove = async (subjectId, groupId, initData) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${groupId}/subjects/${subjectId}/delete`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "InitData": initData
        }
    });

    if (!res.ok) {
        throw Error("Failed to delete subject")
    }

    return res.json();
}

const subjects = {
    getByGroup,
    getById,
    create,
    remove
}

export default subjects;