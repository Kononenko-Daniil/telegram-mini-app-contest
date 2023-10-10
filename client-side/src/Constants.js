const prod = {
    url: {
        API_BASE_URL: "https://glowing-usually-robin.ngrok-free.app"
    }
}

const dev = {
    url: {
        API_BASE_URL: "https://localhost:7083"
    }
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod