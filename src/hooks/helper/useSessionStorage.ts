
/**
 * TODO - Change into Session Storage
 * 
 */
 export function setSessionStorage<T>(storageName:string, item:T){
    sessionStorage.setItem(storageName, JSON.stringify(item));
}

export function getSessionStorage<T>(storageName:string):T|null{
    const item = sessionStorage.getItem(storageName);
    if(item){
        return JSON.parse(item);
    }
    return null;
}

export function removeSessionStorage(storageName:string){
     sessionStorage.removeItem(storageName)
}

