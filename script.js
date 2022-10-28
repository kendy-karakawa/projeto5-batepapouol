let mensagens = [];
let usuario;
let nomeUsuario;


verificarUsuario()

function verificarUsuario(){
    nomeUsuario = prompt("Insira um nome de usuario")
    usuario = {name: nomeUsuario}

    const envio = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", usuario)
    envio.then(usuarioOK)
    envio.catch(usuarioErro)

}

function usuarioOK(){
    alert("Usuario ok")
    pegarNoServidor ()
    setInterval(pegarNoServidor, 3000);
    setInterval(verificarConexao, 5000)
    
}

function usuarioErro(){
    console.log("erro")
    alert("Este nome de usuario ja foi utilizado, escolha outro.")
    verificarUsuario()
}

function verificarConexao(){
    const verificar = axios.post("https://mock-api.driven.com.br/api/v6/uol/status",usuario)
    
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
            if(aMendagem.from === usuario || aMendagem.to === usuario){
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



//{from: 'ddddddd', to: 'Todos', text: 'sai da sala...', type: 'status', time: '03:28:15'}
