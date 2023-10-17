<template>
    <div class="container-xxl bd-gutter">
        <div class="col-md-8 mx-auto text-center">
            <!-- <img class="web-logo" src="@/assets/2.png" alt="Seek Sub"> -->
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
            <div class="input-group mb-3">
                <label class="input-group-text btn btn-lg btn-primary mx-auto" for="printsubtitle">
                    print subtitle
                    <input type="button" id="printsubtitle" hidden @click="printsubtitle">
                </label>
            </div>
            <div class="input-group mb-3">
                <label class="input-group-text btn btn-lg btn-primary mx-auto" for="addSubtitle">
                    Add subtitle
                    <input type="button" id="addSubtitle" hidden @click="addSubtitle">
                </label>
            </div>
            <div class="input-group mb-3">
                <label class="input-group-text btn btn-lg btn-primary mx-auto" for="updateSubtitle">
                    update subtitle
                    <input type="button" id="updateSubtitle" hidden @click="updateSubtitle">
                </label>
            </div>
            <div class="input-group mb-3">
                <label class="input-group-text btn btn-lg btn-primary mx-auto" for="deleteSubtitle">
                    delete subtitle
                    <input type="button" id="deleteSubtitle" hidden @click="deleteSubtitle">
                </label>
            </div>
            <!-- <div v-if="uploadDone">
                Upload done
            </div>
            <video ref="videoPlayer" class="video-player" preload="metadata" :src="this.videoURL" autoplay controls>
            </video> -->
        </div>
    </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

export default {
    name: "VideoUpload",

    data() {
        return {
            selectedVideoFile: null,
            videoDuration: null,
            videoURL: null,
            // uploadDone: false
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
        printsubtitle() {
            const subtitleFile = this.$utils.getSubtitleFile();
            console.log(subtitleFile)
        },
        addSubtitle() {
            const cardData = {
                startTimeStamp: '00:00:00',
                endTimeStamp: '00:00:02',
                subtitle: 'one sub 224',
                subtitleId: uuidv4(),
                left: '10px',
                width: '200ps',
            }
            const result = this.$utils.addSubtitle(cardData);
            console.log(result)
        },
        deleteSubtitle() {
            const subtitleFile = this.$utils.getSubtitleFile();
            const firstOne = subtitleFile[0];
            const result = this.$utils.deleteSubtitle(firstOne.subtitleId)
            console.log("deleted:", result)
        },
        updateSubtitle() {
            const subtitleFile = this.$utils.getSubtitleFile();
            console.log(subtitleFile)
            const firstOne = subtitleFile[1];

            const cardData = {
                startTimeStamp: '00:00:00',
                endTimeStamp: '00:00:02',
                subtitle: 'one sdsfvbgnthmjyhtgfngub2',
                subtitleId: firstOne.subtitleId,
                left: '1010px',
                width: '2020ps',
            }
            const result = this.$utils.updateSubtitle(cardData);
            console.log(result)
        },

    }
}

</script>
