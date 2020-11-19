<template>
    <div class="container h-100 cont-padding">
        <h1>Oups ! La page que vous recherchez n'existe pas !</h1>
        <button class="backhome btn btn-info"><router-link to="/">Retour à l'acceuil</router-link></button>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.backhome a{
    color: white;
    text-decoration: none;
    margin-top: 15px;
}
</style>
