// import Vue from "vue"

let vue
class Store {
    constructor(options) {
        this._mutations = options.mutations
        this._actions = options.actions
        console.log(4, options, this)
        this.state = new vue({
            data: options.state
        })
        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this)
    }
    commit(type, payload) {
        const entry = this._mutations[type]
        if (entry) {
            entry(this.state, payload)
        } else {
            console.error('没有方法')
        }
    }
    dispatch(type, payload) {
        const entry = this._actions[type]
        if (entry) {
            entry(this, payload)
        } else {
            console.error('没有方法')
        }
    }
}

function install(_vue) {
    vue = _vue
    vue.mixin({
        beforeCreate() {
            console.log(this)
            if (this.$options.store) {
                vue.prototype.$store = this.$options.store
            }
        }
    })
}
export default {
    Store,
    install
}