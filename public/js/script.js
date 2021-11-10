// отключен
const $formButton = document.querySelector('#form-button')

$formButton.addEventListener('click', e => {
    $formName = document.querySelector('#formName')
    $formPhone = document.querySelector('#formPhone')
    $formEmail = document.querySelector('#formEmail')
    $formComment = document.querySelector('#formComment')

    if (/[^a-zа-яё]/i.test($formName.value)) {
        $formName.classList.add("border-danger")
    }
    else $formName.classList.remove("border-danger")

    if (!/^\+7\(\d{3}\)\d{3}-\d{4}$/.test($formPhone.value)) {
        $formPhone.classList.add("border-danger")
    }
    else $formPhone.classList.remove("border-danger")

    if (!/^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/.test($formEmail.value)) {
        $formEmail.classList.add("border-danger")
    }
    else $formEmail.classList.remove("border-danger")

    e.preventDefault()
})
