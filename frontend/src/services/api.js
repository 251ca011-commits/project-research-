
const API_BASE_URL = "http://localhost:5000/api";

export async function getHealth() {
    const response = await fetch(`${API_BASE_URL}/health`);

    if (!response.ok) {
        throw new Error(`Backend request failed: ${response.status}`);
    }

    return response.json();
}

export async function getCases() {
    const response = await fetch(`${API_BASE_URL}/cases`);

    if (!response.ok) {
        throw new Error(`Cases request failed: ${response.status}`);
    }

    return response.json();
}
