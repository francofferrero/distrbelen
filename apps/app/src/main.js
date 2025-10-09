import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import Aura from '@primevue/themes/aura'
import PrimeVue from 'primevue/config'

import AutoComplete from 'primevue/autocomplete'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Avatar from 'primevue/avatar'
import AvatarGroup from 'primevue/avatargroup'
import Badge from 'primevue/badge'
import BadgeDirective from 'primevue/badgedirective'
import Button from 'primevue/button'
import Breadcrumb from 'primevue/breadcrumb'
import Calendar from 'primevue/calendar'
import Card from 'primevue/card'
import CascadeSelect from 'primevue/cascadeselect'
import Carousel from 'primevue/carousel'
import Chart from 'primevue/chart'
import Checkbox from 'primevue/checkbox'
import Chip from 'primevue/chip'
import Chips from 'primevue/chips'
import ColorPicker from 'primevue/colorpicker'
import Column from 'primevue/column'
import ConfirmDialog from 'primevue/confirmdialog'
import ConfirmPopup from 'primevue/confirmpopup'
import ConfirmationService from 'primevue/confirmationservice'
import ContextMenu from 'primevue/contextmenu'
import DataTable from 'primevue/datatable'
import DataView from 'primevue/dataview'
import DatePicker from 'primevue/datepicker'
import Dialog from 'primevue/dialog'
import Divider from 'primevue/divider'
import Dropdown from 'primevue/dropdown'
import Editor from 'primevue/editor'
import Fieldset from 'primevue/fieldset'
import FileUpload from 'primevue/fileupload'
import Galleria from 'primevue/galleria'
import IconField from 'primevue/iconfield'
import Image from 'primevue/image'
import InlineMessage from 'primevue/inlinemessage'
import Inplace from 'primevue/inplace'
import InputIcon from 'primevue/inputicon'
import InputSwitch from 'primevue/inputswitch'
import InputText from 'primevue/inputtext'
import InputMask from 'primevue/inputmask'
import InputNumber from 'primevue/inputnumber'
import Knob from 'primevue/knob'
import Listbox from 'primevue/listbox'
import MegaMenu from 'primevue/megamenu'
import Menu from 'primevue/menu'
import Menubar from 'primevue/menubar'
import Message from 'primevue/message'
import MultiSelect from 'primevue/multiselect'
import OrderList from 'primevue/orderlist'
import OrganizationChart from 'primevue/organizationchart'
import OverlayPanel from 'primevue/overlaypanel'
import Paginator from 'primevue/paginator'
import Panel from 'primevue/panel'
import PanelMenu from 'primevue/panelmenu'
import Password from 'primevue/password'
import PickList from 'primevue/picklist'
import ProgressBar from 'primevue/progressbar'
import Rating from 'primevue/rating'
import RadioButton from 'primevue/radiobutton'
import Ripple from 'primevue/ripple'
import SelectButton from 'primevue/selectbutton'
import ScrollPanel from 'primevue/scrollpanel'
import ScrollTop from 'primevue/scrolltop'
import Skeleton from 'primevue/skeleton'
import Slider from 'primevue/slider'
import Sidebar from 'primevue/sidebar'
import SpeedDial from 'primevue/speeddial'
import SplitButton from 'primevue/splitbutton'
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import Steps from 'primevue/steps'
import StyleClass from 'primevue/styleclass'
import TabMenu from 'primevue/tabmenu'
import TieredMenu from 'primevue/tieredmenu'
import Textarea from 'primevue/textarea'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import Toolbar from 'primevue/toolbar'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Tag from 'primevue/tag'
import Timeline from 'primevue/timeline'
import ToggleButton from 'primevue/togglebutton'
import Tooltip from 'primevue/tooltip'
import Tree from 'primevue/tree'
import TreeSelect from 'primevue/treeselect'
import TreeTable from 'primevue/treetable'

import '@/assets/styles.scss'
import '@/assets/tailwind.css'
import { definePreset } from '@primevue/themes'

const app = createApp(App)

const Preset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{indigo.50}',
      100: '{indigo.100}',
      200: '{indigo.200}',
      300: '{indigo.300}',
      400: '{indigo.400}',
      500: '{indigo.500}',
      600: '{indigo.600}',
      700: '{indigo.700}',
      800: '{indigo.800}',
      900: '{indigo.900}',
      950: '{indigo.950}',
    },
  },
})

app.use(router)
app.use(createPinia())
app.use(PrimeVue, {
  theme: {
    preset: Preset,
    options: {
      primary: 'indigo',
      darkModeSelector: '.app-dark',
    },
  },
})
app.use(ToastService)
app.use(ConfirmationService)

// directives
app.directive('styleclass', StyleClass)
app.directive('tooltip', Tooltip)

// components
app.component('Accordion', Accordion)
app.component('AutoComplete', AutoComplete)
app.component('Avatar', Avatar)
app.component('AvatarGroup', AvatarGroup)
app.component('Badge', Badge)
app.component('Breadcrumb', Breadcrumb)
app.component('Button', Button)
app.component('Card', Card)
app.component('Carousel', Carousel)
app.component('CascadeSelect', CascadeSelect)
app.component('Chart', Chart)
app.component('Checkbox', Checkbox)
app.component('Chip', Chip)
app.component('ColorPicker', ColorPicker)
app.component('Column', Column)
app.component('ConfirmDialog', ConfirmDialog)
app.component('ConfirmPopup', ConfirmPopup)
app.component('ContextMenu', ContextMenu)
app.component('DataTable', DataTable)
app.component('DataView', DataView)
app.component('DatePicker', DatePicker)
app.component('Dialog', Dialog)
app.component('Divider', Divider)
app.component('Editor', Editor)
app.component('Fieldset', Fieldset)
app.component('FileUpload', FileUpload)
app.component('Galleria', Galleria)
app.component('IconField', IconField)
app.component('Image', Image)
app.component('Inplace', Inplace)
app.component('InputIcon', InputIcon)
app.component('InputMask', InputMask)
app.component('InputNumber', InputNumber)
app.component('InputText', InputText)
app.component('Knob', Knob)
app.component('Listbox', Listbox)
app.component('MegaMenu', MegaMenu)
app.component('Menu', Menu)
app.component('Menubar', Menubar)
app.component('Message', Message)
app.component('MultiSelect', MultiSelect)
app.component('OrderList', OrderList)
app.component('OrganizationChart', OrganizationChart)
app.component('Paginator', Paginator)
app.component('Panel', Panel)
app.component('PanelMenu', PanelMenu)
app.component('Password', Password)
app.component('PickList', PickList)
app.component('ProgressBar', ProgressBar)
app.component('RadioButton', RadioButton)
app.component('Rating', Rating)
app.component('SelectButton', SelectButton)
app.component('ScrollPanel', ScrollPanel)
app.component('ScrollTop', ScrollTop)
app.component('Slider', Slider)
app.component('Skeleton', Skeleton)
app.component('SpeedDial', SpeedDial)
app.component('SplitButton', SplitButton)
app.component('Splitter', Splitter)
app.component('SplitterPanel', SplitterPanel)
app.component('Steps', Steps)
app.component('TabMenu', TabMenu)
app.component('TabPanel', TabPanel)
app.component('Tag', Tag)
app.component('Textarea', Textarea)
app.component('TieredMenu', TieredMenu)
app.component('Timeline', Timeline)
app.component('Toast', Toast)
app.component('Toolbar', Toolbar)
app.component('ToggleButton', ToggleButton)
app.component('Tree', Tree)
app.component('TreeSelect', TreeSelect)
app.component('TreeTable', TreeTable)

app.mount('#app')
