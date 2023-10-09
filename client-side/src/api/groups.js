import { config } from "../Constants";

const getMy = async (initData) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/my`, {
        headers: {
            "Content-Type": "application/json",
            "InitData": initData
        }
    });

    if (!res.ok) {
        throw Error("Failed to load your groups")
    }

    return res.json();
}

const getById = async (id, initData) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "InitData": initData
        }
    });

    if (!res.ok) {
        throw Error("Failed to load group")
    }

    return res.json();
}

const getUserInfo = async (id, initData) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${id}/user-info`, {
        headers: {
            "Content-Type": "application/json",
            "InitData": initData
        }
    });

    if (!res.ok) {
        throw Error("Failed to load user relation");
    }

    return res.json();
}

const getParticipants = async (id, initData) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${id}/participants`, {
        headers: {
            "Content-Type": "application/json",
            "InitData": initData
        }
    });

    if (!res.ok) {
        throw Error("Failed to load participants");
    }

    return res.json();
}

const create = async (groupInput, initData) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "InitData": initData
        },
        body: JSON.stringify(groupInput)
    });

    if (!res.ok) {
        throw Error("Failed to create group")
    }

    return res.json();
}

const updateParticipant = async (participantInput, groupId, initData) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${groupId}/participants/update`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "InitData": initData
        },
        body: JSON.stringify(participantInput)
    });

    if (!res.ok) {
        throw Error("Failed to update participant")
    }

    return res;
}

const join = async (joinGroupInput, initData) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/participants/join`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "InitData": initData
        },
        body: JSON.stringify(joinGroupInput)
    });

    if (!res.ok) {
        throw Error("Failed to join group")
    }

    return res;
}

const remove = async (id, initData) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${id}/delete`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "InitData": initData
        }
    });

    if (!res.ok) {
        throw Error("Failed to delete group");
    }

    return res;
}

const excludeMe = async (id, initData) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${id}/participants/exclude-me`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "InitData": initData
        }
    });

    if (!res.ok) {
        throw Error("Failed to exclude you from group");
    }

    return res;
}

const excludeUser = async (id, userId, initData) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${id}/participants/${userId}/delete`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "InitData": initData
        }
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
