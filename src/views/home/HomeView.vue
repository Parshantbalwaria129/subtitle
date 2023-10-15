<template>
    <VideoUpload></VideoUpload>
</template>

<script>
// import "./index.css";
import VideoUpload from "@/components/videoUpload/index.vue"


export default {
    name: "HomeView",

    components: {
        VideoUpload,
    },

    mounted() {
        console.log("home page");
    },
};
</script>
