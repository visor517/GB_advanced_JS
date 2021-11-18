<template>
    <div>
        <ModalBasket :goods="basketGoods" v-on:update="refreshBasket" />
        <header class="container-xxl bg-success">
            <nav class="navbar navbar-light">
                <div class="container-fluid">
                    <a class="nav-link active" aria-current="page" href="index.html"><h2 class="text-light">eShop</h2></a>
                    <div class="d-flex">
                        <Search v-on:search="filterGoods"></Search>
                        <button class="btn btn-outline-light cart-button ms-3" type="button"
                            data-bs-toggle="modal" data-bs-target="#basket"
                            @click="refreshBasket">Корзина</button>
                    </div>
                </div>
            </nav>
        </header>
        <main class="container-xxl bg-light p-3">
            <div class="row">
                <div class="col">
                    <GoodsList :goods="filteredGoods" />
                </div>
            </div>
            <!-- <div class="row mt-3 p-3">
                <div class="col-4 border p-3 d-none">
                    <h3>Форма обратной связи</h3>
                    <FeedbackForm />
                </div>
            </div> -->
        </main>
    </div>
</template>

<script>
import Search from './components/Search.vue'
import GoodsList from './components/GoodsList.vue'
import ModalBasket from './components/ModalBasket.vue'
import FeedbackForm from './components/FeedBackForm.vue'

export default {
    components: {
        Search,
        GoodsList,
        ModalBasket,
        FeedbackForm,
    },
    data() {
        return {
            goods: [],
            filteredGoods: [],
            basketGoods: [],
            isVisibleBasket: false
        }
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
        },
        refreshBasket() {
            this.getData(`/api/basket`)
            .then(
                res => this.basketGoods = res,
                err => console.log('Не получена корзина')
            )
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

        this.refreshBasket()
    }
}
</script>
