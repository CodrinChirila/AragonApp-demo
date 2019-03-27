import Aragon, { providers } from '@aragon/client'

const initializeApp = () => {
	const app = new Aragon(
		new providers.WindowMessage(window.parent)
	)

	const view = document.getElementById('view')

	const increment = document.getElementById('increment')
	const decrement = document.getElementById('decrement')

	increment.onClick = () => {
		app.increment()
	}
	decrement.onClick = () => {
		app.decrement()
	}


	app.state().subscribe(
		(state) => {
			view.innerHTML = `The counter is ${state ? state.count : 0}`
		},
		(err) => {
			view.innerHTML = 'An error occured, check the console'
			console.log(err)
		}
	)
}

const sendMessageToWrapper = (name, value) => {
	window.parent.postMessage({ from: 'app', name, value }, '*')
}

window.addEventListener('message', ({ data}) => {
	if (data.from !== 'wrapper') {
		return
	}
	if (data.name === 'ready') {
		sendMessageToWrapper('ready', true)
		initializeApp()
	}
})