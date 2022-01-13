const form =document.querySelector(".location-form");
  const inputEle=form.querySelector('input');
  const msg1=document.querySelector('.msg1');
  const msg2=document.querySelector('.msg2');

const getData = (address)=>{
    msg1.textContent="Loading...";
    msg2.textContent="";
    const url = `/weather?address=${address}`;
    fetch(url)
    .then((response) => {
      response.json().then((data) => {
          if (data.error){
            msg1.textContent=data.error
              return console.log("error", data .error)

          }
          msg2.textContent=data.weather;
          msg1.textContent=data.location;
      });
      
    })
}

  
  
  form.addEventListener('submit',(e)=>{
      e.preventDefault();
      const location= inputEle.value;
      getData(location);
      
  })
 
  
