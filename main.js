let btn = document.querySelector('.btn');
let NameInput = document.querySelector("#name");
let EmailInput = document.querySelector("#email");
let PnoInput = document.querySelector('#pno');
let AppointmetList = document.getElementById('Appoinments');
let flag = false;

btn.addEventListener('mouseover', (e) => {
    e.preventDefault();
    if (NameInput.value === '') {
        console.log("Please enter your name");
    }
    else if (PnoInput.value === '') {
        console.log("Please enter a valid phone number");
    }
    else if (EmailInput.value === '') {
        console.log("Please enter an email address");
    }
    else {
        flag = true;
    }
});

btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (flag) {
        let info = {
            name: NameInput.value, pno: PnoInput.value, email: EmailInput.value
        }
        let infoJson = JSON.stringify(info);
        axios.post('https://crudcrud.com/api/bf0d598366004c4a86aed24e0da3f86d/appointmentData', infoJson, {
            headers: {
                'Content-Type': "application/json"
            }
        }).then(res => showUser(res.data)).catch(err => console.log(err));


    }
});

function showUser(data) {
    let inforparsed = data;
    let li = document.createElement('li');
    li.className = "list-group-item";
    li.setAttribute("userid", inforparsed._id);
    var delbutton = document.createElement('button');
    delbutton.className = "btn btn-danger btn-sm float-right m-0 delete w-25";
    delbutton.appendChild(document.createTextNode("X"));
    var Editbutton = document.createElement('button');
    Editbutton.className = "btn mr-1 btn-info btn-sm float-right m-0 edit w-25";
    Editbutton.appendChild(document.createTextNode("Edit"));
    li.appendChild(document.createTextNode(inforparsed.name + " " + "|" + " " + inforparsed.pno + " " + "|" + " " + inforparsed.email + " " + "|" + " "));
    li.appendChild(delbutton);
    li.appendChild(Editbutton);
    AppointmetList.appendChild(li);
    console.log("success");
}

AppointmetList.addEventListener('click', clearLi);
AppointmetList.addEventListener('click', editLi);
function clearLi(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are you sure?')) {
            let Parli = e.target.parentElement;
            let userid = Parli.getAttribute("userid");
            axios.delete(`https://crudcrud.com/api/bf0d598366004c4a86aed24e0da3f86d/appointmentData/${userid}`).then(() => {
                AppointmetList.removeChild(Parli);
            }).catch(err => console.log(err));
        }
    }
}
function editLi(e) {
    if (e.target.classList.contains('edit')) {
        let Parli = e.target.parentElement;
        AppointmetList.removeChild(Parli);
        let name = Parli.textContent.split('|')[0].trim();
        let pno = Parli.textContent.split('|')[1].trim();
        let email = Parli.textContent.split('|')[2].trim();
        localStorage.removeItem(name);
        NameInput.value = name;
        PnoInput.value = pno;
        EmailInput.value = email;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    axios.get('https://crudcrud.com/api/bf0d598366004c4a86aed24e0da3f86d/appointmentData').then(res => {
        for (let i = 0; i < res.data.length; i++) {
            showUser(res.data[i]);
        }
    }).catch(err => {
        console.log(err);
    })
})