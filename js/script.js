function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
let activeButton = null;
document.querySelectorAll('.dropdown-btn').forEach(button => {
    button.addEventListener('click', () => {
        const dropdownContent = button.nextElementSibling;
        const isVisible = dropdownContent.classList.contains('show');
        document.querySelectorAll('.dropdown-content').forEach(content => {
            content.classList.remove('show');
        });
        if (!isVisible) {
            dropdownContent.classList.add('show');
        }
        if (activeButton && activeButton !== button) {
            activeButton.style.backgroundColor = ''; 
        }
        if (button !== activeButton) {
            button.style.backgroundColor = '#F5B63F'; 
            activeButton = button; 
        } else {
            button.style.backgroundColor = '';
            activeButton = null; 
        }
    });
});
document.addEventListener('DOMContentLoaded', async function () {
    const toggleInput = document.getElementById('url-input');
    document.getElementById('login-btn-id').addEventListener('click', function () {
        const isVisible = window.getComputedStyle(toggleInput).display !== 'none';
        if (isVisible) {
            toggleInput.style.display = 'none';
        } else {
            toggleInput.style.display = 'block';
        }
        document.querySelector('.login-box').classList.remove('fade-out');
        document.querySelector('.login-box').classList.add('fade-in');
        document.getElementById('web-site-content-id').classList.add('hidden');
    });

    document.getElementById('login-form-cancel-btn-id').addEventListener('click', function() {
        document.querySelector('.login-box').classList.remove('fade-in');
        document.querySelector('.login-box').classList.add('fade-out');
        document.getElementById('web-site-content-id').classList.remove('hidden');
    });

    document.getElementById('login-form-submit-btn-id').addEventListener('click', function(event) {
        event.preventDefault();
        const username = document.getElementById("login-form-username");
        const password = document.getElementById("login-form-password");

        fetch("https://marquess.ch/api/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Response:', data);
            if (data.status === "Ok") {
                document.cookie = `authToken=${data.token}; path=/;`;
                document.querySelector('.login-box').classList.remove('fade-in');
                document.querySelector('.login-box').classList.add('fade-out');
                document.getElementById('web-site-content-id').classList.remove('hidden');
                username.value = "";
                password.value = "";
                console.log(getCookie('authToken'));
            }
            else {
                username.value = "";
                password.value = "";
                username.placeholder = "Invalid username or password";
                password.placeholder = "Invalid username or password";
            }
        })
    });
});

(function(){emailjs.init("4defkbxSGY-74NYL_");})();
document.getElementById('form-id').addEventListener('submit', async function(event) 
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
document.getElementById('url-input').addEventListener('keydown', async function(event) {
/*
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
*/
});
function trunc_text() {
    let parent = document.querySelector('.swiper-slide__slide-wrapper');
    let parent_height  = parent.clientHeight;
    let parent_padding = parseInt(window.getComputedStyle(parent).paddingBottom);
    let parent_len = parent_height + parent_padding;

    let title = document.querySelector('.slide-wrapper__title');
    let title_height = title.clientHeight;
    let title_margin = parseInt(window.getComputedStyle(title).marginBottom); 
    let title_len = title_height + title_margin;

    let box_len = parent_len - title_len;

    console.log(box_len);

    document.querySelectorAll('.slide-wrapper__content').forEach(content => {
        let diff = box_len - content.clientHeight;
        
       
        
        if (diff < 0) {
            content.innerText = content.innerText.slice(0, content.clientHeight + diff) + '...';
        }
    });
}
trunc_text()