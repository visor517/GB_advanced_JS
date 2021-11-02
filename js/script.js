function makeGETRequest(url) {
    return new Promise((resolve, reject) => {
        let xhr
    
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest()
        } else if (window.ActiveXObject) { 
            xhr = new ActiveXObject("Microsoft.XMLHTTP")
        }
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status == 200) resolve(xhr.responseText)
                else reject(`Запрос не прошел ${url}. Ошибка:${xhr.status}`)
            }
        }
    
        xhr.open('GET', url, true)
        xhr.send()
    })
}

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

class GoodsItem {
    constructor(product_name, price) {
        this.product_name = product_name
        this.price = price
    }
    render(index='-') {
        return `<tr class="goods-item">
                    <th scope="row">${index}</th>
                    <td>${this.product_name}</td>
                    <td>${this.price}</td>
                </tr>`
    }
}

class GoodsList {
    constructor() {
        this.goods = []
        this.filteredGoods = []
    }
    filterGoods(value) {
        const regexp = new RegExp(value, 'i')
        this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name))
    }
    fetchGoods() {
        return new Promise((resolve, reject) => {
            makeGETRequest(`${API_URL}/catalogData.json`)
            .then(
                res => {
                    this.goods = JSON.parse(res)
                    this.filteredGoods = JSON.parse(res)
                    resolve(true)
                },
                error => {
                    console.log(error)
                    reject('error')
                }
            )
        })
    }
    render() {
        const tableHeader = `<tr>
            <th scope="col">#</th>
            <th scope="col">Название</th>
            <th scope="col">Цена</th>
        </tr>`
        const tableContent = this.filteredGoods.map((good, index) => {
            const goodItem = new GoodsItem(good.product_name, good.price)
            return goodItem.render(++index)
        }).join('')

        return tableHeader + tableContent
    }
}

class BasketItem extends GoodsItem {
    constructor({product_name, price, quantity}) {
        super(product_name, price)
        this.quantity = quantity
    }
    upQuantity() {
        this.quantity++
    }
    downQuantity() {
        if (this.quantity > 0) this.quantity--
    }
    getTotalPrice() {
        return this.price * this.quantity
    }
    render(index='-') { 
        return `<tr class="goods-item">
                    <th scope="row">${index}</th>
                    <td>${this.product_name || 'нет названия'}</td>
                    <td>${this.quantity || 0}</td>
                    <td>${this.price || '-'} руб.</td>
                    <td>${this.getTotalPrice() || '-'} руб.</td>
                </tr>`
    }
}

class Basket {
    constructor() {
        this.contents = []
    }
    getBasket() {
        return new Promise((resolve, reject) => {
            makeGETRequest(`${API_URL}/getBasket.json`)
            .then(
                res => {
                    this.contents = JSON.parse(res).contents.map(item => new BasketItem(item))
                    resolve(true)
                },
                error => {
                    console.log(error)
                    reject('error')
                }
            )
        })
    }
    addToBasket(item) {
        return new Promise((resolve, reject) => {
            makeGETRequest(`${API_URL}/addToBasket.json`)
            .then(
                res => {
                    console.log(JSON.parse(res))    
                    resolve(true)                   
                },                                  
                error => {                          
                    console.log(error)
                    reject('error')
                }
            )
        }) 
    }
    deleteFromBasket(itemId) {
        return new Promise((resolve, reject) => {
            makeGETRequest(`${API_URL}/deleteFromBasket.json`)
            .then(
                res => {
                    // this.contents = JSON.parse(res)
                    console.log(JSON.parse(res))
                    resolve(true)
                },
                error => {
                    console.log(error)
                    reject('error')
                }
            )
        }) 
    }
    getTotalPrice() {
        return this.contents.reduce((acum, item) => acum + item.getTotalPrice(), 0)
    }
    render() {
        let itemsList = this.contents.map((item, index) => item.render(++index))
        const tableHeader = `<tr>
            <th scope="col">#</th>
            <th scope="col">Название</th>
            <th scope="col">Кол-во</th>
            <th scope="col">Цена</th>
            <th scope="col">Сумма</th>
        </tr>`
        let tableContent = itemsList.length > 0 ? itemsList.join('') : '<tr><td colspan="3">Список пуст</td></tr>'
        let tableSum = `<tr><th colspan="5">Итог: ${this.getTotalPrice()} руб.</th></tr>`
    
        return tableHeader + tableContent + tableSum
    }
}

const $goodsList = document.querySelector('#goods-list')
const $searchButton = document.querySelector('#search-button')
const $searchInput = document.querySelector('#search-input')
const $basketButton = document.querySelector('#basket-button')
const $formButton = document.querySelector('#form-button')

const list = new GoodsList()
list.fetchGoods().then(_ => $goodsList.innerHTML = list.render())

const myBasket = new Basket()
myBasket.getBasket()

$searchButton.addEventListener('click', e => {
    const value = $searchInput.value
    list.filterGoods(value)
    $goodsList.innerHTML = list.render()
})

$basketButton.addEventListener('click', e => {
    $goodsList.innerHTML = myBasket.render()
})

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
