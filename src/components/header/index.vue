<template>
    <div class="nav">
        <div class="left-nav">
            <a href="/" class="d-inline-flex text-decoration-none">
            <router-link class="navlink" to="/">
                <img src="@/assets/2.png" width="40" height="32" alt="Seek Sub">
            </router-link>
        </a>
        </div>
        <div class="right-nav">
            <router-link class="navlink" to="/">Home</router-link>
            <router-link class="navlink" to="/about">about</router-link>
        </div>

    </div>

</template>

<script>

import './index.css'

export default {
    name: 'NavBar'
}
</script>