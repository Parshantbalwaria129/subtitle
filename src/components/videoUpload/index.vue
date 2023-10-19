<template>
    <div class="container-xxl bd-gutter">
        <div class="col-md-8 mx-auto text-center">
            <img class="web-logo" src="@/assets/2.png" alt="Seek Sub">
            <h1 class="mb-3 fw-semibold lh-1">Let create some subtitles</h1>
            <p class="lead mb-4">
                Create, Edit, and Perfect Subtitles with Ease
            </p>
            <div class="input-group mb-3">
                <label class="input-group-text btn btn-lg btn-primary mx-auto" for="VideoFileInput">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                        class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                        <path
                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                    </svg> Upload Video
                    <input type="file" id="VideoFileInput" hidden @change="handleFileChange">
                </label>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "VideoUpload",

    data() {
        return {
            selectedVideoFile: null,
            videoDuration: null,
            videoURL: null,
        }
    },

    methods: {
        loadVideoAndGetDuration(file) {
            return new Promise((resolve, reject) => {
                const videoElement = document.createElement('video');
                videoElement.preload = 'metadata';

                videoElement.onloadedmetadata = () => {
                    const duration = videoElement.duration;
                    videoElement.src = ''

                    if (!isNaN(duration)) {
                        resolve(duration)
                    }
                    else {
                        reject(new Error("Video Duratrion is not available"))
                    }
                }

                videoElement.onerror = () => {
                    videoElement.src = ''

                    reject(new Error('Failed to load video'))
                }

                videoElement.src = URL.createObjectURL(file);
            })
        },

        handleFileChange(event) {
            const selectedFile = event.target.files[0];
            const allowedExtensions = ['mp4', 'avi', 'mkv', 'mov'];
            const selectedFileExtension = selectedFile.type.split('/').pop().toLowerCase();
            if (allowedExtensions.includes(selectedFileExtension)) {
                if (selectedFile.size > 2048 * 1000000) {
                    alert("File size exceed 2GB, please select a smaller file");
                    return;
                }


                this.loadVideoAndGetDuration(selectedFile)
                    .then((videoDuration) => {
                        this.videoURL = URL.createObjectURL(event.target.files[0]);

                        const videoFilePayload = {
                            name: selectedFile.name,
                            size: selectedFile.size,
                            url: this.videoURL,
                            duration: videoDuration,
                        }
                        console.log(videoFilePayload.url)

                        this.$store.commit('setVideoFile', videoFilePayload)
                        this.$router.push('/editor')
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }

        },
    }
}

</script>
