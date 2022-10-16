<!-- @format -->

<template lang="pug">
  
ion-app
  ion-router-outlet

</template>
<script>
	import { PushNotifications } from '@capacitor/push-notifications';
	import { LocalNotifications } from '@capacitor/local-notifications';
	import { IonApp, IonRouterOutlet } from '@ionic/vue';
	import { defineComponent } from 'vue';

	export default defineComponent({
		name: 'App',
		components: {
			IonApp,
			IonRouterOutlet,
		},
	});
</script>

<script setup>
	import { useLocalStorage } from '@vueuse/core';
	import { onMounted } from 'vue';
	import Tabs from './pages/Tabs.vue';



	onMounted(async () => {
		const version = window.localStorage.getItem('storageVersion');
		if (version == '0.1.4') {
			// dont do anything
		} else {
			//=> do the data migration
			window.localStorage.setItem('storageVersion', '0.1.4');
    }
    
		await LocalNotifications.requestPermissions().then((e) => {
			console.log(e);
		}).catch((e) => console.log(e));

		await LocalNotifications.addListener(
			'localNotificationActionPerformed',
			(notification) => {
				console.log('Notification action received: ', notification.actionId);
			}
		);

		await LocalNotifications.addListener(
			'localNotificationActionPerformed',
			(notification) => {
				console.log(
					`Notification ${notification.notification.title} was ${notification.actionId}ed.`
				);
			}
		);

	});
</script>
