import { baseUrl } from "./baseURL";
export const getEscuelas = async () => {
    fetch(`${baseUrl}/escuelas`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        return data
    })   
}

export const postEscuelas = async (escuela) => {
    fetch(`${baseUrl}/escuela`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(escuela)
    })
    .then(response => response.json())
    .then(data => {
        return data
    })
} 