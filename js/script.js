const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: undefined },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
]

class BasketItem {
    constructor({title, price}) {
        this.title = title
        this.price = price
        this.quantity = 1
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
        if (Array.isArray(items)) {
            for (let item of items) {
                this.content.push(new BasketItem(item))
            } 
        }
        else this.content.push(new BasketItem(items))
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
    
        return tableHeader + tableContent
    }
}

let myBasket = new Basket
myBasket.addItems(goods)    // пока весь товар добавляем в корзину

const $goodsList = document.querySelector('.goods-list')

const renderGoodsItem = (index, title = 'нет названия', price = 'бесценно') => {
    return `<tr class="goods-item"><th scope="row">${index}</th><td>${title}</td><td>${price} руб.</td></tr>`
}

const renderGoodsList = list => {
    let goodsList = list.map((item, index) => renderGoodsItem(++index, item.title, item.price))
    let tableHeader = '<tr><th scope="col">#</th><th scope="col">Название</th><th scope="col">Цена</th></tr>'

    let tableContent = goodsList.length > 0 ? goodsList.join('') : '<tr><td colspan="3">Список пуст</td></tr>'

    $goodsList.innerHTML = tableHeader + tableContent
}
  
renderGoodsList(goods)

function renderBasket(basket) {
    $goodsList.innerHTML = basket.render()
}
