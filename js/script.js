const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: undefined },
    { title: undefined, price: 350 },
    { title: 'Shoes', price: 250 },
]

const renderGoodsItem = (index, title = 'нет названия', price = 'бесценно') => `<tr class="goods-item"><th scope="row">${index}</th><td>${title}</td><td>${price} руб.</td></tr>`
  
const renderGoodsList = list => {
    let goodsList = list.map((item, index) => renderGoodsItem(++index, item.title, item.price))
    let tableHeader = '<tr><th scope="col">#</th><th scope="col">Название</th><th scope="col">Цена</th></tr>'

    let tableContent = goodsList.length > 0 ? goodsList.join('') : '<tr><td colspan="3">Список пуст</td></tr>'

    document.querySelector('.goods-list').innerHTML = tableHeader + tableContent
}
  
renderGoodsList(goods)