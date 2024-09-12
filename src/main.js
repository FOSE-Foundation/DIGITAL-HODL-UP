import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Oruga from '@oruga-ui/oruga-next'
import { bulmaConfig } from '@oruga-ui/theme-bulma'

// Import the FontAwesome core
import { library } from '@fortawesome/fontawesome-svg-core';

// Import the FontAwesome icon component
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Import specific icons
import { faCube, faInfinity, faWrench, faBoltLightning, faCapsules, faCat, faSquare, faTableCells, faPersonDigging, faHammer, faCirclePlus, faPlugCirclePlus, faPlug, faCartPlus, faCheck, faBars, faServer, faXmark, faFire, faSnowflake, faOilWell, faCircle, faUser, faBitcoinSign, faArrowLeft, faHashtag, faShield, faRobot, faUserSlash, faCircleQuestion, faPerson } from '../node_modules/@fortawesome/free-solid-svg-icons';

// Add the imported icons to the library
library.add(faCube, faInfinity, faWrench, faBoltLightning, faCapsules, faCat, faSquare, faTableCells, faPersonDigging, faHammer, faCirclePlus, faPlugCirclePlus, faPlug, faCartPlus, faCheck, faBars, faServer, faXmark, faFire, faSnowflake, faOilWell, faCircle, faUser, faBitcoinSign, faArrowLeft, faHashtag, faShield, faRobot, faUserSlash, faCircleQuestion);

import '@oruga-ui/theme-bulma/dist/bulma.css'

const app = createApp(App)

app.component("fa-icon", FontAwesomeIcon);

app.use(createPinia())
app.use(router)
app.use(Oruga, {
    iconPack: 'fa',
    iconComponent: 'fa-icon',
    ...bulmaConfig
})
app.provide("$oruga", app.config.globalProperties.$oruga);


app.mount('#app');
