<template lang="pug">
  
ion-app
  ion-router-outlet

</template>
<script>
import { PushNotifications } from '@capacitor/push-notifications';
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  }
});
</script>

<script setup>
import { useLocalStorage } from '@vueuse/core';
import { onMounted } from 'vue'
import Tabs from './pages/Tabs.vue';

onMounted(() => {
  const version = window.localStorage.getItem('storageVersion')
  if (version == '0.1.4') {
    // dont do anything
  } else {
    //=> do the data migration
    window.localStorage.setItem('storageVersion', '0.1.4')
  }
  

})



const addListeners = async () => {
  await PushNotifications.addListener('registration', token => {
    console.info('Registration token: ', token.value);
  });

  await PushNotifications.addListener('registrationError', err => {
    console.error('Registration error: ', err.error);
  });

  await PushNotifications.addListener('pushNotificationReceived', notification => {
    console.log('Push notification received: ', notification);
  });

  await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
    console.log('Push notification action performed', notification.actionId, notification.inputValue);
  });
}

const registerNotifications = async () => {
  let permStatus = await PushNotifications.checkPermissions();

  if (permStatus.receive === 'prompt') {
    permStatus = await PushNotifications.requestPermissions();
  }

  if (permStatus.receive !== 'granted') {
    throw new Error('User denied permissions!');
  }

  await PushNotifications.register();
}

const getDeliveredNotifications = async () => {
  const notificationList = await PushNotifications.getDeliveredNotifications();
  alert('delivered notifications', ...notificationList)
}

getDeliveredNotifications()
</script>