fetch("http://localhost:3000/a?counter=10",{
    method:"GET"
}).then((response)=>{
    response.json().then((data)=>{
        console.log(data);
    })
})