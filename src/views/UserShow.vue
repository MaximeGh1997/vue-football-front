<template>
<div class="container register min-vh-100">
    <div class="row align-items-center">
        <div class="col-md-2 text-center">
            <img src="../assets/unknow.jpg" :alt="user.username" class="avatar mb-3">
        </div>
        <div class="col-md-10 text-center text-md-left">
            <h1 style="overflow: hidden;">{{user.firstname}} {{user.lastname}}</h1>
            <p class="font-italic">@{{user.username}} <span v-if="this.$route.params.id == decodeToken.decodeToken.id">- {{user.email}}</span></p>
        </div>
        <div class="col-lg-10 offset-lg-2">
            <div v-if="this.$route.params.id == decodeToken.decodeToken.id" class="mt-3 text-center text-md-left">
                <!--<div class="alert alert-{{ label }}">
                    <p>{{ message | raw }}</p>
                </div>-->
                <router-link class="btn btn-info d-block d-md-inline-block mr-2 mb-2" to="/profile/edit">Modifier mon profil</router-link>
                <a href="#" class="btn btn-warning d-block d-md-inline-block mr-2 mb-2">Modifier mon mot de passe</a>
                <a href="#" class="btn btn-danger d-block d-md-inline-block mb-2">Supprimer mon image de profil</a>
            </div>
        </div>
    </div>
    <h3 v-if="this.$route.params.id == decodeToken.decodeToken.id" class="special-font mt-5">Mes commentaires</h3>
    <h3 v-else class="special-font mt-5">Commentaires de <em>@{{user.username}}</em></h3>
    <hr class="mb-3">
    <Comment v-for="comment in comments" :key="comment.id" :comment="comment" :onProfile="true"/>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Comment from '@/components/Comment.vue'

export default {
  components: {
    Comment
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      user: state => state.users.user,
      comments: state => state.comments.UserComments
    }),
    ...mapGetters('authentication', {
      decodeToken: 'decodeToken'
    })
  },
  created () {
    this.$store.dispatch('users/findUser', { id: this.$route.params.id })
    this.$store.dispatch('comments/findByUser', { id: this.$route.params.id })
  },
  methods: {

  }
}
</script>

<style>

</style>
