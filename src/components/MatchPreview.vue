<template>
    <router-link :to="{name: 'MatchShow', params: { id:match.id }}">
    <div class="row justify-content-center match">
        <div class="col-10 col-lg-6 align-self-center">
            <div class="row">
                <div class="col-2 special-font align-self-center d-none d-sm-block">{{match.team1.name}}</div>
                <div class="col-4 col-sm-2 align-self-center text-center"><img :src="match.team1.logo" alt="" class="logo-team"></div>
                <div v-if="match.isPlayed" class="col-4 score">
                        <div class="row justify-content-center align-self-center">
                        {{match.scoreT1}} - {{match.scoreT2}}
                        </div>
                </div>
                <div v-else class="col-4 align-self-center">
                        <div v-if="match.groupName" class="row justify-content-center light-text">Groupe {{match.groupName.name}}</div>
                        <div v-if="match.stage" class="row justify-content-center light-text">{{match.stage.name}}</div>
                        <div class="row justify-content-center light-text">{{match.date.date | formatDate}}</div>
                        <div class="row justify-content-center light-text">{{match.stade.name}}</div>
                </div>
                <div class="col-4 col-sm-2 align-self-center text-center"><img :src="match.team2.logo" alt="" class="logo-team"></div>
                <div class="col-2 special-font align-self-center d-none d-sm-block">{{match.team2.name}}</div>
            </div>
        </div>
    </div>
    </router-link>
</template>

<script>

export default {
  name: 'MatchPreview',
  props: ['match']
}
</script>

<style>
a{
    text-decoration: none;
    color: black;
}

a:hover{
    text-decoration: none;
    color: black;
}

.light-text{
    font-size: 13px;
    color: gray;
    font-weight: light;
}
</style>
