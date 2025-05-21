import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import api from './axios.js';

window.Pusher = Pusher;


const echo = new Echo({
    broadcaster: 'reverb',
    key: '381rlxplslmo6mwe5eiy',
    wsHost: 'localhost',
    wsPort: 8080,
    forceTLS: false,
    encrypted: false,
    enabledTransports: ['ws', 'wss'],
    authEndpoint: api + '/broadcasting/auth',
    auth: {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    },
})

export default echo;