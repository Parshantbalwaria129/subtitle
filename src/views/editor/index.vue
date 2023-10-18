<template>
    <div>
        <div class="modal fade" id="downloadSubtitleModel" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                            Download Subtitle
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="floatingInput" :placeholder="subtitleFileName"
                                v-model="subtitleFileName" />
                            <label class="subtitle-file-name-label" for="floatingInput">{{
                                subtitleFileName
                            }}</label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-dark cancel-btn" data-bs-dismiss="modal">
                            Cancel
                        </button>
                        <button type="button" class="btn btn-dark" data-bs-dismiss="modal" :onClick="downloadSubtitleFile">
                            Download
                        </button>
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
                                controls></video>
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
                            <SubtitleCard :index="index" :cardData="cardData" :currentFocusedCardId="currentFocusedCardId"
                                @addNextCard="addNextCard" @deleteCurrentCard="deleteCurrentCard"
                                @update:startTimeStamp="updateStartTimestamp" @update:endTimeStamp="updateEndTimestamp"
                                @update:subtitle="updateSubtitle" @setFocusOut="setFocusOut" @setFocusIn="setFocusIn">
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
                                <input type="file" id="subtitleFileInput" hidden @change="UploadSubtitleFile" />
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

                    <div class="center-toolbar"></div>

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
                                <li>
                                    <button class="dropdown-item" type="button" @click="sortByClick('start')">
                                        Start Time
                                    </button>
                                </li>
                                <li>
                                    <button class="dropdown-item" type="button" @click="sortByClick('end')">
                                        End Time
                                    </button>
                                </li>
                                <li>
                                    <button class="dropdown-item" type="button" @click="sortByClick('sub')">
                                        Subtitle
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="main-scale">
                    <div class="scale-container" ref="scaleContainer">
                        <div class="scale">
                            <div class="scale-second-loop" v-for="(second, index) in scaleSeconds" :key="index">
                                <div class="second-unit" ref="subtitleUnit" :style="secondUnitStyle">
                                    <div class="mili-second-loop" v-for="(ms, index) in 10" :key="index">
                                        <div class="mili-second-unit"></div>
                                    </div>
                                </div>
                                <div class="second-unit-text">{{ second }}</div>
                            </div>
                            <div class="cst-pointer">
                                <div class="cst-pointer-triangle"></div>
                                <div class="cst-pointer-line"></div>
                            </div>
                        </div>
                        <div class="scale-subtitle">
                            <div class="subtitle-loop" ref="subtitleContainer" v-for="(cardData, index) in subtitleFile"
                                :key="index" :style="{
                                    left: `${cardData.left}px`,
                                    width: `${cardData.width}px`,
                                }" :onFocusin="() => setFocusIn(cardData.subtitleId)"
                                :onFocusout="() => setFocusOut(cardData.subtitleId)">
                                <textarea class="subtitle-text" :class="{ focus: checkFocus(cardData.subtitleId) }"
                                    v-model="cardData.subtitle" rows="2"></textarea>
                            </div>
                            <div v-drag="{ axis: 'x' }" class="left-handle" :style="{ left: computeLeftHandle }"
                                @v-drag-moving="leftDragMoving" @v-drag-start="leftDragStart" @v-drag-end="leftDragEnd">
                            </div>

                            <div v-drag="{ axis: 'x' }" class="right-handle" :style="{ left: computeRightHandle }"
                                @v-drag-moving="rightDragMoving" @v-drag-start="rightDragStart" @v-drag-end="rightDragEnd">
                            </div>
                            <!-- <div class="temp-handle" v-if="tempHandle" :style="{ left: `${tempHandleLeft}px` }">

                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- </div> -->
</template>

<script>
import "./index.css";
import SubtitleCard from "@/components/subtitleCard/index.vue";
import { v4 as uuidv4 } from "uuid";

