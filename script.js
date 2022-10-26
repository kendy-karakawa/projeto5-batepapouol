let mensagens = [

    
];

const pegarNoServidor = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
pegarNoServidor.then(chegou)

function chegou(resposta){
    console.log(resposta.data)
    mensagens = resposta.data
}

addMensagem()


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
}






/* { from : "chimbinha" , to : "dsds" , text :" mensagem digitada ", type : "message" , time : "05:47:26" },
    { from : "chimbinha" , to : "Todos" , text :" sai da sala... ", type : "status" , time : "05:47:45" },
    { from : "chimbinha" , to : "Todos" , text :" entra na sala... ", type : "status" , time : "05:47:58" },
    { from : "chimbinha" , to : "xyz" , text :" mensagem digitada" , type : "private_message" , time : "05:48:04" },
    { from : "chimbinha" , to : "Todos" , text : "sai da sala..." , type : "status" , time : "05:48:15" },
    { from : "chimbinha" , to : "Todos" , text : "entra na sala..." , type : "status" , time : "05:48:18" },
    { from : "chimbinha" , to : "xyz" , text : "mensagem digitada" , type : "message" , time : "05:48:23" },
    { from : "chimbinha" , to : "Todos" , text : "sai da sala..." , type : "status" , time : "05:48:30" }*/