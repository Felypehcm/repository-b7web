//variaveis de controle de interface

let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descicao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros= document.querySelector('.d-1-3');

// Variaveis de ambiente 

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = []


// funcoes de click do teclado 

function clicou(n){
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !== null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca')
        if( elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisca')
        } else{
            atualizaInterface();
        }
        
    }
}
function branco(){
    if(numero === ''){
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros = innerHTML = '';
        descicao.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO</div>';
    }else {
        alert('Para votar em BRANCO não pode ter digitado nenhum numero')
    }
    
}
function corrige(){
    comecarEtapa();
}
function confirma(){
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;


    if(votoBranco === true){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'Branco'
        })
    }else if (numero.length === etapa.numeros){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
    }else{
        alert('É necessario vorar em algum cadidato ou em Branco para confirmar!!!')
    }

    if(votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else{
            document.querySelector('.tela').innerHTML = '<div class="aviso-grande-fim pisca">FIM</div>';
            console.log(votos);
        }
    }
}

//Outras Funções

function comecarEtapa(){
    let etapa = etapas[etapaAtual];
    numero = '';
    votoBranco = false;

    let numeroHtml = '';

    for(let i=0; i<etapa.numeros; i++){
        if(i === 0){
            numeroHtml += '<div class="numero pisca"></div>';
        }else{
            numeroHtml += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descicao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true;
        } else{
            return false;
        }
    });
    if (candidato.length > 0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descicao.innerHTML = `Nome: ${candidato.nome}<br> Partido: ${candidato.partido}`;

        let fotosHtaml = '';
        for(let i in candidato.fotos){
            if(candidato.fotos[i].vice){
                fotosHtaml += `<div class="d-1-image vice"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
            }else{
                fotosHtaml += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
            }
        }

        lateral.innerHTML = fotosHtaml;
    }else{
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descicao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>';
    }
}

comecarEtapa();