import {useState, useEffect } from 'react';

function getSavedValue(key, initialValue) {
    const savedValue = localStorage.getItem(key);
    if(savedValue){
        try{
            return JSON.parse(savedValue);
        }catch (e) {
            console.error('Gagal parsing localstorage,kembali ke nilai awal', e);
            return initialValue;
        }
    } 

    return initialValue;
}

export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState (() => {
        return getSavedValue(key, initialValue);
    });
    
    useEffect (() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);
    return [value, setValue];
}