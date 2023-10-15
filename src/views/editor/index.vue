<template>
    <div>
        <div class="modal fade" id="downloadSubtitleModel" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Download Subtitle</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="floatingInput" :placeholder="subtitleFileName"
                                v-model="subtitleFileName">
                            <label class="subtitle-file-name-label" for="floatingInput">{{ subtitleFileName }}</label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-dark cancel-btn" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-dark" data-bs-dismiss="modal"
                            :onClick="downloadSubtitleFile">Download</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-container">
            <div class="top-container">
                <div class="left-container">
                    <div class="back-to-home">
                        <button type="button" className="btn-close" aria-label="Close" title="Go back"
                            @click="backToHome"></button>
                    </div>
                    <div class="video-container">
                        <div class="ratio ratio-16x9">
                            <video ref="videoPlayer" class="video-player" preload="metadata" :src="this.videoURL" autoplay
                                controls>
                            </video>

                        </div>

                        <div class="subtitle-display" v-if="subtitleAvailable">

                            <div class="subtitle-text">{{ currentSubtitle }}</div>

                        </div>
                    </div>
                </div>

                <div class="right-container">
                    <div class="top-subtitle-container">

                        <h2>Add subtitle here</h2>

                    </div>

                    <div class="bottom-subtitle-container">
                        <div class="subtitle-forloop" v-for="(cardData, index) in subtitleFile" :key="index">

                            <SubtitleCard :index="index" :cardData="cardData" @addNextCard="addNextCard"
                                @deleteCurrentCard="deleteCurrentCard" @update:startTimeStamp="updateStartTimestamp"
                                @update:endTimeStamp="updateEndTimestamp" @update:subtitle="updateSubtitle"
                                @setFocusOut="setFocusOut" @setFocusIn="setFocusIn">
                            </SubtitleCard>

                        </div>

                        <div class="subtitle-add-container" @click="addNewCard">

                            Add Subtitle

                        </div>
                    </div>
                </div>

            </div>

            <div class="bottom-container">

                <div class="toolbar">
                    <div class="left-toolbar">
                        <div class="back-to-home">
                            <label class="btn btn-sm btn-dark" title="Go back">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-x-lg" viewBox="0 0 16 16">
                                    <path
                                        d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                </svg>
                                <button type="button" hidden @click="backToHome"></button>
                            </label>
                        </div>
                        <div class="add-subtitle">
                            <label class="btn btn-sm btn-dark" for="subtitleFileInput" title="Upload subtitle">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-file-earmark-arrow-up" viewBox="0 0 16 16">
                                    <path
                                        d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707V11.5z">
                                    </path>
                                    <path
                                        d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z">
                                    </path>
                                </svg>
                                <input type="file" id="subtitleFileInput" hidden @change="UploadSubtitleFile">
                            </label>
                        </div>
                        <div class="download-subtitle">
                            <label class="btn btn-sm btn-dark" title="Download Subtitle">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-file-earmark-arrow-down" viewBox="0 0 16 16">
                                    <path
                                        d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z" />
                                    <path
                                        d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                                </svg>
                                <button type="button" data-bs-toggle="modal" data-bs-target="#downloadSubtitleModel"
                                    hidden></button>
                            </label>
                        </div>
                    </div>

                    <div class="center-toolbar">

                    </div>

                    <div class="right-toolbar">
                        <div class="save-subtitle">
                            <label class="btn btn-sm btn-dark" title="Save">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-floppy" viewBox="0 0 16 16">
                                    <path d="M11 2H9v3h2V2Z" />
                                    <path
                                        d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0ZM1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5Zm3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4v4.5ZM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5V15Z" />
                                </svg>
                                <button type="button" hidden @click="saveSubtitles"></button>
                            </label>
                        </div>
                        <div class="dropdown">
                            <button class="btn btn-dark dropdown-toggle" type="button" id="dropdownMenu"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                Sort by
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenu" fill="currentColor">
                                <li><button class=" dropdown-item" type="button" @click="sortByClick('start')">Start
                                        Time</button></li>
                                <li><button class=" dropdown-item" type="button" @click="sortByClick('end')">End Time
                                    </button></li>
                                <li><button class=" dropdown-item" type="button"
                                        @click="sortByClick('sub')">Subtitle</button></li>
                            </ul>
                        </div>


                    </div>
                </div>

                <div class="main-scale">
                    <div class="scale-container">
                        <div class="scale">
                            <div class="scale-second-loop" v-for="(second, index) in scaleSeconds" :key="index">
                                <div class="second-unit" :style="secondUnitStyle">
                                    <div class="second-unit-text">{{ second }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


            </div>



        </div>


    </div>
    <!-- </div> -->
</template>

<script>
import './index.css';
import SubtitleCard from "@/components/subtitleCard/index.vue"
import { v4 as uuidv4 } from 'uuid';

export default {

    name: 'EditorView',

    components: {
        SubtitleCard,
    },

    props: ['fileURL'],

    data() {
        return {
            videoURL: null,
            subtitleFile: null,
            currentSubtitle: '',
            subtitleAvailable: false,
            currentFocusedCardId: null,
            selectedSubtitleFile: null,
            subtitleFileName: '',
            sortBy: {
                field: 'start',
                order: 'asc'
            },
            scaleSeconds: [],
            totalSecondsInScale: 15,
            viewSecondsOnScale: 7,
            videoDuration: null,


        }
    },


    created() {

    },

    computed: {
        secondUnitStyle() {
            return {
                width: `calc(${100 / this.viewSecondsOnScale}vw - 1px)`
            };
        },
    },

    methods: {
        applyshorting() {
            if ((this.sortBy.field === 'start') && (this.sortBy.order === 'asc')) {
                this.subtitleFile.sort((a, b) => {
                    return this.formatTimeNew(a.startTimeStamp) - this.formatTimeNew(b.startTimeStamp)
                })
            } else if ((this.sortBy.field === 'start') && this.sortBy.order === 'dsc') {
                this.subtitleFile.sort((a, b) => {
                    return this.formatTimeNew(b.startTimeStamp) - this.formatTimeNew(a.startTimeStamp)
                })
            } else if ((this.sortBy.field === 'end') && this.sortBy.order === 'asc') {
                this.subtitleFile.sort((a, b) => {
                    return this.formatTimeNew(a.endTimeStamp) - this.formatTimeNew(b.endTimeStamp)
                })
            } else if ((this.sortBy.field === 'end') && this.sortBy.order === 'dsc') {
                this.subtitleFile.sort((a, b) => {
                    return this.formatTimeNew(b.endTimeStamp) - this.formatTimeNew(a.endTimeStamp)
                })
            } else if ((this.sortBy.field === 'sub') && this.sortBy.order === 'asc') {
                this.subtitleFile.sort((a, b) => {
                    return a.subtitle.length - b.subtitle.length
                })
            } else if ((this.sortBy.field === 'sub') && this.sortBy.order === 'dsc') {
                this.subtitleFile.sort((a, b) => {
                    return b.subtitle.length - a.subtitle.length
                })
            }
        },

        sortByClick(key) {
            if ((key === 'start') && (this.sortBy.field === 'start')) {
                if (this.sortBy.order === 'asc') {
                    this.sortBy.order = 'dsc'
                } else {
                    this.sortBy.order = 'asc'
                }
            } else if ((key === 'start') && (this.sortBy.field !== 'start')) {
                this.sortBy.field = 'start'
                this.sortBy.order = 'asc'
            } else if ((key === 'end') && (this.sortBy.field === 'end')) {
                if (this.sortBy.order === 'asc') {
                    this.sortBy.order = 'dsc'
                } else {
                    this.sortBy.order = 'asc'
                }
            } else if ((key === 'end') && (this.sortBy.field !== 'end')) {
                this.sortBy.field = 'end'
                this.sortBy.order = 'asc'
            } else if ((key === 'sub') && (this.sortBy.field === 'sub')) {
                if (this.sortBy.order === 'asc') {
                    this.sortBy.order = 'dsc'
                } else {
                    this.sortBy.order = 'asc'
                }
            } else if ((key === 'sub') && (this.sortBy.field !== 'sub')) {
                this.sortBy.field = 'sub'
                this.sortBy.order = 'asc'
            }
            this.applyshorting()
        },

        UploadSubtitleFile(event) {
            const subtitleFile = event.target.files[0];
            const allowedExtension = ['srt']
            const fileExtenstion = subtitleFile.name.split('.').pop().toLowerCase();

            if (allowedExtension.includes(fileExtenstion)) {
                this.selectedSubtitleFile = event.target.files[0];
                this.subtitleFileName = this.selectedSubtitleFile.name;
                this.readSubtitleFile()

            } else {
                alert("Invalid file formate. Please enter a valid file.");
            }

        },

        readSubtitleFile() {
            const reader = new FileReader();
            reader.onload = (event) => {
                const subtitleText = event.target.result;
                const subtitleEntries = subtitleText.split(/\n\s*\n/);

                this.subtitleFile.splice(0, this.subtitleFile.length);

                subtitleEntries.forEach((entry) => {
                    const lines = entry.split('\n');

                    if (lines.length >= 3) {

                        const timestamps = lines[1].split(' --> ');
                        const startTimeStamp = this.formatMilliseconds(timestamps[0]);
                        const endTimeStamp = this.formatMilliseconds(timestamps[1]);
                        const subtitleText = lines.slice(2).join('\n');

                        this.subtitleFile.push({
                            startTimeStamp: startTimeStamp,
                            endTimeStamp: endTimeStamp,
                            subtitle: subtitleText,
                            subtitleId: uuidv4(),
                        })
                    }
                })
            }
            reader.readAsText(this.selectedSubtitleFile)
        },

        formatMilliseconds(timestamp) {

            const parts = timestamp.split(',');

            let milliseconds = parts[1] || '000';

            milliseconds = milliseconds.padEnd(3, '0').substring(0, 2);

            const [hh, mm, ss] = parts[0].split(':').map(Number);

            if (this.timeFormat === '00:00:00:00') {

                const formattedTimestamp = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}:${milliseconds}`;

                return formattedTimestamp;
            }
            else {

                const formattedTimestamp = `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}:${milliseconds}`;

                return formattedTimestamp;
            }
        },

        getVideoDuration() {
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

                videoElement.src = this.videoURL

            })
        },


        backToHome() {
            this.$router.push('/')
            this.$store.commit("removeVideoFile")

        },

        setTimeFormatAndOtherUnits() {
            const videoElement = this.$refs.videoPlayer;
            videoElement.preload = 'metadata';

            videoElement.onloadedmetadata = () => {
                this.videoDuration = videoElement.duration;
                this.totalSecondsInScale = Math.floor(this.videoDuration) + 2
                for (let i = 0; i < this.totalSecondsInScale; i++) {
                    for (let j = 0; j < 10; j++) {
                        const unit = i + j / 10
                        this.scaleSeconds.push(unit)
                    }
                }
                console.log(this.scaleSeconds)
                this.scaleSeconds = Array.from()
                if (this.videoDuration < 3600) {
                    this.timeFormat = "00:00:00"
                    this.dataMaskFormat = "99:99:99"
                }
                else {
                    this.timeFormat = "00:00:00:00"
                    this.dataMaskFormat = "99:99:99:99"
                }
            }
        },

        displaySubtitle(currentTime) {
            this.currentSubtitle = ''

            for (let i = 0; i < this.subtitleFile.length; i++) {
                const subtitle = this.subtitleFile[i];
                if (currentTime >= this.formatTimeNew(subtitle.startTimeStamp) && currentTime <= this.formatTimeNew(subtitle.endTimeStamp)) {
                    this.subtitleAvailable = true
                    this.currentSubtitle += subtitle.subtitle + " "
                }
            }
            if (this.subtitleAvailable === true) {
                return null
            }
            this.subtitleAvailable = false
            return this.currentSubtitle = ''
        },

        formatTimeNew(timeString) {
            if (this.timeFormat == "00:00:00:00") {
                const [hours, minutes, seconds, milliseconds] = timeString.split(":").map(Number);
                return hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
            } else {
                const [minutes, seconds, milliseconds] = timeString.split(":").map(Number);
                return minutes * 60 + seconds + milliseconds / 1000;

            }
        },

        formatTime(currentTime) {

            const totalSeconds = Math.floor(currentTime);

            const milliseconds = Math.floor((currentTime - totalSeconds) * 1000);

            if (this.timeFormat === '00:00:00:00') {

                const hours = Math.floor(totalSeconds / 3600);

                const minutes = Math.floor((totalSeconds % 3600) / 60);

                const seconds = totalSeconds % 60;

                return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
            }
            else {

                const minutes = Math.floor(totalSeconds / 60);

                const seconds = totalSeconds % 60;

                return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
            }
        },

        updateStartTimestamp(value, currentId) {

            const index = this.subtitleFile.findIndex(card => card.subtitleId === currentId);

            this.subtitleFile[index].startTimeStamp = value;

        },

        updateEndTimestamp(value, currentId) {

            const index = this.subtitleFile.findIndex(card => card.subtitleId === currentId);

            this.subtitleFile[index].endTimeStamp = value;

        },

        updateSubtitle(value, currentId) {

            const index = this.subtitleFile.findIndex(card => card.subtitleId === currentId);

            this.subtitleFile[index].subtitle = value;

        },

        addTime(time1, time2) {
            if (this.timeFormat === '00:00:00:00') {

                const [h1, m1, s1, ms1] = time1.split(':').map(Number);

                const [h2, m2, s2, ms2] = time2.split(':').map(Number);

                const totalMilliseconds = (h1 * 3600 * 99 + m1 * 60 * 99 + s1 * 99 + ms1) + (h2 * 3600 * 99 + m2 * 60 * 99 + s2 * 99 + ms2);

                const hours = Math.floor(totalMilliseconds / (3600 * 99));

                const minutes = Math.floor((totalMilliseconds % (3600 * 99)) / (60 * 99));

                const seconds = Math.floor((totalMilliseconds % (60 * 99) / 99));

                const millisecond = totalMilliseconds % 99;

                const formattedResult = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(millisecond).padStart(2, "0")}`;

                return formattedResult;
            }
            else {

                const [h1, m1, s1] = time1.split(':').map(Number);

                const [h2, m2, s2] = time2.split(':').map(Number);

                const totalSeconds = (h1 * 3600 + m1 * 60 + s1) + (h2 * 3600 + m2 * 60 + s2);

                const hours = Math.floor(totalSeconds / 3600);

                const minutes = Math.floor((totalSeconds % 3600) / 60);

                const seconds = totalSeconds % 60;

                const formattedResult = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

                return formattedResult;
            }

        },

        addNewCard() {

            const lastSubtitle = this.subtitleFile[this.subtitleFile.length - 1]?.subtitle || '';

            const lastTime = this.subtitleFile[this.subtitleFile.length - 1]?.endTimeStamp || '';

            if (lastSubtitle !== '') {

                this.subtitleFile.push({
                    startTimeStamp: this.nextCardTime(lastTime, true),
                    endTimeStamp: this.nextCardTime(lastTime, false, true),
                    subtitle: '',
                    subtitleId: uuidv4(),

                })
            }
        },

        nextCardTime(lastTime, start = false, end = false) {
            if (start) {

                if (this.timeFormat === '00:00:00:00') {

                    return this.addTime(lastTime, "00:00:00:20")

                }
                else {

                    return this.addTime(lastTime, "00:00:20")

                }
            }

            if (end) {

                if (this.timeFormat === '00:00:00:00') {

                    return this.addTime(lastTime, "00:00:02:20")

                }
                else {

                    return this.addTime(lastTime, "00:02:20")

                }
            }
        },

        addNextCard(currentId) {

            const index = this.subtitleFile.findIndex(card => card.subtitleId === currentId);

            const lastTime = this.subtitleFile[index]?.endTimeStamp || '';

            if (this.subtitleFile[index]?.subtitle !== '' && this.subtitleFile[index + 1]?.subtitle !== '') {

                this.subtitleFile.splice(index + 1, 0, {
                    startTimeStamp: this.nextCardTime(lastTime, true),
                    endTimeStamp: this.nextCardTime(lastTime, false, true),
                    subtitle: '',
                    subtitleId: uuidv4(),

                })
            }
        },

        deleteCurrentCard(currentId) {

            const index = this.subtitleFile.findIndex(card => card.subtitleId === currentId);

            if (this.subtitleFile.length >= 2) {

                this.subtitleFile.splice(index, 1)

            }
        },

        setFocusOut(cardId) {
            console.log(this.currentFocusedCardId)
            console.log(cardId)
            console.log("=========================================")
            if (cardId !== this.currentFocusedCardId) {
                console.log("inside if")
                this.currentFocusedCardId = null
            }

        },

        setFocusIn(cardId) {
            console.log(this.currentFocusedCardId)
            if (this.currentFocusedCardId === null) {
                this.currentFocusedCardId = cardId
                this.$store.commit("saveSubtitleFile")
                this.applyshorting()
            }
        },

        saveSubtitles() {
            this.$store.commit("saveSubtitleFile")
            this.subtitleFile.sort((a, b) => {
                return this.formatTimeNew(a.startTimeStamp) - this.formatTimeNew(b.startTimeStamp)
            })
        },

        downloadSubtitleFile() {

            const srtContent = this.generateSRT();

            const blob = new Blob([srtContent], {

                type: 'text/plain'
            });

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');

            a.href = url;
            if (this.subtitleFileName === '') {
                this.subtitleFileName = `${this.videoFileName.split('.')[0]}.srt`
            }

            a.download = this.subtitleFileName;

            a.click();

            // this.uploadSubtitle(blob)

            window.URL.revokeObjectURL(url)

        },

        generateSRT() {

            let srtContent = ''

            this.subtitleFile.forEach((card, index) => {

                const startTime = card.startTimeStamp;

                const endTime = card.endTimeStamp;

                const subtitleText = card.subtitle;

                srtContent += (index + 1) + '\n';

                srtContent += `${startTime} --> ${endTime}\n`;

                srtContent += `${subtitleText}\n\n`;

            })

            return srtContent;
        },
    },
    mounted() {
        // Your mounted hook code here
        this.videoFileName = this.$store.state.videoFile.name;
        this.videoFileSize = this.$store.state.videoFile.size;
        this.videoURL = this.$store.state.videoFile.videoURL;
        this.subtitleFileName = `${this.videoFileName.split('.')[0]}.srt`
        this.setTimeFormatAndOtherUnits();
        this.subtitleFile = this.$store.state.subtitleFile;

        if (this.subtitleFile.length === 0) {
            if (this.timeFormat === "00:00:00") {

                this.subtitleFile.push({
                    startTimeStamp: '00:00:00',
                    endTimeStamp: '00:02:00',
                    subtitle: '',
                    subtitleId: uuidv4(),

                })
            }
            else {
                this.subtitleFile.push({
                    startTimeStamp: '00:00:00:00',
                    endTimeStamp: '00:00:02:00',
                    subtitle: '',
                    subtitleId: uuidv4(),

                })
            }
        }

        const videoElement = this.$refs.videoPlayer;

        videoElement.addEventListener('timeupdate', () => {

            const currentTime = videoElement.currentTime;

            this.displaySubtitle(currentTime)


        })





    }
}
</script>
