<template>
    <form>
        <div class="mb-3">
            <label for="formName" class="form-label">Имя:</label>
            <input type="text" class="form-control" id="formName" placeholder="только буквы">
        </div>
        <div class="mb-3">
            <label for="formPhone" class="form-label">Телефон:</label>
            <input type="text" class="form-control" id="formPhone" placeholder="+7(000)000-0000">
        </div>
        <div class="mb-3">
            <label for="formEmail" class="form-label">E-mail:</label>
            <input type="email" class="form-control" id="formEmail">
        </div>
        <div class="mb-3">
            <label for="formComment" class="form-label">Комментарий:</label>
            <textarea class="form-control" placeholder="Оставьте комментарий" id="formComment"></textarea>
        </div>
        <button type="submit" class="btn btn-primary" id="form-button">Проверить</button>
    </form>
</template>

// const $formButton = document.querySelector('#form-button')

// $formButton.addEventListener('click', e => {
//     $formName = document.querySelector('#formName')
//     $formPhone = document.querySelector('#formPhone')
//     $formEmail = document.querySelector('#formEmail')
//     $formComment = document.querySelector('#formComment')

//     if (/[^a-zа-яё]/i.test($formName.value)) {
//         $formName.classList.add("border-danger")
//     }
//     else $formName.classList.remove("border-danger")

//     if (!/^\+7\(\d{3}\)\d{3}-\d{4}$/.test($formPhone.value)) {
//         $formPhone.classList.add("border-danger")
//     }
//     else $formPhone.classList.remove("border-danger")

//     if (!/^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/.test($formEmail.value)) {
//         $formEmail.classList.add("border-danger")
//     }
//     else $formEmail.classList.remove("border-danger")

//     e.preventDefault()
// })
