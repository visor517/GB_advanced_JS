<template>
    <tr>
            <th scope="row">{{index+1}}</th>
            <td>{{ good.product_name }}</td>
            <td>{{ good.price }} руб.</td>
            <td class="text-center">
                <button type="button" class="btn btn-success btn-sm"
                @click="addToBasket">в корзину</button>
            </td>
        </tr>
</template>

<script>
export default {
    name: GoodItem,
    props: {
        good: Object,
        index: Number
    },
    methods: {  
        addToBasket() {
            fetch('/api/addToBasket', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/JSON'
                },
                body: JSON.stringify(this.good)
            })
            .catch(err => console.log(`Добавление ${this.good.product_name} не прошло`))
        }
    }
}
</script>
