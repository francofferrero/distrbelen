/*import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Toolbar from 'primevue/toolbar'
import Paginator from 'primevue/paginator'
// import 'primevue/resources/themes/saga-blue/theme.css'
// import 'primevue/resources/primevue.min.css'
// import 'primevue/resources/primevue.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

const app = createApp(App)
app.use(router)
app.use(PrimeVue, { ripple: true })

app.component('Button', Button)
app.component('Card', Card)
app.component('InputText', InputText)
app.component('Toolbar', Toolbar)
app.component('Paginator', Paginator)

app.mount('#app')*/

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// PrimeVue
import PrimeVue from 'primevue/config'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Paginator from 'primevue/paginator'

//import 'primevue/resources/themes/saga-blue/theme.css'
//import 'primevue/resources/primevue.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

const app = createApp(App)
app.use(router)
app.use(PrimeVue)
app.component('Card', Card)
app.component('Button', Button)
app.component('Paginator', Paginator)

app.mount('#app')

