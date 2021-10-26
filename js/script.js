function makeGETRequest(url, callback) {
    var xhr
  
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest()
    } else if (window.ActiveXObject) { 
      xhr = new ActiveXObject("Microsoft.XMLHTTP")
    }
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        callback(xhr.responseText)
      }
    }
  
    xhr.open('GET', url, true)
    xhr.send()
}

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

class GoodsItem {
    constructor(title, price) {
        this.title = title
        this.price = price
    }
    render(index='-') {
        return `<tr class="goods-item">
                    <th scope="row">${index}</th>
                    <td>${this.title}</td>
                    <td>${this.price}</td>
                </tr>`
    }
}

class GoodsList {
    constructor() {
        this.goods = []
    }
    fetchGoods(cb) {
        makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
            this.goods = JSON.parse(goods)
            cb()
        })
    }
    render() {
        const tableHeader = `<tr>
            <th scope="col">#</th>
            <th scope="col">Название</th>
            <th scope="col">Цена</th>
        </tr>`
        const tableContent = this.goods.map((good, index) => {
            const goodItem = new GoodsItem(good.product_name, good.price)
            return goodItem.render(++index)
        }).join('')

        return tableHeader + tableContent
    }
}

class BasketItem extends GoodsItem {
    constructor({title, price}) {
        super(title, price)
        this.quantity = 1
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
                    <td>${this.title || 'нет названия'}</td>
                    <td>${this.quantity || 0}</td>
                    <td>${this.price || '-'} руб.</td>
                    <td>${this.getTotalPrice() || '-'} руб.</td>
                </tr>`
    }
}

class Basket {
    constructor() {
        this.content = []
    }
    addItems(items) {
        if (!Array.isArray(items)) items = [items]
        for (let item of items) {
            this.content.push(new BasketItem(item))
        } 
    }
    getTotalPrice() {
        return this.content.reduce((acum, item) => acum + item.getTotalPrice(), 0)
    }
    render() {
        let itemsList = this.content.map((item, index) => item.render(++index))
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

const $goodsList = document.querySelector('.goods-list')

const list = new GoodsList()
list.fetchGoods(() => {
    $goodsList.innerHTML = list.render()
})

let myBasket = new Basket()
myBasket.addItems(list.goods)    // пока весь товар добавляем в корзину
myBasket.content[1].upQuantity()    // поднимем кол-во для второго това (проверка)
myBasket.content[2].downQuantity()

function renderBasket(basket) {     // открытие корзины по кнопке
    $goodsList.innerHTML = basket.render()
}

// Метод, определяющий суммарную стоимость всех товаров сделал для корзины. Корзина по кнопке.
