const formDOM = document.querySelector('.task-form');
const dogInputNameDom = document.querySelector('.dog-input-name');
const dogInputBreedDom = document.querySelector('.dog-input-breed');
const dogInputAgeDom = document.querySelector('.dog-input-age');
const dogInputDateDom = document.querySelector('.dog-input-date');
const formAlertDOM = document.querySelector('.form-alert');
const loadingDom = document.querySelector('.loading-text');
const dogsDOM = document.querySelector('.dogs');

const showDogs = async () => {
    loadingDom.style.visibility = 'visible';
    try {
        const dogs = await axios.get('/api/v1/dogs')
        console.log(dogs);
        if (dogs.data.allDogs.length < 0) {
            dogsDOM.innerHTML = '<h5 class="empty-list">No dogs in your list</h5>'
            loadingDOM.style.visibility = 'hidden';
            return
        }
        const allDogs = dogs.data.allDogs.map((dog) => {
            const { _id: dogID, name, breed, age } = dog
            return `<div class="single-task task-completed">
            <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
            <h5><span><i class="far fa-check-circle"></i></span>${breed}</h5>
            <h5><span><i class="far fa-check-circle"></i></span>${age}</h5>
            <div class="task-links">
            



<!-- edit link -->
<a href="dog.html?id=${dogID}"  class="edit-link">
<i class="fas fa-edit"></i>
</a>
<!-- delete btn -->
<button type="button" class="delete-btn" data-id="${dogID}">
<i class="fas fa-trash"></i>
</button>
</div>
</div>`
        }).join('')
        dogsDOM.innerHTML = allDogs

    } catch (error) {
        console.log(error);
        dogsDOM.innerHTML =
            '<h5 class="empty-list">There was an error, please try later....</h5>'
    }
    loadingDom.style.visibility = 'hidden';
}

showDogs()

// delete task /api/tasks/:id

dogsDOM.addEventListener('click', async (e) => {
    const el = e.target
    if (el.parentElement.classList.contains('delete-btn')) {
        loadingDom.style.visibility = 'visible'
        const id = el.parentElement.dataset.id
        try {
            await axios.delete(`/api/v1/dogs/${id}`)
            showDogs()
        } catch (error) {
            console.log(error);
        }
    }
    loadingDom.style.visibility = 'hidden';
})


// form

formDOM.addEventListener('submit', async (e) => {
    e.preventDefault()
    const name = dogInputNameDom.value;
    const breed = dogInputBreedDom.value;
    const age = dogInputAgeDom.value;

    try {
        await axios.post('/api/v1/dogs', {
            name,
            breed,
            age
        })
        showDogs()
        dogInputNameDom.value = ''
        dogInputBreedDom.value = ''
        dogInputAgeDom.value = ''
        formAlertDOM.style.display = 'block'
        formAlertDOM.textContent = `success, pet added`
        formAlertDOM.classList.add('text-success')
    } catch (error) {
        console.log(error.response.data);
        formAlertDOM.style.display = 'block'
        formAlertDOM.innerHTML = `error, please try again`
    }
    setTimeout(() => {
        formAlertDOM.style.display = 'none',
            formAlertDOM.classList.remove('text-success')
    }, 2000)
})