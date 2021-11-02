const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
        isVisibleCart: false
    },
    methods: {
        makeGETRequest(url) {
            console.log('Запрос')
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
        filterGoods() {
            const regexp = new RegExp(this.searchLine, 'i')
            this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name))
        }
    },
    mounted() {
        this.makeGETRequest(`${API_URL}/catalogData.json`)
        .then(
            res => {
                this.goods = JSON.parse(res)
                this.filteredGoods = JSON.parse(res)
            },
            error => console.log(error)
        )
    }
})
