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

            this.getPhoto().then(
                 (content) => {
                    values.photo = content;
                    this.addLine(values);
                }, (error) => {
                    console.error(error);
                }
            )
        })

    }

    getPhoto() {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();

            let filterElements = [...this.formEl.elements].filter(element => {
                if (element.name === 'photo') {
                    return element;
                }
            });

            let filePhoto = filterElements[0].files[0];

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (e) => {
                reject(e);
            }

            if(filePhoto){
                fileReader.readAsDataURL(filePhoto);
            }else{
                resolve('dist/img/boxed-bg.jpg');
            }
        })
    }

    getFormValues() {

        let user = {};

        [...this.formEl.elements].forEach(function (field, index) {
            if (field.name == "gender") {

                if (field.checked) {
                    user[field.name] = field.value;
                }

            } else if(field.name=="admin"){
                user[field.name] = field.checked;
            }else{
                user[field.name]=field.value;
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

    addLine(dataUser, tBodyId) {

        let userLine = document.createElement("tr");

        userLine.innerHTML = `
        <td>
          <img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm">
        </td>
        <td>${dataUser.name}</td>
        <td>${dataUser.email}</td>
        <td>${dataUser.admin?'Sim':'Não'}</td>
        <td>${dataUser.birth}</td>
        <td>
          <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
          <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        </td>`

        this.tBodyEl.appendChild(userLine);
    }


}