<template>
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
                <GoodItem class="goods-item" 
                    v-for="(good, index) in goods"
                    :good="good"
                    :key="good.id_product"
                    :index="index"
                ></GoodItem>
                <tr v-if="goods.length == 0"><td colspan="4">Список пуст</td></tr>
            </tbody>
        </table>
</template>

<script>
import GoodItem from './GoodItem.vue'

export default {
    components: {
        GoodItem
    },
    props: ['goods']
}
</script>
