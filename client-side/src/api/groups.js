import { config } from "../Constants";
import headers from "./Headers";

const getMy = async () => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/my`, {
        headers
    });

    if (!res.ok) {
        throw Error("Failed to load your groups")
    }

    return res.json();
}

const getById = async (groupId) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${groupId}`, {
        headers
    });

    if (!res.ok) {
        throw Error("Failed to load group")
    }

    return res.json();
}

const getUserInfo = async (groupId) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${groupId}/user-info`, {
        headers
    });

    if (!res.ok) {
        throw Error("Failed to load user relation");
    }

    return res.json();
}

const getParticipants = async (groupId) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${groupId}/participants`, {
        headers
    });

    if (!res.ok) {
        throw Error("Failed to load participants");
    }

    return res.json();
}

const create = async (groupInput) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/create`, {
        method: "POST",
        headers,
        body: JSON.stringify(groupInput)
    });

    if (!res.ok) {
        throw Error("Failed to create group")
    }

    return res.json();
}

const updateParticipant = async (participantInput, groupId) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${groupId}/participants/update`, {
        method: "POST",
        headers,
        body: JSON.stringify(participantInput)
    });

    if (!res.ok) {
        throw Error("Failed to update participant")
    }

    return res;
}

const join = async (joinGroupInput) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/participants/join`, {
        method: "POST",
        headers,
        body: JSON.stringify(joinGroupInput)
    });

    if (!res.ok) {
        throw Error("Failed to join group")
    }

    return res;
}

const remove = async (groupId) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${groupId}/delete`, {
        method: "DELETE",
        headers
    });

    if (!res.ok) {
        throw Error("Failed to delete group");
    }

    return res;
}

const excludeMe = async (groupId) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${groupId}/participants/exclude-me`, {
        method: "DELETE",
        headers
    });

    if (!res.ok) {
        throw Error("Failed to exclude you from group");
    }

    return res;
}

const excludeUser = async (groupId, userId) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${groupId}/participants/${userId}/delete`, {
        method: "DELETE",
        headers
    });

    if (!res.ok) {
        throw Error("Failed to exclude user from group");
    }

    return res;
}

const groups = {
    getMy,
    getById,
    getUserInfo,
    getParticipants,
    create,
    join,
    remove,
    updateParticipant,
    excludeMe,
    excludeUser
}

export default groups;
