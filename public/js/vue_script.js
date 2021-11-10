const API_URL = 'http://localhost:3000/api'

Vue.component('goods-list', {
    props: ['goods'],
    template: `
        <table id="goods-list" class="table table-success table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Название</th>
                    <th scope="col">Цена</th>
                </tr>
            </thead>
            <tbody>
                <goods-item class="goods-item" v-for="(good, index) in goods" :good="good" :key="good.id_product" :index="index"></goods-item>
                <tr v-if="goods.length == 0"><td colspan="3">Список пуст</td></tr>
            </tbody>
        </table>
    `
})

Vue.component('goods-item', {
    props: ['good', 'index'],
    template: `
        <tr>
            <th scope="row">{{index+1}}</th>
            <td>{{ good.product_name }}</td>
            <td>{{ good.price }} руб.</td>
        </tr>
    `
})

Vue.component('search', {
    data() {
        return {
            searchLine: ''
        }
    },
    template: `
        <div class="d-flex align-items-center">
            <input id="search-input" type="text" class="goods-search mx-3" v-model="searchLine" />
            <button id="search-button" class="btn btn-outline-light cart-button"
                type="button" v-on:click="filterGoods">Искать</button>
        </div>
    `,
    methods: {
        filterGoods() {
            this.$emit('search', this.searchLine)
        }
    }
})

Vue.component('basket', {
    props: ['goods'],
    template: `
        <div class="modal" tabindex="-1" id="basket">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Корзина</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <goods-list :goods="goods"></goods-list>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `
})

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        basketGoods: [],
        isVisibleCart: false
    },
    methods: {
        makeGETRequest(url) {
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
        },
        makePOSTRequest(url, data, callback) {
            let xhr
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
            xhr.open('POST', url, true)
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
            xhr.send(data)
        },
        filterGoods(searchLine) {
            const regexp = new RegExp(searchLine, 'i')
            this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name))
        }
    },
    mounted() {
        this.makeGETRequest(`${API_URL}/catalog`)
        .then(
            res => {
                this.goods = JSON.parse(res)
                this.filteredGoods = JSON.parse(res)
            },
            error => console.log(error)
        )

        this.makeGETRequest(`${API_URL}/basket`)
        .then(
            res => {
                this.basketGoods = JSON.parse(res).contents
            },
            error => console.log(error)
        )
    }
})
    