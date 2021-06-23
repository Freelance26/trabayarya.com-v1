// $(document).ready(function(){
//     var socket = io();
// })


const chatForm = document.getElementById('message_form');
const chatUser = document.getElementById('userName');
const sender = document.getElementById('sender');
const messages = document.getElementById('messages');
const chatMensajes = document.getElementById('chat_area');


const mensajesChat = document.querySelector('.list-unstyled')


var socket = io()

socket.on('connect',()=> {
    var chatRoom = chatUser.value
    // console.log(chatRoom);
    // console.log('Connectado en cliente!');
    socket.emit('join', chatRoom, () => {
        console.log('an user has joined this chat');
    })

})

socket.on('newMessage', message => {
    // console.log('recibido en cliente');
    //var template = document.getElementById('message-template').innerText;
    // console.log(template);
    // console.log(message);
    // var msg = Mustache.render(template,{
    //     text: message.text,
    //     sender: message.from
    // });
    // messages.append(msg)
    outputMessage(message)
    chatMensajes.scrollTop = chatMensajes.scrollHeight;

    
    // console.log(message+'enviado');
})

//message submit

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    var chatRoom = chatUser.value
    var username = sender.value
    // console.log(username);
    // console.log(chatRoom);
    
    
    var msg = e.target.elements.msg.value;
    // console.log(msg);
     socket.emit('chatMessage',{
         text:msg,
         room:chatRoom,
         sender:username,   
     }, () => {
         //callback para que se limpie el texto
         msg = ''
     })

     e.target.elements.msg.value = '';
     e.target.elements.msg.focus();
     
})

function outputMessage(mensaje){
    const div = document.createElement('div');
    div.classList.add('mensaje');
    div.innerHTML = `<li class="left">
    <div class="chat-body1">
        <span class="chat-name">${mensaje.from}</span>
        <br>
     ${mensaje.text}
    </div>
 </li> `;
 document.querySelector('.list-unstyled').appendChild(div);
}