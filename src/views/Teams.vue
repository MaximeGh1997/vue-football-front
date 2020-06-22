<template>
  <div class="teams">
    <div v-for="team in teams" :key="team.id" class="team">
      <h3>{{team.name}}</h3>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'

const token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1OTI4NDYzNjIsImV4cCI6MTU5Mjg0OTk2Miwicm9sZXMiOlsiUk9MRV9VU0VSIiwiUk9MRV9BRE1JTiJdLCJ1c2VybmFtZSI6ImFkbWluIiwiZmlyc3RuYW1lIjoiTWF4aW1lIiwibGFzdG5hbWUiOiJHaGlzbGFpbiJ9.OyjubgR__HHpGOQJ1qQbE-PnGIAgYnDeUchta14UJcyTmRL7c3CH_LWciIQD1G7t0P0JQYNTVXKFb5ipyjNQA3DP_ihrR0XZEYEfKcVW8d714L2Xa1s3RyWUbT7AEVdWTk_utxEthuEh5_6IDdQdm6JgBctWi3F08KYpTEGb2qFjbjYCnrS47q7AwMYF9OFpQ5WkfUMGoOtHA5171Ao_qJP6U0l_1_iTsYN4Ko3GM88NRf4BcPMKNL5jelQsR9P0dgzTqtcTJY9Ju36x9FeG0JSmVAFsQLLK-pInKX2yjDabVhRgrEuOx6EOfidTNk9yCkhR2btvjwY04tTR5TBxCJ9vK1cW7TXFoiD6VCbkm072oosrVzMBdK89tmNPs8rQ-Z28jE-6zm9mWeln5CCZ5joaSPFpvjfsu-cLUGl19ZpLSL8xHtgeULvdzPDk9-bWzzdpX2NPpz3kmXvtUuPMi2i-dmzJXML7Ca2U86f9hK112oO6O-zI-uzyVyzt8IPcwLhrdv_SGvgXv75w_t2LQdPSfHDVoIdW6QszHOeTiVzYv0kW92tjTKqEkUu-8azJZsiGp3fvAKUkdaYRAqKaVkS2AzqOMgOQ8KPAU8R66h7E2R4m4W3KLoTKbtj-EjyyYuA7lP8S4o0hSkWTkZVTmTgWZ0l0EbMBPgv5DGJdtsE'

export default {
  name: 'teamsAPI',
  data () {
    return {
      teams: []
    }
  },
  created () {
    Axios
      .get('http://localhost:8000/api/teams', {
        headers: {
          'x-auth-token': token
        }
      })
      .then(response => (this.teams = response.data['hydra:member']))
  }
}
</script>
