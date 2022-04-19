export default function parseDateString(date:string){
    return Intl.DateTimeFormat("id-ID",{
        year: 'numeric',
        weekday:"long",
        day:"numeric",
        month:"short",
        
    }).format(new Date(date))
}