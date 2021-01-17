class UserController {

    constructor(formId, tBodyId) {
        this.formEl = document.getElementById(formId);
        this.tBodyEl = document.getElementById(tBodyId);
        this.onSubmit();
    }

    onSubmit() {

        this.formEl.addEventListener("submit", event => {
            event.preventDefault();

            let values = this.getFormValues();

            this.getPhoto((content)=>{
                values.photo = content;

                this.addLine(values);
            });          
        })

    }

    getPhoto(callBack){
        let fileReader = new FileReader();

        let filterElements = [...this.formEl.elements].filter(element =>{
            if(element.name === 'photo'){
                return element;
            }
        });

        let filePhoto = filterElements[0].files[0];

        fileReader.onload = ()=>{
            callBack(fileReader.result);
        };

        fileReader.readAsDataURL(filePhoto);
    }

    getFormValues() {

        let user = {};

        [...this.formEl.elements].forEach(function (field, index) {
            if (field.name == "gender") {
                if (field.checked) {
                    console.log("Checked", field);
                    user[field.name] = field.value;
                }

            } else {
                user[field.name] = field.value;
            }

        })

        return new User(
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.password,
            user.photo,
            user.admin);
    }

    addLine(dataUser, tBodyId){
    
        this.tBodyEl.innerHTML = `<tr>
        <td>
          <img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm">
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
    

}