let mensagens = [];
let usuario;
let nomeUsuario;
let usuarioDestino = "Todos";
let menssagemType = "message";


//verificarUsuario()

function verificarUsuario(){
   // nomeUsuario = prompt("Insira um nome de usuario")
   // usuario = {name: nomeUsuario}

    //let carregar = document.queryCommandValue('.xxx')
    //carregar.classList.add("none")

    //let carregar2 = document.querySelector(".carregando")
    //carregar2.classList.remove("none")

    nomeUsuario = document.querySelector(".usuario").value
    usuario = {name: nomeUsuario}

    const envio = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", usuario)
    envio.then(usuarioOK)
    envio.catch(usuarioErro)

}




function usuarioOK(){
    alert("Usuario ok")

    let esconderLogin = document.querySelector(".tela-login")
    esconderLogin.classList.add("none")



    pegarNoServidor ()
    setInterval(pegarNoServidor, 3000);
    setInterval(verificarConexao, 5000)
    setInterval(pegarListaParticipantes,10000)
    
}

function usuarioErro(){
    console.log("erro")
    alert("Este nome de usuario ja foi utilizado, escolha outro.")
    //verificarUsuario()
}

function verificarConexao(){
    const verificar = axios.post("https://mock-api.driven.com.br/api/v6/uol/status",usuario)
    verificar.catch(desconectado)
}

function desconectado(){
    alert("Você foi desconectado")
    window.location.reload()
}

function pegarNoServidor (){

    const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    promessa.then(chegou)
}


function chegou(resposta){
    //console.log(resposta.data)
    mensagens = resposta.data
    addMensagem()
}


function addMensagem(){
    const listaMensagens = document.querySelector(".caixa-entrada");
    listaMensagens.innerHTML = "";

    
    for (let i=0; i< mensagens.length ; i++){
        let aMendagem = mensagens[i]
       
        if (aMendagem.type === "status"){
            listaMensagens.innerHTML += `
                <li class="status">
                    <span class="time">(${aMendagem.time})</span> <span>  ${aMendagem.from}</span> ${aMendagem.text}
                </li>
            `
        } 
        
        else if (aMendagem.type === "private_message"){
            if(aMendagem.from === nomeUsuario || aMendagem.to === nomeUsuario){
                listaMensagens.innerHTML += 
                `
                    <li class="private">
                        <span class="time">(${aMendagem.time})</span> 
                        <span> ${aMendagem.from}</span> 
                        reservadamente para 
                        <span>${aMendagem.to}</span>
                        ${aMendagem.text}
                    </li>
                `
            }
        } 
        
        else{
            listaMensagens.innerHTML += 
            `
                <li class="message">
                    <span class="time">(${aMendagem.time})</span> 
                    <span>${aMendagem.from}</span>
                    para <span>${aMendagem.to}</span>: ${aMendagem.text}
                </li>
            `  
        }

        
        
    }

    ultimaMensagem ()
    
}

function ultimaMensagem (){
    let ultimaMensagem = document.querySelectorAll("li")
    ultimaMensagem = ultimaMensagem[ultimaMensagem.length-1]
    ultimaMensagem.scrollIntoView()

    
}

function enviarMensagem(){

    let mensagemDigitada = document.querySelector("input").value
    

    /*if (usuarioDestino === "Todos"){
        menssagemType = "message"
    }*/

    let inputTxt = {
    from: nomeUsuario,
	to: usuarioDestino,
	text: mensagemDigitada,
	type: menssagemType  
    }

    const send = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",inputTxt)
    send.then(enviado)
    send.catch(naoEnviado)

}

function enviado(){
    pegarNoServidor()
    let apagarCaixaTexto = document.querySelector("input")
    apagarCaixaTexto.value = ""
}

function naoEnviado(){
    alert("Você foi desconectado")
    window.location.reload()
}


function abrirMenu(){
    let menu = document.querySelector(".tela-ativos")
    menu.classList.remove("none")
    pegarListaParticipantes()
}

function fecharMenu(){
    let menu = document.querySelector(".tela-ativos")
    menu.classList.add("none")
}



function selecionarPartcicipantes(participante){
    const selecione = document.querySelector(".part .ativo")
    if (selecione !== null){
        selecione.classList.remove("ativo")
    }

    participante.classList.add("ativo")
    usuarioDestino = participante.querySelector("p").innerHTML
    console.log(usuarioDestino)
}


function selecionarVisibilidade(visibilidade){
    const selecione = document.querySelector(".visi .ativo")
    const subMensagem = document.querySelector("h2")

    if (selecione !== null){
        selecione.classList.remove("ativo")
    }

    visibilidade.classList.add("ativo")
    let visi = visibilidade.querySelector("p").innerHTML
    console.log(visi)

    if(usuarioDestino !== "Todos"){
        if (visi === "Privado"){
            menssagemType = "private_message"
            subMensagem.innerHTML = `Enviando para ${usuarioDestino} (reservadamente)`
            
        } else if(visi === "Publico"){
            menssagemType = "message"
            subMensagem.innerHTML = ""
        }
    }
    
    console.log(menssagemType)

}

function pegarListaParticipantes(){
    const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants")
    promessa.then(chegouParticipantes)
}

function chegouParticipantes(resposta){
    console.log(resposta.data)
    listaPart = resposta.data
    atualizarParticipantes()
    
}


function atualizarParticipantes(){
// pegar lista de participantes apos "todos" e limpar 
// pegar lista dos ultimos 3 onlie e inserir 






let lista = document.querySelector(".part")
lista.innerHTML = ""

lista.innerHTML += 
 `
<div onclick="selecionarPartcicipantes(this)" class="cx pt ativo">
    <div class="ativos">
        <ion-icon  name="people"></ion-icon>
        <p>Todos</p>
    </div>
    <ion-icon class="ck " name="checkmark-sharp"></ion-icon>
</div>
`
for (let i = 1; i < 5; i++){
    let oDestino = listaPart[listaPart.length-i]

    lista.innerHTML += 
    `
    <div onclick="selecionarPartcicipantes(this)" class="cx pt">
        <div class="ativos" data-identifier="participant">
            <ion-icon name="person-circle"></ion-icon>
            <p>${oDestino.name}</p>
        </div>
        <ion-icon class="ck " name="checkmark-sharp"></ion-icon>
    </div>
    `

}

}


document.addEventListener("keypress", function(e) {
    if(e.key === 'Enter') {
    
        enviarMensagem()
    
    }
  });


   


//{from: 'ddddddd', to: 'Todos', text: 'sai da sala...', type: 'status', time: '03:28:15'}
// ou "private_message" para o bônus