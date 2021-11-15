<template>
    <div class="modal" tabindex="-1" id="basket">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Корзина</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
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
                            <tr v-for="(good, index) in goods" :good="good" :key="good.id_product" :index="index">
                                <th scope="row">{{index+1}}</th>
                                <td>{{ good.product_name }}</td>
                                <td>{{ good.price }} руб.</td>
                                <td class="text-center">
                                    <button type="button" class="btn btn-success btn-sm"
                                    @click="removeItem(good.product_name)">удалить</button>
                                </td>
                            </tr>
                            <tr v-if="goods.length == 0"><td colspan="4">Список пуст</td></tr>
                        </tbody>
                    </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    name: ModalBasket,
    props: {
        goods: Array
    },
    methods: {  
        removeItem(product_name) {
            fetch('/api/removeFromBasket', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/JSON'
                },
                body: JSON.stringify({product_name: product_name})
            })
            .then(
                res => this.$emit('update'),
                err => console.log(`Удаление ${this.good.product_name} не прошло`)
            )
        }
    }
}
</script>
