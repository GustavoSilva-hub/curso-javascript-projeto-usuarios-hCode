var fields = document.querySelectorAll("#form-user-create [name]");
var user = {};

function addLine(dataUser){
    var tBodyUsers = document.getElementById('table-users');

    tBodyUsers.innerHTML = `<tr>
    <td>
      <img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm">
    </td>
    <td>${dataUser.name}</td>
    <td>${dataUser.email}</td>
    <td>${dataUser.admin}</td>
    <td>${dataUser.birth}</td>
    <td>
      <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
      <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
    </td>
  </tr>`;
}

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
    addLine(user);
})

