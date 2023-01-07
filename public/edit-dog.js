const dogIDDOM = document.querySelector('.dog-edit-id');
const dogNameDOM = document.querySelector('.dog-edit-name');
const dogBreedDOM = document.querySelector('.dog-edit-nameBreed');
const dogAgeDOM = document.querySelector('.dog-edit-Age');
const editFormDOM = document.querySelector('.single-dog-form');
const editBtnDOM = document.querySelector('.dog-edit-btn');
const formAlertDOM = document.querySelector('.form-alert');
const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName

const showDog = async () => {
    try {
        const { data: { dog },
        } = await axios.get(`/api/v1/dogs/${id}`)
        const { _id: dogID, name, breed, age } = dog
        dogIDDOM.textContent = dogID
        dogNameDOM.value = name
        dogBreedDOM.value = breed
        dogAgeDOM.value = age
        tempName = name
    } catch (error) {
        console.error(error)
    }
}

showDog()

editFormDOM.addEventListener('submit', async (e) => {
    editBtnDOM.textContent = 'Loading...'
    e.preventDefault()
    try {
        const dogName = dogNameDOM.value
        const dogBreed = dogBreedDOM.value
        const dogAge = dogAgeDOM.value

        const dog = await axios.patch(`/api/v1/dogs/${id}`, {
            name: dogName,
            breed: dogBreed,
            age: dogAge,
        })

        const { _id: dogID, name, breed, age } = dog
        dogIDDOM.textContent = dogID
        dogNameDOM.value = name
        dogBreedDOM.value = breed
        dogAgeDOM.value = age
        tempName = name

        formAlertDOM.style.display = 'block'
        formAlertDOM.textContent = `success, edited task`
        formAlertDOM.classList.add('text-success')
    } catch (error) {
        console.log(error)
        dogNameDOM.value = tempName
        formAlertDOM.style.display = 'block'
        formAlertDOM.innerHTML = `error, please try again`
    }
    editBtnDOM.textContent = 'Edit'
    setTimeout(() => {
        formAlertDOM.style.display = 'none'
        formAlertDOM.classList.remove('text-success')
    }, 3000)
})

