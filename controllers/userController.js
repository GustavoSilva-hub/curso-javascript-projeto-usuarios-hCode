class UserController {

    constructor(formId, tBodyId) {
        this.formEl = document.getElementById(formId);
        this.tBodyEl = document.getElementById(tBodyId);
        this.onSubmit();
    }

    onSubmit() {

        this.formEl.addEventListener("submit", event => {
            event.preventDefault();

            let btn = this.formEl.querySelector("[type=submit]");

            console.log(this.formEl.reset);

            btn.disabled = true;

            let values = this.getFormValues();

            if (values) {
                this.getPhoto().then(
                    (content) => {
                        values.photo = content;
                        this.addLine(values);
                        this.formEl.reset();
                        btn.disabled = false;
                    }, (error) => {
                        console.error(error);
                    }
                )
            }


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

            if (filePhoto) {
                fileReader.readAsDataURL(filePhoto);
            } else {
                resolve('dist/img/boxed-bg.jpg');
            }
        })
    }

    getFormValues() {

        let user = {};
        let isValid = true;

        [...this.formEl.elements].forEach(function (field, index) {

            if (['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value) {
                field.parentElement.classList.add('has-error');

                isValid = false;
            }


            if (field.name == "gender") {

                if (field.checked) {
                    user[field.name] = field.value;
                }

            } else if (field.name == "admin") {
                user[field.name] = field.checked;
            } else {
                user[field.name] = field.value;
            }

        })

        if (!isValid) {
            return isValid;
        }

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

        userLine.dataset.user = JSON.stringify(dataUser);

        userLine.innerHTML = `
        <td>
          <img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm">
        </td>
        <td>${dataUser.name}</td>
        <td>${dataUser.email}</td>
        <td>${dataUser.admin ? 'Sim' : 'Não'}</td>
        <td>${Utils.dateFormat(dataUser.register)}</td>
        <td>
          <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
          <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        </td>`

        this.tBodyEl.appendChild(userLine);

        this.updateCount();
    }

    updateCount(){

        let numberUsers = 0;
        let numberAdmin = 0;

        [...this.tBodyEl.children].forEach(tr=>{

            numberUsers++;

            let user = JSON.parse(tr.dataset.user);

            if(user._admin) numberAdmin++;
        });
        document.getElementById('numbers-of-users').innerText=`${numberUsers}`;
        document.getElementById('numbers-of-admins').innerText=`${numberAdmin}`;
    }


}