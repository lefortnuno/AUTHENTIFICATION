import axios from 'axios';

const IP = `192.168.8.102`;
const PORT = `:5010`;

export default axios.create({
    baseURL: `http://` + IP + PORT + `/api/utilisateur`
});