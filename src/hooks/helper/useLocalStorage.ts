

export function setLocalStorage<T>(storageName:string, item:T){
    localStorage.setItem(storageName, JSON.stringify(item));
}

export function getLocalStorage<T>(storageName:string):T|null{
    const item = localStorage.getItem(storageName);
    if(item){
        return JSON.parse(item);
    }
    return null;
}

export function removeLocalStorage(storageName:string){
     localStorage.removeItem(storageName)
}

