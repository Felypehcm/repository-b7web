// Variaveis dos elementos 
let digitalElemente = document.querySelector('.digital');
let sElemente = document.querySelector('.p_s');
let mElemente = document.querySelector('.p_m');
let hElemente = document.querySelector('.p_h');

//Função para atualizar os ponteiros 
function updateClock(){
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    // Atualização do Relogio Digital 
    digitalElemente.innerHTML = `${fixZero(hour)}:${fixZero(minute)}:${fixZero(second)}`;

    //Atualização do ponteiro do segundo
    let sDeg = (360 / 60 * second) -90;
    sElemente.style.transform = `rotate(${sDeg}deg)`;

    //Atualização do ponteiro do minuto
    let mDeg = (360 / 60 * minute) -90;
    mElemente.style.transform = `rotate(${mDeg}deg)`;

    //Atualização do ponteiro da hora
    let hDeg = (360 / 12 * hour) -90;
    hElemente.style.transform = `rotate(${hDeg}deg)`;
}

// Função apenas para setar o padrao de dois digitos
function fixZero(time){
    return time < 10 ?  `0${time}` : time;
}
// Função para movimentção
setInterval(updateClock, 1000);
updateClock();