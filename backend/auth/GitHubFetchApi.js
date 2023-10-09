const axios = require("axios");

async function getAccessToken(client_id, client_secret, code) {
    return (await axios.post("https://github.com/login/oauth/access_token", {
        client_id,
        client_secret,
        code
    })).data;
}

async function getAuthUser(access_token) {
    return (await axios.get("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${access_token}` }
    })).data;
}

async function getUserRepo(access_token) {
    return (await axios.get("https://api.github.com/user/repos", {
        headers: { Authorization: `Bearer ${access_token}` },
        params: {
            per_page: 200,
            sort: "created",
        }
    })).data;
}

module.exports = { getAccessToken, getAuthUser, getUserRepo };