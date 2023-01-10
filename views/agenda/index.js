const form = document.querySelector('#form');
const btn = document.querySelector('#btn-agend');
const dateday = document.querySelector('#day');
const services = document.querySelector('#services');

dateday.addEventListener('input', async () =>{
    try {
    const {data: day } = await axios.post('/api/agend', 'day');
    if (day === '' ) {
       day.responses.status === 401;
        
    }
    } catch (error) {
    const p = document.createElement('p');
    p.innerHTML = error.response.data.error
    p.classList.add('font-bold', 'text-center')
    form.children[4] ? form.children[4].remove() : null
    form.append(p);
    }
});


form.addEventListener('submit', async e =>{
    e.preventDefault();
    try {
        const cita = {
            dia: dateday.value,
            servicios: services.value
        }
        console.log(cita);
        await axios.post('/api/agend', cita);
    } catch (error) {
        console.log(error);
        const p = document.createElement('p');
        p.innerHTML = error.response.data.error
        p.classList.add('font-bold', 'text-center')
        form.children[4] ? form.children[4].remove() : null
        form.append(p);

    }
});