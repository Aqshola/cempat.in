export default function formatLikeNumber(num:number){

    let str:string=num.toString()

    if(num>=100000){
        str=num/100000+'K'
    }
    else if(num>=1000000){
        str=num/1000000+'M'
    }

    return str
}