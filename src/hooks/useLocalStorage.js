import { useEffect, useState } from "react";

export function useLocalStorage(key, initalData) {
    const [data, setData] = useState(initalData)


    useEffect(() => {
        const existingData = JSON.parse(localStorage.getItem(key))
        if (existingData) {
            setData(existingData)
        } else {
            localStorage.setItem(key, JSON.stringify(initalData))
        }
    }, [])

    


    const updateLocalStorage = (newData) => {
        if(typeof newData === 'function'){
        localStorage.setItem(key, JSON.stringify(newData(data))) 
        }else{
        localStorage.setItem(key, JSON.stringify(newData))
        }
        setData(newData)
    }
    return [data, updateLocalStorage]
}