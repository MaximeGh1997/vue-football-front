<template>
<div>
  <div v-if="comment.author.id == decodeToken.decodeToken.id" class="row justify-content-start justify-content-md-center mt-2 mb-2">
    <div class="col-auto align-self-center text-center">
      <img src="../assets/unknow.jpg" :alt="comment.author.username" class="avatar-medium">
    </div>
    <div class="col-auto col-sm-6 comment" style="background-color: rgb(230, 230, 230);">
      <p class="font-italic">Vous <span v-if="comment.rating">avez donné une note de {{comment.rating}}</span></p>
      <p class="content">{{comment.content}}</p>
      <p class="light-text font-italic date">{{comment.createdAt | formatDate}}</p>
    </div>
  </div>
  <div v-else class="row justify-content-end justify-content-md-center mt-2 mb-2">
    <div class="col-auto col-sm-6 comment">
      <p class="font-italic">
        <router-link :to="{name: 'UserShow', params: { id:comment.author.id }}">
          @{{comment.author.username}}
        </router-link>
        <span v-if="comment.rating"> à donné une note de {{comment.rating}}</span>
      </p>
      <p class="content">{{comment.content}}</p>
      <p class="light-text font-italic date">{{comment.createdAt | formatDate}}</p>
    </div>
    <div class="col-auto align-self-center text-center">
        <img src="../assets/unknow.jpg" :alt="comment.author.username" class="avatar-medium">
    </div>
  </div>
</div>
</template>

<script>
import jwtDecode from 'jwt-decode'
import { mapGetters } from 'vuex'

const token = window.localStorage.getItem('authToken')
var userId = null
if (token != null) {
  const jwtData = jwtDecode(token)
  userId = jwtData.id
  console.log(userId)
}

export default {
  name: 'Comment',
  props: ['comment'],
  data () {
    return {
      token: token,
      userId: userId
    }
  },
  computed: mapGetters('authentication', {
    decodeToken: 'decodeToken'
  })
}
</script>

<style>

</style>
