import { defineStore } from 'pinia';

const habits = [
	{
		id: String(Math.floor(Math.random() * (10 ** 10))),
		title: 'Github Commit',
		dailyComment: [],
		color: '#4f5',
		icon: 'codeSlash',
	},
]

export const piniaStore = defineStore('main', {
	state: () => ({ habits }),
	getters: {
		habit(state) { return (id) => state.habits.find((memory) => memory.id === id) },
	},
	actions: {
		addHabit(habit) {
			const newMemory = {
				id: String(Math.floor(Math.random() * (10 ** 10))),
				title: habit.title,
				color: habit.color,
				icon: habit.icon,
			}

			this.habits.unshift(newMemory);
		},
		removeHabit(habitId) {
			this.habits.find(this.habits.id === habitId);
		}
	}
})