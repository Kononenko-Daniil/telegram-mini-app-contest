import { config } from "../Constants";

const getByGroup = async(groupId, initData) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${groupId}/links`, {
        headers: {
            "Content-Type": "application/json",
            "InitData": initData
        }
    });

    if (!res.ok) {
        throw Error("Failed to load links")
    }

    return res.json();
}

const create = async (linkInput, groupId, initData) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${groupId}/links/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "InitData": initData
        },
        body: JSON.stringify(linkInput)
    });

    if (!res.ok) {
        throw Error("Failed to create link")
    }

    return res.json();
}

const remove = async (linkId, groupId, initData) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${groupId}/links/${linkId}/delete`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "InitData": initData
        }
    });

    if (!res.ok) {
        throw Error("Failed to delete link")
    }

    return res.json();
}

const links = {
    getByGroup,
    create,
    remove
}

export default links;