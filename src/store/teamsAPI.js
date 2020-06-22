import Axios from 'axios'

function findAll () {
  return Axios.get('http:localhost:8000/api/teams')
    .then(response => response.data['hydra:member'])
    .catch(error => console.log(error.response))
}