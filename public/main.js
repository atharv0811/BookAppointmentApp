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
        let userid = btn.getAttribute("dataUserId");
        let info = {
            id: userid, name: NameInput.value, pno: PnoInput.value, email: EmailInput.value
        }
        let infoJson = JSON.stringify(info);
        if (userid) {
            axios.post(`/edit-data`, { info }, {
                headers: {
                    'Content-Type': "application/json"
                }
            }).then(() => {
                NameInput.value = '';
                PnoInput.value = '';
                EmailInput.value = '';
                btn.removeAttribute('dataUserId');
                AppointmetList.textContent = "";
                showUser();
                btn.value = 'Submit';
            })
        }
        else {
            axios.post('/post-data', infoJson, {
                headers: {
                    'Content-Type': "application/json"
                }
            }).then(res => {
                AppointmetList.textContent = "";
                showUser();
            }).catch(err => console.log(err));
        }
    }
});

async function showUser() {
    let response = await axios.get('/get-data');
    let inforparsed = response.data;
    for (let i = 0; i < inforparsed.length; i++) {
        let li = document.createElement('li');
        li.className = "list-group-item";
        li.setAttribute("userid", inforparsed[i].id);
        var delbutton = document.createElement('button');
        delbutton.className = "btn btn-danger btn-sm float-right m-0 delete w-25";
        delbutton.appendChild(document.createTextNode("X"));
        var Editbutton = document.createElement('button');
        Editbutton.className = "btn mr-1 btn-info btn-sm float-right m-0 edit w-25";
        Editbutton.appendChild(document.createTextNode("Edit"));
        li.appendChild(document.createTextNode(inforparsed[i].name + " " + "|" + " " + inforparsed[i].phoneNo + " " + "|" + " " + inforparsed[i].email + " " + "|" + " "));
        li.appendChild(delbutton);
        li.appendChild(Editbutton);
        AppointmetList.appendChild(li);
    }

}

AppointmetList.addEventListener('click', clearLi);
AppointmetList.addEventListener('click', editLi);
function clearLi(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are you sure?')) {
            let Parli = e.target.parentElement;
            let userid = Parli.getAttribute("userid");

            axios.post(`/delete-data`, { userid }).then(() => {
                AppointmetList.removeChild(Parli);
            }).catch(err => console.log(err));
        }
    }
}
function editLi(e) {
    if (e.target.classList.contains('edit')) {
        let Parli = e.target.parentElement;
        let userid = Parli.getAttribute('userid');
        let name = Parli.textContent.split('|')[0].trim();
        let pno = Parli.textContent.split('|')[1].trim();
        let email = Parli.textContent.split('|')[2].trim();
        NameInput.value = name;
        PnoInput.value = pno;
        EmailInput.value = email;
        AppointmetList.removeChild(Parli);
        btn.setAttribute("dataUserId", userid);
        btn.value = "Update";
    }
}

window.addEventListener('DOMContentLoaded', () => {
    showUser();
})

function update(userid, newData) {
    let data = JSON.parse(newData);
    let liToUpdate = document.querySelector(`li[userid="${userid}"]`);
    if (liToUpdate) {
        liToUpdate.textContent = `${data.name} | ${data.pno} | ${data.email}`;
        var delbutton = document.createElement('button');
        delbutton.className = "btn btn-danger btn-sm float-right m-0 delete w-25";
        delbutton.appendChild(document.createTextNode("X"));
        var Editbutton = document.createElement('button');
        Editbutton.className = "btn mr-1 btn-info btn-sm float-right m-0 edit w-25";
        Editbutton.appendChild(document.createTextNode("Edit"));
        liToUpdate.appendChild(delbutton);
        liToUpdate.appendChild(Editbutton);
    }
}