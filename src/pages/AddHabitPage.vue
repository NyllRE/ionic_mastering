<style lang="scss">
.image-placeholder {
   font-size: 3em;
   height: 100%;
   width: 100%;
}
.input-wrapper {
   display: grid;
   place-self: center;
}

.color-input {
   background: none;
   border-radius: 5px;
   width: 30%;
}
</style>

<template lang="pug">

BaseLayout( title="add a memory" page-default-back-link="/memories" )
   form.ion-padding( @submit.prevent="saveHabit" )
      IonList
         IonItem 
            IonLabel( position="floating" ) Title
            IonInput( required v-model="form.title" )

         IonItem.center
            IonIcon.icon( :icon="form.icon" v-if="form.icon != ''" )
            IonButton( fill="clear" type="button" @click="modal = !modal" v-else )
               IonIcon( :icon="happy" slot="start" )
               | Choose Icon
         
         IonItem
            IonLabel Color
            input.color-input( type="color" v-model="form.color" )


         IonButton( expand="block" fill="outline" type="submit" ) submit

   IonModal( :is-open="modal" )
      IconChooser( @chosen="chosenIcon" )
   

</template>

<script setup>
import { IonList, IonItem, IonLabel, IonInput, IonButton, IonIcon, IonModal } from '@ionic/vue'
import { reactive, ref } from 'vue'
import { useRouter } from "vue-router"
import { piniaStore } from '@/store'
import { happy } from 'ionicons/icons'
import IconChooser from '../components/habits/IconChooser.vue'


const router = useRouter()
const store = piniaStore()
const modal = ref(false)

const form = reactive({
   title: '',
   icon: '',
   color: ''
})

const chosenIcon = async (icon) => {
   form.icon = icon
   modal.value = false
}


const saveHabit = () => {
   console.log(form.color);
   store.addHabit(form);

   router.replace('/habits')
}

</script>