export default {
    name: "EditorView",

    components: {
        SubtitleCard,
    },

    props: ["fileURL"],

    data() {
        return {
            videoURL: null,
            subtitleFile: null,
            currentSubtitle: "",
            subtitleAvailable: false,
            currentFocusedCardId: null,
            isFocused: false,
            selectedSubtitleFile: null,
            subtitleFileName: "",
            sortBy: {
                field: "start",
                order: "asc",
            },
            scaleSeconds: [],
            viewSecondsSizeOnScale: 100,
            videoDuration: 0,
            scaleSubtitleCard: [],
            startTimeNewLeft: null,
            endTimeNewLeft: null,
            leftHandleVisible: false,
            rightHandleVisible: false,
            tempHandle: false,
            tempHandleLeft: null,
        };
    },

    computed: {
        // leftHandleVisible() {
        //     return !this.tempHandle;
        // },

        // rightHandleVisible() {
        //     return !this.tempHandle;
        // },

        computeLeftHandle() {
            // if (!this.tempHandle) {
            //     if (this.currentFocusedCardId === null) {
            //         return "0px";
            //     } else {
            //         const cardData = this.subtitleFile.find(
            //             (card) => card.subtitleId === this.currentFocusedCardId
            //         );

            //         return `${cardData.left - 3}px`;
            //     }
            // } else {
            //     return "0px";
            // }

            if (this.currentFocusedCardId === null) {
                return "0px";
            } else {
                const cardData = this.subtitleFile.find(
                    (card) => card.subtitleId === this.currentFocusedCardId
                );

                return `${cardData.left - 3}px`;
            }


        },

        computeRightHandle() {

            if (this.currentFocusedCardId === null) {
                return "0px";
            } else {
                const cardData = this.subtitleFile.find(
                    (card) => card.subtitleId === this.currentFocusedCardId
                );
                return `${cardData.left + cardData.width - 3}px`;
            }
        },

        checkFocus() {
            return (id) => {
                if (this.currentFocusedCardId === null) {
                    return false;
                } else if (this.currentFocusedCardId === id) {
                    return true;
                } else {
                    return false;
                }
            };
        },

        secondUnitStyle() {
            return {
                width: `calc(${this.viewSecondsSizeOnScale}%)`,
            };
        },
    },

    methods: {
        leftDragEnd() {
            // this.$utils.saveSubtitles(this.subtitleFile)
            this.tempHandle = false
        },

        rightDragEnd() {
            this.tempHandle = false

        },

        leftDragStart(event) {
            // this.tempHandle = true
            // const cardData = this.subtitleFile.find(
            //     (card) => card.subtitleId === this.currentFocusedCardId
            // );
            // this.tempHandleLeft = cardData.left - 3;
            try {
                event.srcElement
            } catch (error) {
                console.log(error)
            }
        },

        rightDragStart() {
            this.tempHandle = true

        },

        rightDragMoving(event) {
            try {
                const transformMatrix = window.getComputedStyle(
                    event.srcElement
                ).transform;
                const matrixValues = transformMatrix.split(",");
                const rightHandleNewLeft = parseInt(matrixValues[4]);
                const newEndTimeStamp = this.pixelToTimeStamp(rightHandleNewLeft);
                const cardData = this.subtitleFile.find(
                    (card) => card.subtitleId === this.currentFocusedCardId
                );
                cardData.endTimeStamp = newEndTimeStamp;
                // cardData.width = rightHandleNewLeft - cardData.left + 3;
            } catch (error) {
                console.log(error);
            }
        },

        leftDragMoving(event) {
            try {
                const transformMatrix = window.getComputedStyle(
                    event.srcElement
                ).transform;
                const matrixValues = transformMatrix.split(",");
                const newLeft = parseInt(matrixValues[4]);
                const newStartTimeStamp = this.pixelToTimeStamp(newLeft);
                const cardData = this.subtitleFile.find(
                    (card) => card.subtitleId === this.currentFocusedCardId
                );
                cardData.startTimeStamp = newStartTimeStamp;
                console.log(cardData.left, "::", newLeft);
                const changeInValue = cardData.left - newLeft;
                cardData.left = newLeft;
                cardData.width = cardData.width + changeInValue;
                this.tempHandleLeft = newLeft - 3;
            } catch (error) {
                console.log(error);
            }
        },


        applyshorting() {
            if (this.sortBy.field === "start" && this.sortBy.order === "asc") {
                this.subtitleFile.sort((a, b) => {
                    return (
                        this.timeStampToTimeUnit(a.startTimeStamp) -
                        this.timeStampToTimeUnit(b.startTimeStamp)
                    );
                });
            } else if (this.sortBy.field === "start" && this.sortBy.order === "dsc") {
                this.subtitleFile.sort((a, b) => {
                    return (
                        this.timeStampToTimeUnit(b.startTimeStamp) -
                        this.timeStampToTimeUnit(a.startTimeStamp)
                    );
                });
            } else if (this.sortBy.field === "end" && this.sortBy.order === "asc") {
                this.subtitleFile.sort((a, b) => {
                    return (
                        this.timeStampToTimeUnit(a.endTimeStamp) -
                        this.timeStampToTimeUnit(b.endTimeStamp)
                    );
                });
            } else if (this.sortBy.field === "end" && this.sortBy.order === "dsc") {
                this.subtitleFile.sort((a, b) => {
                    return (
                        this.timeStampToTimeUnit(b.endTimeStamp) -
                        this.timeStampToTimeUnit(a.endTimeStamp)
                    );
                });
            } else if (this.sortBy.field === "sub" && this.sortBy.order === "asc") {
                this.subtitleFile.sort((a, b) => {
                    return a.subtitle.length - b.subtitle.length;
                });
            } else if (this.sortBy.field === "sub" && this.sortBy.order === "dsc") {
                this.subtitleFile.sort((a, b) => {
                    return b.subtitle.length - a.subtitle.length;
                });
            }
        },

        sortByClick(key) {
            if (key === "start" && this.sortBy.field === "start") {
                if (this.sortBy.order === "asc") {
                    this.sortBy.order = "dsc";
                } else {
                    this.sortBy.order = "asc";
                }
            } else if (key === "start" && this.sortBy.field !== "start") {
                this.sortBy.field = "start";
                this.sortBy.order = "asc";
            } else if (key === "end" && this.sortBy.field === "end") {
                if (this.sortBy.order === "asc") {
                    this.sortBy.order = "dsc";
                } else {
                    this.sortBy.order = "asc";
                }
            } else if (key === "end" && this.sortBy.field !== "end") {
                this.sortBy.field = "end";
                this.sortBy.order = "asc";
            } else if (key === "sub" && this.sortBy.field === "sub") {
                if (this.sortBy.order === "asc") {
                    this.sortBy.order = "dsc";
                } else {
                    this.sortBy.order = "asc";
                }
            } else if (key === "sub" && this.sortBy.field !== "sub") {
                this.sortBy.field = "sub";
                this.sortBy.order = "asc";
            }
            this.applyshorting();
        },

        UploadSubtitleFile(event) {
            const file = event.target.files[0];
            const allowedExtension = ["srt"];
            const fileExtenstion = file.name.split(".").pop().toLowerCase();

            if (allowedExtension.includes(fileExtenstion)) {
                this.selectedSubtitleFile = event.target.files[0];
                this.subtitleFileName = this.selectedSubtitleFile.name;
                this.readSubtitleFile();
            } else {
                alert("Invalid file formate. Please enter a valid file.");
            }
        },

        // Playing with time units
        // ===============================================================

        timeUnitToTimeStamp(timeUnit) {
            try {
                const parts = timeUnit.toString().split(/\.|,/);
                let milliseconds = parts[1] || "000";
                milliseconds = milliseconds.padEnd(3, "0").substring(0, 3);
                const timeInSeconds = parseInt(parts[0]);
                const hours = Math.floor(timeInSeconds / 3600);
                const minutes = Math.floor((timeInSeconds % 3600) / 60);
                const seconds = timeInSeconds % 60;
                if (this.timeFormat === "00:00:00:000") {
                    const formattedTimestamp = `${String(hours).padStart(
                        2,
                        "0"
                    )}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
                        2,
                        "0"
                    )}:${milliseconds}`;
                    return formattedTimestamp;
                } else {
                    const formattedTimestamp = `${String(minutes).padStart(
                        2,
                        "0"
                    )}:${String(seconds).padStart(2, "0")}:${milliseconds}`;
                    return formattedTimestamp;
                }
            } catch (error) {
                console.log(error);
            }
        },

        timeStampToTimeUnit(timeString) {
            if (this.timeFormat == "00:00:00:000") {
                const [hours, minutes, seconds, milliseconds] = timeString
                    .split(":")
                    .map(Number);
                return hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
            } else {
                const [minutes, seconds, milliseconds] = timeString
                    .split(":")
                    .map(Number);
                return minutes * 60 + seconds + milliseconds / 1000;
            }
        },

        replaceDotAndComma(timestamp) {
            try {

                const temp = timestamp.replace(".", ":");
                const newTimestamp = temp.replace(",", ":");

                if (this.timeFormat === "00:00:00:000") {
                    return newTimestamp.substring(0, 12);
                } else {
                    return newTimestamp.substring(0, 9);
                }
            } catch (error) {
                console.log(error);
            }
        },

        pixelToTime(pixel) {
            const timeUnit = (pixel - 10) / this.viewSecondsSizeOnScale;
            return timeUnit;
        },

        pixelToTimeStamp(pixel) {
            const timeUnit = this.pixelToTime(pixel);
            return this.timeUnitToTimeStamp(timeUnit);
        },

        // ===============================================================

        getVideoDuration() {
            return new Promise((resolve, reject) => {
                const videoElement = document.createElement("video");
                videoElement.preload = "metadata";

                videoElement.onloadedmetadata = () => {
                    const duration = videoElement.duration;
                    videoElement.src = "";

                    if (!isNaN(duration)) {
                        resolve(duration);
                    } else {
                        reject(new Error("Video Duratrion is not available"));
                    }
                };

                videoElement.onerror = () => {
                    videoElement.src = "";

                    reject(new Error("Failed to load video"));
                };

                videoElement.src = this.videoURL;
            });
        },

        backToHome() {
            this.$router.push("/");
            this.$store.commit("removeVideoFile");
            this.$store.commit("removeSubtitleFile");
        },

        setTimeFormat() {
            if (this.videoDuration < 3600) {
                this.timeFormat = "00:00:000";
                this.dataMaskFormat = "99:99:999";
            } else {
                this.timeFormat = "00:00:00:000";
                this.dataMaskFormat = "99:99:99:999";
            }
        },

        displaySubtitle(currentTime) {
            this.currentSubtitle = "";

            for (let i = 0; i < this.subtitleFile.length; i++) {
                const subtitle = this.subtitleFile[i];
                if (
                    currentTime >= this.timeStampToTimeUnit(subtitle.startTimeStamp) &&
                    currentTime <= this.timeStampToTimeUnit(subtitle.endTimeStamp)
                ) {
                    this.subtitleAvailable = true;
                    this.currentSubtitle += subtitle.subtitle + " ";
                }
            }
            if (this.subtitleAvailable === true) {
                return null;
            }
            this.subtitleAvailable = false;
            return (this.currentSubtitle = "");
        },

        updateStartTimestamp(value, currentId) {
            const result = this.updateLeftAndWidth(
                value,
                this.subtitleFile.find((card) => card.subtitleId === currentId)
                    .endTimeStamp
            );
            const cardData = {
                ...this.subtitleFile.find((card) => card.subtitleId === currentId),
                startTimeStamp: value,
                left: result.left,
                width: result.width,
            };
            this.$utils.updateSubtitle(cardData, currentId);
            // this.subtitleFile = this.$utils.getSubtitleFile()
        },

        updateEndTimestamp(value, currentId) {
            // const index = this.subtitleFile.findIndex(card => card.subtitleId === currentId);

            // this.subtitleFile[index].endTimeStamp = value;

            // this.$utils.updateFile(this.subtitleFile)
            const result = this.updateLeftAndWidth(
                this.subtitleFile.find((card) => card.subtitleId === currentId)
                    .startTimeStamp,
                value
            );
            const cardData = {
                ...this.subtitleFile.find((card) => card.subtitleId === currentId),
                endTimeStamp: value,
                left: result.left,
                width: result.width,
            };
            this.$utils.updateSubtitle(cardData, currentId);
        },

        updateSubtitle(value, currentId) {
            const index = this.subtitleFile.findIndex(
                (card) => card.subtitleId === currentId
            );

            this.subtitleFile[index].subtitle = value;

            this.$utils.updateFile(this.subtitleFile);
        },

        addTime(time1, time2) {
            if (this.timeFormat === "00:00:00:000") {
                const [h1, m1, s1, ms1] = time1.split(":").map(Number);

                const [h2, m2, s2, ms2] = time2.split(":").map(Number);

                const totalMilliseconds =
                    h1 * 3600 * 1000 +
                    m1 * 60 * 1000 +
                    s1 * 1000 +
                    ms1 +
                    (h2 * 3600 * 1000 + m2 * 60 * 1000 + s2 * 1000 + ms2);

                const hours = Math.floor(totalMilliseconds / (3600 * 1000));

                const minutes = Math.floor(
                    (totalMilliseconds % (3600 * 1000)) / (60 * 1000)
                );

                const seconds = Math.floor((totalMilliseconds % (60 * 1000)) / 1000);

                const millisecond = totalMilliseconds % 1000;

                const formattedResult = `${String(hours).padStart(2, "0")}:${String(
                    minutes
                ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(
                    millisecond
                ).padStart(3, "0")}`;

                return formattedResult;
            } else {
                const [m1, s1, ms1] = time1.split(":").map(Number);

                const [m2, s2, ms2] = time2.split(":").map(Number);

                const totalMilliseconds =
                    m1 * 60 * 1000 + s1 * 1000 + ms1 + (m2 * 60 * 1000 + s2 * 1000 + ms2);

                const minutes = Math.floor(totalMilliseconds / (60 * 1000));

                const seconds = Math.floor((totalMilliseconds % (60 * 1000)) / 1000);

                const millisecond = totalMilliseconds % 1000;

                const formattedResult = `${String(minutes).padStart(2, "0")}:${String(
                    seconds
                ).padStart(2, "0")}:${String(millisecond).padStart(3, "0")}`;

                return formattedResult;
            }
        },

        nextCardTime(lastTime, start = false, end = false) {
            if (start) {
                if (this.timeFormat === "00:00:00:000") {
                    return this.addTime(lastTime, "00:00:00:200");
                } else {
                    return this.addTime(lastTime, "00:00:200");
                }
            }

            if (end) {
                if (this.timeFormat === "00:00:00:000") {
                    return this.addTime(lastTime, "00:00:02:200");
                } else {
                    return this.addTime(lastTime, "00:02:200");
                }
            }
        },

        deleteCurrentCard(currentId) {
            if (this.subtitleFile.length === 1) {
                if (this.timeFormat === "00:00:00:000") {
                    const cardData = this.addLeftAndWidth({
                        startTimeStamp: "00:00:00:000",
                        endTimeStamp: "00:00:02:000",
                        subtitle: "",
                    });
                    this.subtitleFile[0].startTimeStamp = cardData.startTimeStamp;
                    this.subtitleFile[0].endTimeStamp = cardData.endTimeStamp;
                    this.subtitleFile[0].subtitle = cardData.subtitle;
                    this.subtitleFile[0].left = cardData.left;
                    this.subtitleFile[0].width = cardData.width;
                    this.$utils.updateFile(this.subtitleFile);
                } else {
                    const cardData = this.addLeftAndWidth({
                        startTimeStamp: "00:000:000",
                        endTimeStamp: "00:02:000",
                        subtitle: "",
                    });
                    this.subtitleFile[0].startTimeStamp = cardData.startTimeStamp;
                    this.subtitleFile[0].endTimeStamp = cardData.endTimeStamp;
                    this.subtitleFile[0].subtitle = cardData.subtitle;
                    this.subtitleFile[0].left = cardData.left;
                    this.subtitleFile[0].width = cardData.width;
                    this.$utils.updateFile(this.subtitleFile);
                }
                this.currentFocusedCardId = null;
                this.isFocused = false;
                return;
            } else {
                if (this.currentFocusedCardId === currentId) {
                    this.currentFocusedCardId = null;
                    this.isFocused = false;
                }
                const index = this.subtitleFile.findIndex(
                    (card) => card.subtitleId === currentId
                );
                this.subtitleFile.splice(index, 1);
                this.$utils.updateFile(this.subtitleFile);
            }
            // const index = this.subtitleFile.findIndex(card => card.subtitleId === currentId);
        },

        focusOut() {
            return (cardId) => {
                this.setFocusOut(cardId);
            };
        },

        setFocusOut(cardId) {
            console.log("OUT: ", cardId);
            this.isFocused = false;
            if (cardId !== this.currentFocusedCardId) {
                this.currentFocusedCardId = null;
            } else {
                this.currentFocusedCardId = cardId;
            }
        },

        focusIn() {
            return (e, cardId) => {
                console.log(e);
                this.setFocusIn(cardId);
            };
        },

        setFocusIn(cardId) {
            console.log("IN: ", cardId);

            if (this.currentFocusedCardId === null) {
                this.$utils.updateFile(this.subtitleFile);
                this.currentFocusedCardId = cardId;
                this.isFocused = true;
                this.applyshorting();
            } else {
                this.currentFocusedCardId = cardId;
                this.isFocused = true;
            }
        },

        saveSubtitles() {
            this.$utils.updateFile(this.subtitleFile);
            this.subtitleFile.sort((a, b) => {
                return (
                    this.timeStampToTimeUnit(a.startTimeStamp) -
                    this.timeStampToTimeUnit(b.startTimeStamp)
                );
            });
        },

        downloadSubtitleFile() {
            const srtContent = this.generateSRT();

            const blob = new Blob([srtContent], {
                type: "text/plain",
            });

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");

            a.href = url;
            if (this.subtitleFileName === "") {
                this.subtitleFileName = `${this.videoFileName.split(".")[0]}.srt`;
            }

            a.download = this.subtitleFileName;

            a.click();

            // this.uploadSubtitle(blob)

            window.URL.revokeObjectURL(url);
        },

        generateSRT() {
            let srtContent = "";

            this.subtitleFile.forEach((card, index) => {
                const startTime = card.startTimeStamp;

                const endTime = card.endTimeStamp;

                const subtitleText = card.subtitle;

                srtContent += index + 1 + "\n";

                srtContent += `${startTime} --> ${endTime}\n`;

                srtContent += `${subtitleText}\n\n`;
            });

            return srtContent;
        },

        updateLeftAndWidth(startTimeStamp, endTimeStamp) {
            const startTime = this.timeStampToTimeUnit(startTimeStamp);
            const endTime = this.timeStampToTimeUnit(endTimeStamp);
            const duration = endTime - startTime;
            const result = {
                left: 10 + parseInt(startTime * this.viewSecondsSizeOnScale),
                width: parseInt(duration * this.viewSecondsSizeOnScale),
            };
            return result;
        },

        addLeftAndWidth(cardData) {
            const startTime = this.timeStampToTimeUnit(cardData.startTimeStamp);
            const endTime = this.timeStampToTimeUnit(cardData.endTimeStamp);
            const duration = endTime - startTime;

            const newObj = {
                ...cardData,
                left: 10 + parseInt(startTime * this.viewSecondsSizeOnScale),
                width: parseInt(duration * this.viewSecondsSizeOnScale),
            };
            return newObj;
        },

        readSubtitleFile() {
            try {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const subtitleText = event.target.result;
                    const subtitleEntries = subtitleText.split(/\n\s*\n/);

                    this.subtitleFile.splice(0, this.subtitleFile.length);

                    subtitleEntries.forEach((entry) => {
                        const lines = entry.split("\n");

                        if (lines.length >= 3) {
                            const timestamps = lines[1].split(" --> ");
                            const dotCount = timestamps[0].split(".").length - 1;
                            const commaCount = timestamps[0].split(",").length - 1;
                            const colonCount = timestamps[0].split(":").length - 1;
                            const totoalCount = dotCount + commaCount + colonCount;
                            if ((this.videoDuration < 3600) && (totoalCount === 2)) {
                                timestamps[0] = this.replaceDotAndComma(timestamps[0]);
                            }
                            else if ((this.videoDuration >= 3600) && (totoalCount === 3)) {
                                timestamps[0] = this.replaceDotAndComma(timestamps[0]);
                            }
                            else {
                                alert("Invalid file formate. Please enter a valid file.");
                                return;
                            }
                            if ((this.videoDuration < 3600) && (totoalCount === 2)) {
                                timestamps[1] = this.replaceDotAndComma(timestamps[1]);
                            }
                            else if ((this.videoDuration >= 3600) && (totoalCount === 3)) {
                                timestamps[1] = this.replaceDotAndComma(timestamps[1]);
                            }
                            else {
                                alert("Invalid file formate. Please enter a valid file.");
                                return;
                            }
                            const startTimeStamp = timestamps[0];
                            const endTimeStamp = timestamps[1];
                            const subtitleText = lines.slice(2).join("\n");
                            const cardData = this.addLeftAndWidth({
                                startTimeStamp: startTimeStamp,
                                endTimeStamp: endTimeStamp,
                                subtitle: subtitleText,
                                subtitleId: uuidv4(),
                            });
                            this.$utils.addSubtitle(cardData);
                        }
                    });
                };
                reader.readAsText(this.selectedSubtitleFile);
            } catch (error) {
                console.log(error);
            }

        },

        addNewCard() {
            const lastSubtitle =
                this.subtitleFile[this.subtitleFile.length - 1]?.subtitle || "";

            const lastTime =
                this.subtitleFile[this.subtitleFile.length - 1]?.endTimeStamp || "";

            if (lastSubtitle !== "") {
                const cardData = this.addLeftAndWidth({
                    startTimeStamp: this.nextCardTime(lastTime, true),
                    endTimeStamp: this.nextCardTime(lastTime, false, true),
                    subtitle: "",
                    subtitleId: uuidv4(),
                });

                this.$utils.addSubtitle(cardData);
            }
        },

        // update this method leter on
        addNextCard(currentId) {
            const index = this.subtitleFile.findIndex(
                (card) => card.subtitleId === currentId
            );

            const lastTime = this.subtitleFile[index]?.endTimeStamp || "";

            if (
                this.subtitleFile[index]?.subtitle !== "" &&
                this.subtitleFile[index + 1]?.subtitle !== ""
            ) {
                const cardData = this.addLeftAndWidth({
                    startTimeStamp: this.nextCardTime(lastTime, true),
                    endTimeStamp: this.nextCardTime(lastTime, false, true),
                    subtitle: "",
                    subtitleId: uuidv4(),
                });
                this.subtitleFile.splice(index + 1, 0, cardData);
            }
            this.$utils.updateFile(this.subtitleFile);
        },
    },

    created() {
        const videoFileData = this.$store.state.videoFile;
        this.videoFileName = videoFileData.name;
        this.videoFileSize = videoFileData.size;
        this.videoURL = videoFileData.url;
        this.videoDuration = videoFileData.duration;
        this.subtitleFileName = `${this.videoFileName.split(".")[0]}.srt`;

        for (let i = 0; i < this.videoDuration + 1; i++) {
            const minutes = Math.floor(i / 60);
            const second = i % 60;
            this.scaleSeconds.push(
                `${String(minutes).padStart(1, "0")}:${String(second).padStart(2, "0")}`
            );
        }
        this.setTimeFormat();
    },

    mounted() {
        this.subtitleFile = this.$utils.getSubtitleFile();

        if (this.subtitleFile.length === 0) {
            if (this.timeFormat === "00:00:000") {
                const cardData = this.addLeftAndWidth({
                    startTimeStamp: "00:00:000",
                    endTimeStamp: "00:02:000",
                    subtitle: "",
                    subtitleId: uuidv4(),
                });
                this.$utils.addSubtitle(cardData);
            } else {
                const cardData = this.addLeftAndWidth({
                    startTimeStamp: "00:00:00:000",
                    endTimeStamp: "00:00:02:000",
                    subtitle: "",
                    subtitleId: uuidv4(),
                });
                this.$utils.addSubtitle(cardData);
            }
        }

        const videoElement = this.$refs.videoPlayer;

        videoElement.addEventListener("timeupdate", () => {
            const currentTime = videoElement.currentTime;

            this.displaySubtitle(currentTime);
        });
    },
};
</script>
