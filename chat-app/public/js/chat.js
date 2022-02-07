const socket = io();
socket.on("message",(msg)=>{
    console.log(msg);
})

const $messageForm = document.querySelector("#message-form");
const $submitBtn = $messageForm.querySelector('button');
const $inputValue = $messageForm.querySelector('input');
const $shareLocation = document.querySelector('#shareLocation');

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