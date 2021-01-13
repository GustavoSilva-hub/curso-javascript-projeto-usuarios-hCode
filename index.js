var fields = document.querySelectorAll("#form-user-create [name]");
var user = {};

document.getElementById("form-user-create").addEventListener("submit",function(event){
    /*o objeto event pode pegar até as teclas
      que estavam pressionadas durante o evento*/
    event.preventDefault();//Cancela a ação padrão do evento
    fields.forEach(function(field,index){
        if(field.name == "gender"){
            if(field.checked){
                console.log("Checked", field);
                user[field.name]=field.value;
            }
    
        }else{
            user[field.name]=field.value;
        }
    
    })
    console.log(user);
})

