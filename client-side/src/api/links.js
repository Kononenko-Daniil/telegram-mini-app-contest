import { config } from "../Constants";
import headers from "./Headers";

const getByGroup = async(groupId) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${groupId}/links`, {
        headers
    });

    if (!res.ok) {
        throw Error("Failed to load links")
    }

    return res.json();
}

const create = async (linkInput, groupId) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${groupId}/links/create`, {
        method: "POST",
        headers,
        body: JSON.stringify(linkInput)
    });

    if (!res.ok) {
        throw Error("Failed to create link")
    }

    return res.json();
}

const remove = async (linkId, groupId) => {
    const res = await fetch(`${config.url.API_BASE_URL}/groups/${groupId}/links/${linkId}/delete`, {
        method: "DELETE",
        headers
    });

    if (!res.ok) {
        throw Error("Failed to delete link")
    }

    return res;
}

const links = {
    getByGroup,
    create,
    remove
}

export default links;