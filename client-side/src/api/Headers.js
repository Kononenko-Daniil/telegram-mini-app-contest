import WebApp from "@twa-dev/sdk";

const initData = WebApp.initData;

const headers = {
    "Content-Type": "application/json",
    "InitData": initData,
    "ngrok-skip-browser-warning": "any"
}

export default headers;
