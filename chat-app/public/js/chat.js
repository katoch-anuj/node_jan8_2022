const socket = io();


//Elements
const $messageForm = document.querySelector("#message-form");
const $submitBtn = $messageForm.querySelector('button');
const $inputValue = $messageForm.querySelector('input');
const $shareLocation = document.querySelector('#shareLocation');
const $messages = document.querySelector("#messages");
const $sidebar = document.querySelector(".chat__sidebar");

//template
const $messageTemplate = document.querySelector("#message-template").innerHTML;
const $locationTemplate = document.querySelector("#location-template").innerHTML;
const $sideBarTemplate = document.querySelector("#sidebar-template").innerHTML;

//autoscroll
const autoScroll = () =>{

    const newMessage = $messages.lastElementChild;
    const marginHeight = parseInt(getComputedStyle(newMessage).marginBottom);
    const newMessageHeight = newMessage.offsetHeight+marginHeight;

    const messageSectionHeight = $messages.offsetHeight;
    const containerHeight = $messages.scrollHeight;
    const scrollTopPosition = $messages.scrollTop;
    
    if(scrollTopPosition+messageSectionHeight>=containerHeight-newMessageHeight){
        $messages.scrollTop = containerHeight;
    }
}

socket.on("message",(msg)=>{
    const renderTemplate = Mustache.render($messageTemplate,{
        message:msg.text,
        timeStamp:moment(msg.createdAt).format('H:mm a'),
        username:msg.username
    })
    $messages.insertAdjacentHTML('beforeend',renderTemplate)
    autoScroll();
})
socket.on("LocationMessage",(message)=>{
    const html = Mustache.render($locationTemplate,{
        url:message.url,
        timeStamp:moment(message.createdAt).format('H:mm a'),
        username:message.username
    });
    $messages.insertAdjacentHTML("beforeend",html)
    autoScroll()
})
socket.on('userList',({room,usersInroom})=>{
    const html = Mustache.render($sideBarTemplate,{
        room,
        users:usersInroom
    })
    $sidebar.innerHTML=html;

})
const urlSearchParams = new URLSearchParams(window.location.search);
const username =  urlSearchParams.get('username');
const room =  urlSearchParams.get('room')
socket.emit('joinRoom',{username,room},(msg)=>{
    if(msg){
        alert(msg);
        location.href='/';
    }
})

//Event Listeners
$messageForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    $submitBtn.setAttribute('disabled','disabled');
    const msg=e.target.elements.textValue.value;
    socket.emit('sendMessage',msg,(cbValue)=>{
        
        $submitBtn.removeAttribute('disabled');
        $inputValue.value="";
        $inputValue.focus()

        console.log(cbValue)
    });
})

$shareLocation.addEventListener("click",()=>{
    $shareLocation.setAttribute('disabled','disabled');
    if(!navigator.geolocation){
       return  alert("navigator not present")
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        const {latitude,longitude}= position.coords || {};
        socket.emit("SendLocation",{latitude, longitude},(acknowledgeMsg)=>{
            $shareLocation.removeAttribute('disabled');
            console.log(acknowledgeMsg);
        })
    })
})