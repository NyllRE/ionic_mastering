<script setup>
import { 
   IonIcon, 
   IonLabel, 
   IonPage,
   IonTabBar, 
   IonTabButton, 
   IonTabs,
   IonRouterOutlet,
} from '@ionic/vue';
import { personCircle, time } from 'ionicons/icons';
</script>


<template lang="pug">

IonPage 
   Transition( name="fade" )
      IonTabs(
         @ionTabsWillChange="beforeTabChange" @ionTabsDidChange="afterTabChange" )
         IonRouterOutlet
         IonTabBar( slot="bottom" )
            IonTabButton( tab="habits" href="/habits" )
               IonIcon( :icon="personCircle" )
               IonLabel Habits
            IonTabButton( tab="timer" href="/timer" )
               IonIcon( :icon="time" )
               IonLabel Timer

</template>


<style lang="scss">

</style>