
const obj = {
    foo: 'foo',
    bar: 'bars',
    baz: {
        b: '555'
    }
}

function defineReactive(obj, key, val) {
    observe(val)
    Object.defineProperty(obj, key, {
        get() {
            console.log('get', key)
            return val
        },
        set(newVal) {
            if (newVal !== val) {
                console.log('set', key, newVal)
                observe(newVal)
                val = newVal
            }
        }
    })
}

function observe(obj) {
    if (typeof obj !== 'object' || obj == null) {
        return
    }
    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key])
    })
}
function set(obj, key, value) {
    defineReactive(obj, key, value)
}

observe(obj)
// defineReactive(obj, 'foo', 'foo')
obj.foo
obj.foo = 'fooooooo'
obj.bar
obj.bar = 'barrrrrr'
// obj.baz.a
// obj.baz.a = '222'
obj.baz = { b: '333' }
obj.baz.b = '3344'
set(obj, 'a', '123')
obj.a
