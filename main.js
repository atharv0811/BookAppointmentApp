let btn = document.querySelector('.btn');
let NameInput = document.querySelector("#name");
let EmailInput = document.querySelector("#email");
btn.addEventListener('mouseover', (e) => {
    e.preventDefault();
    if (NameInput.value == '') {
        console.log("Please enter your name");
    }
    else {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (EmailInput.value == '') {
                console.log("please enter email address")
            }
            else {
                localStorage.setItem(NameInput.value, EmailInput.value);
            }
        })

    }
})
btn.addEventListener('mouseout', (e) => {
    e.preventDefault();
    if (NameInput.value == '' || EmailInput.value == '') {
        console.log("You have not entered any value");
    }
    else {
        console.log(NameInput.value);
        console.log(localStorage.getItem(NameInput.value));
        console.log("Success");
    }
})