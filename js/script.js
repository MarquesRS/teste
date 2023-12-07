
document.getElementById("projects-btn-id").addEventListener('click', function(event) {
    const BTN = document.getElementById("projects-btn-id");
    if (BTN.textContent == "NEXT") {
        BTN.textContent  = "PREVIOUS";
    }else {BTN.textContent  = "NEXT";}
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


