export const codificar64 = function (x){
    return btoa(x)
}

export const decodificar64 = function(x){
    return atob(x);
}

export const currentDate = function(x){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    today = dd + '/' + mm + '/' + yyyy;
    return today;
}

export default {codificar64, decodificar64, currentDate};