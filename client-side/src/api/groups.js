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

const groups = {
    getMy,
    getById,
    create
}

export default groups;
