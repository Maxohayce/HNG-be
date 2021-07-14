const form = document.querySelector("form").value;

// submitForm = (event) => {

// }

const sendMail = (mail) => {
    fetch("", {
        action: "",
        method: "post",
        body: mail,
    }).then((response) => {
        return response.json();
    });
};

const formEvent = form.addEventListener("submit", (event) => {
    event.preventDefault();

    let mail = new FormData(form);

    
    sendMail(mail);
})