document.addEventListener('DOMContentLoaded', function () {
    const toggleInput = document.getElementById('url-input');
    document.getElementById('login-btn-id').addEventListener('click', function () {
        const isVisible = window.getComputedStyle(toggleInput).display !== 'none';
        if (isVisible) {
            toggleInput.style.display = 'none';
            alert("Hidden Feature: OFF");
        } else {
            toggleInput.style.display = 'block';
            alert("Hidden Feature: ON");
        }
    });
});
(function(){emailjs.init("4defkbxSGY-74NYL_");})();
document.getElementById('form-id').addEventListener('submit', function(event) 
{
    event.preventDefault();
    email_object = {
        name: document.getElementById('form-name').value,
        email: document.getElementById('form-email').value,
        subject: document.getElementById('form-subject').value,
        message: document.getElementById('form-message').value,
    };
    emailjs.send("service_pablo-marques","template_mreyi5l", email_object)
    document.getElementById('form-id').reset();
    const NOTIFICATION = document.getElementById('email-sent-id');
    NOTIFICATION.classList.add('show')
    setTimeout(function() {
        NOTIFICATION.classList.remove('show');
    }, 4000);
    const FORM_BTN = document.getElementById("form-submit-btn-id");
    FORM_BTN.disabled = true;  
    setTimeout(function() {
        FORM_BTN.disabled = false;
    }, 4000);
});
var URL = document.getElementById('url-input');
document.getElementById('url-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        let abortController = new AbortController();
        let timeout = setTimeout(() => abortController.abort(), 10000);
        fetch(
            `http://localhost:4000/verify?URL=${URL.value}`, 
            { signal: abortController.signal }
        ).then(res => {
            if (res.status == 200) {
                window.location.href = `http://localhost:4000/download?URL=${URL.value}`;
            } else {
                console.log('URL inválida');
            }
        });
        clearTimeout(timeout);
    }
});


