Vue.component('goods-list', {
    props: ['goods'],
    template: `
        <table id="goods-list" class="table table-success table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Название</th>
                    <th scope="col">Цена</th>
                    <th scope="col" class="text-center">Навигация</th>
                </tr>
            </thead>
            <tbody>
                <goods-item class="goods-item" v-for="(good, index) in goods"
                :good="good" :key="good.id_product" :index="index"></goods-item>
                <tr v-if="goods.length == 0"><td colspan="3">Список пуст</td></tr>
            </tbody>
        </table>
    `
})

Vue.component('goods-item', {
    props: {
        good: Object,
        index: Number
    },
    template: `
        <tr>
            <th scope="row">{{index+1}}</th>
            <td>{{ good.product_name }}</td>
            <td>{{ good.price }} руб.</td>
            <td class="text-center">
                <button type="button" class="btn btn-success btn-sm"
                @click="addToBasket">в корзину</button>
            </td>
        </tr>
    `,
    methods: {  
        addToBasket() {
            fetch('/api/addToBasket', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/JSON'
                },
                body: JSON.stringify(this.good)
            })
            .then(
                res => console.log(res.status),
                err => console.log(`Добавление ${this.good.product_name} не прошло`)
            )
        }
    }
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
                type="button" @click="filterGoods">Искать</button>
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
        getData(url) {
            return (
                fetch(url)
                .then(res => res.json())
            )
        },
        filterGoods(searchLine) {
            const regexp = new RegExp(searchLine, 'i')
            this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name))
        }
    },
    mounted() {
        this.getData(`/api/catalog`)
        .then(
            res => {
                this.goods = res
                this.filteredGoods = res
            },
            err => console.log('Не получен каталог')
        )

        this.getData(`/api/basket`)
        .then(
            res => this.basketGoods = res,
            err => console.log('Не получена корзина')
        )
    }
})
    