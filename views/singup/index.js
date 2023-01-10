
// Regex
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
const NAME_REGEX = /([A-ZÀ-ÿ][-,a-z. ']+[ ]*)$/;
const PHONE_REGEX = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/

// Selects
const form = document.querySelector('#form')
const emailInput = document.querySelector('#email-input')
const passwordInput = document.querySelector('#password-input')
const btn = document.querySelector('#btn')
const matchInput = document.querySelector('#password-match-input')
const nameInput = document.querySelector('#name-input')
const phoneInput = document.querySelector('#phone-input')

// False cosnt
let emailUser = false;
let phoneUser = false;
let nameUser = false;
let passwordUser = false;
let matchUser = false;

//funtion validation
const validation = (e, validation, element) => {
    
    btn.disabled = !nameUser || !phoneUser|| !emailUser || !passwordUser || !matchUser ? true : false;

    if (e.target.value === '') {
        element.classList.remove('border-2', 'border-rose-500');

    }if (validation) {
        element.classList.remove('border-2', 'border-rose-500');
        element.classList.add('border-2', 'border-green-500');
    } else {
        element.classList.remove('border-2', 'border-green-500');
        element.classList.add('border-2', 'border-rose-500');
    }
};

// Events all the inputs
nameInput.addEventListener('input', e => {
    nameUser = NAME_REGEX.test(e.target.value);
    validation(e, nameUser, nameInput);
});
phoneInput.addEventListener('input', e => {
    phoneUser = PHONE_REGEX.test(e.target.value);
    console.log(e.target.value);
    validation(e, phoneUser, phoneInput);
});

emailInput.addEventListener('input', e => {
    emailUser = EMAIL_REGEX.test(e.target.value);
    validation(e, emailUser, emailInput);
});

passwordInput.addEventListener('input', e => {
    passwordUser = PASSWORD_REGEX.test(e.target.value);
    validation(e, passwordUser, passwordInput);
});

matchInput.addEventListener('input', e => {
    matchUser = e.target.value === passwordInput.value;
    validation(e, matchUser, matchInput);
});

const fetchName = async (desicion) =>{
    const res = await fetch(`https://api.geoapify.com/v1/ipinfo?&apiKey=e08e63d2d9fe45fcb103230fc2f74971`, {method: 'GET'})
    const data = await res.json();
    const code = data.country.phone_code
    const nameCountry = data.country.names.en
    
    if (desicion){
        phoneInput.value = `+${code}`;
    }


    return nameCountry
}
fetchName('20');

//Event the form
form.addEventListener('submit', async e =>{
    e.preventDefault();
    console.log(phoneInput.value);
    const nameCountry = await fetchName();
    try {
        const newUser = {
            email: emailInput.value,
            password: passwordInput.value,
            name: nameInput.value,
            phone: phoneInput.value,
            country: nameCountry,
            role: 'client',
            
        }
        console.log(newUser);
        await axios.post('/api/users', newUser);
        window.location.pathname = '/login/'
    } catch (error) {
        console.log(error);
        const p = document.createElement('p');
        p.innerHTML = error.response.data.error
        p.classList.add('font-bold', 'text-center')
        form.children[7] ? form.children[7].remove() : null
        form.append(p);

    }

   
});

