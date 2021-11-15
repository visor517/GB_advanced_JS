<template>
    <div class="d-flex align-items-center">
        <input id="search-input" type="text" class="goods-search mx-3" v-model="searchLine" />
        <button id="search-button" class="btn btn-outline-light cart-button"
            type="button" @click="filterGoods">Искать</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchLine: ''
        }
    },
    methods: {
        filterGoods() {
            this.$emit('search', this.searchLine)
        }
    }
}
</script>
