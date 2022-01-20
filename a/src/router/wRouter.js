let Vue

class mRouter {
    constructor(options) {
        console.log(5, options, this)
        // this为 mRouter, 在对象上添加key($options), value是new过来的参数
        this.$options = options
        // 需要响应式属性
        Vue.util.defineReactive(this, 'current', '/')
        // this.current = '/'
        // 监控url变化 hash模式
        window.addEventListener('hashchange', () => {
            this.current = window.location.hash.slice(1)
        })
        window.addEventListener('load', () => {
            this.current = window.location.hash.slice(1)
        })
    }
}

mRouter.install = function (_Vue) {
    console.log(12, _Vue)
    Vue = _Vue
    Vue.mixin({
        beforeCreate() {
            console.log(16, this, Vue)
            if (this.$options.router) {
                // 根实例挂载router
                Vue.prototype.$router = this.$options.router
            }
        }
    })

    // 实现router-link 和 router-view组件
    Vue.component('router-link', {
        props: {
            to: {
                type: String,
                required: true
            }
        },
        render(h) {
            return h('a', { attrs: { href: '#' + this.to } }, this.$slots.default)
        }
    })
    Vue.component('router-view', {
        render(h) {
            // 获取path对应的component
            let component = null
            this.$router.$options.routes.forEach(item => {
                if (item.path === this.$router.current) {
                    component = item.component
                }
            })
            return h(component)
        }
    })
}

export default mRouter
