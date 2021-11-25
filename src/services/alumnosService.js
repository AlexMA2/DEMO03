import { baseUrl } from "./baseURL";

const alumnos = [];

export const getAlumnos = async () => {    

    fetch(`${baseUrl}/alumnos`, {
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

export const postAlumnos = async (alumno) => {
    fetch(`${baseUrl}/alumnos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(alumno)
    })
    .then(response => response.json())
    .then(data => {
        return data
    })
}