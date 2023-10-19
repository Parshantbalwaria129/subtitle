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
                                loop controls controlslist="nodownload nofullscreen"></video>
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

                    <div class="center-toolbar">
                        <input type="range" class="form-range" min="50" max="150" step="10" v-model="changeViewScaleSize"
                            id="customRange">
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
                            <!-- <div v-drag="{ axis: 'x' }" v-if="isFocused" class="left-handle"
                                style="{left: computeLeftHandle}" @v-drag-moving="leftDragMoving"
                                @v-drag-start="leftDragStart" @v-drag-end="leftDragEnd">
                            </div>

                            <div v-drag="{ axis: 'x' }" v-if="isFocused" class="right-handle"
                                style="{left: computeRightHandle}" @v-drag-moving="rightDragMoving"
                                @v-drag-start="rightDragStart" @v-drag-end="rightDragEnd">
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "./index.css";
import SubtitleCard from "@/components/subtitleCard/index.vue";
// import RangeSlider from 'vue-range-slider'
import 'vue-range-slider/dist/vue-range-slider.css'
import {
    v4 as uuidv4
} from "uuid";

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
            isFocused: true,
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
            sliderValue: 100,
            leftHandleDown: false,
            rightHandleDown: false,
        };
    },

    computed: {
        computeLeftHandle() {
            console.log("IN: computeLeftHandle")

            try {

                console.log("IN: TRY: computeLeftHandle")
                // console.log("this.computeLeftHandle")
                // console.log(this.subtitleFile)
                // console.log(this.currentFocusedCardId)

                const cardData = this.subtitleFile.find(
                    (card) => card.subtitleId === this.currentFocusedCardId
                );
                if (this.leftHandleDown) {
                console.log("IN: TRY: IF: computeLeftHandle")
                console.log("IN: TRY: IF: OUT: computeLeftHandle")

                    return '0px'
                }
                // else {
                console.log("IN: TRY: OUT: computeLeftHandle")

                    console.log("cardLeft:",cardData.left - 3)
                return `${cardData.left - 3}px`
                // }
                } catch (error) {
                console.log("IN: CATCH: computeLeftHandle")

                    console.log(error)
                }
            // } catch {
            //     console.log(error)
            // }
            console.log("OUT: computeLeftHandle")

            return '0px'

        },

        computeRightHandle() {
            console.log("IN: computeRightHandle")
            try {

                console.log("IN: TRY: computeRightHandle")
                const cardData = this.subtitleFile.find(
                    (card) => card.subtitleId === this.currentFocusedCardId
                );

                if (this.rightHandleDown) {
                    console.log("IN: TRY: IF: OUT: computeRightHandle")
                    return '0px'
                }
                else {
                    // console.log('else')
                    // console.log(' left:', `${cardData.left + cardData.width - 3}px`)
                    // console.log("::", document.querySelector(".right-handle").style.left)
                    console.log("IN: TRY: OUT: computeRightHandle")

                    return `${cardData.left + cardData.width - 3}px`
                }
            } catch {
                // console.log(error)
            }
            console.log("OUT: computeRightHandle")

            return '0px'


        },

        changeViewScaleSize: {
            get() {
                console.log('IN: changeViewScaleSize.get')
                console.log('OUT: changeViewScaleSize.get')

                return this.viewSecondsSizeOnScale
            },
            set(value) {
                console.log('IN: changeViewScaleSize.set')

                this.viewSecondsSizeOnScale = parseInt(value)
                this.subtitleFile.forEach((cardData) => {
                    const result = this.updateLeftAndWidth(cardData.startTimeStamp, cardData.endTimeStamp)
                    cardData.left = result.left
                    cardData.width = result.width
                })
                this.$utils.updateFile(this.subtitleFile)

                console.log('OUT: changeViewScaleSize.set')
            },
        },

        checkFocus() {
            console.log("IN-OUT: checkFocus")
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
            console.log("IN-OUT: secondUnitStyle")
            return {
                width: `${this.viewSecondsSizeOnScale}px`,
            };
        },
    },

    methods: {

        setCstPointer(value) {
            console.log("IN: setCstPointer")

            const cstTriangle = document.querySelector(".cst-pointer-triangle");
            const cstLine = document.querySelector(".cst-pointer-line");
            cstTriangle.style.left = `${value - 4}px`;
            cstLine.style.left = `${value}px`;
        
            console.log("OUT: setCstPointer")
        },

        leftDragStart() {
            console.log("IN: leftDragStart")
            try {
                this.leftHandleDown = true
            } catch (error) {
                console.log(error)
            }
            console.log("OUT: leftDragStart")
        },

        leftDragMoving(event) {
            console.log("IN: leftDragMoving")
            try {
            console.log("IN: TRY: leftDragMoving")
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
                const changeInValue = cardData.left - newLeft;
                cardData.left = newLeft;
                cardData.width = cardData.width + changeInValue;
                this.setCstPointer(cardData.left - 7)

            } catch (error) {
            console.log("IN: CATCH: leftDragMoving")
                console.log(error);
            }
            console.log("OUT: leftDragMoving")
        },

        leftDragEnd() {
            console.log("IN: leftDragEnd")
            const element = document.querySelector(".left-handle")
            element.style.left = `${this.computeLeftHandle}`
            try {
                console.log("IN: TRY: leftDragEnd")
                this.leftHandleDown = false
                this.$utils.updateFile(this.subtitleFile)
            } catch {
                // ..
                console.log("IN: CATHC: leftDragEnd")
            }

            console.log("OUT: leftDragEnd")

        },

        rightDragStart() {
            console.log("IN: rightDragStart")
            try {
            console.log("IN: TRY: rightDragStart")
                this.rightHandleDown = true

            } catch (error) {
                console.log("IN: CATHC: rightDragStart")
                console.log(error)
            }
            console.log("OUT: rightDragStart")
        },

        rightDragMoving(event) {
            console.log("IN: rightDragMoving")
            try {
            console.log("IN: TRY: rightDragMoving")

                const transformMatrix = window.getComputedStyle(
                    event.srcElement
                ).transform;
                const matrixValues = transformMatrix.split(",");
                const rightHandleNewLeft = parseInt(matrixValues[4]);
                const videoElement = this.$refs.videoPlayer;
                const newTimestamp = this.pixelToTime(rightHandleNewLeft);
                // const newFrameIndex = Math.floor(newTimestamp * videoElement.playbackRate * 1000);
                videoElement.currentTime = newTimestamp
                const newEndTimeStamp = this.pixelToTimeStamp(rightHandleNewLeft);
                const cardData = this.subtitleFile.find(
                    (card) => card.subtitleId === this.currentFocusedCardId
                );
                cardData.endTimeStamp = newEndTimeStamp;
                cardData.width = rightHandleNewLeft - cardData.left + 3;
                this.setCstPointer(cardData.left + cardData.width - 9)


                // const updateVideoTime = () => {
                //     const frameIndex = Math.floor(videoElement.currentTime * videoElement.playbackRate * 1000);
                //     if (frameIndex < newFrameIndex) {
                //         requestAnimationFrame(updateVideoTime);
                //     } else {
                //         // Stop updating once we reach the desired frame index
                //         videoElement.pause();
                //     }
                // };
                // requestAnimationFrame(updateVideoTime);
            } catch (error) {
                console.log("IN: CATCH: rightDragMoving")
                console.log(error);
            }
            console.log("OUT: rightDragMoving")
        },

        rightDragEnd() {
            console.log("IN: rightDragEnd")
            const element = document.querySelector(".right-handle")
            element.style.left = `${this.computeRightHandle}`
            this.rightHandleDown = false
            this.$utils.updateFile(this.subtitleFile)
            console.log("OUT: rightDragEnd")

        },

        setHandleStyle() {
            console.log("IN: setHandleStyle")
            try {
            console.log("IN: TCY: setHandleStyle")
                if (this.currentFocusedCardId !== null) {
                    const leftHandle = document.querySelector(".left-handle");
                    const rightHandle = document.querySelector(".right-handle");
                    const cardData = this.subtitleFile.find(
                        (card) => card.subtitleId === this.currentFocusedCardId
                    );
                    leftHandle.style.left = `${cardData.left - 3}px`;
                    rightHandle.style.left = `${cardData.left + cardData.width - 3}px`;
                }
            } catch {
            console.log("IN: CATCH: setHandleStyle")
                // ...
            }
            console.log("OUT: setHandleStyle")

        },

        applyshorting() {
            console.log("IN: applyshorting")
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
            console.log("OUT: applyshorting")
        },

        sortByClick(key) {
            console.log("IN: sortByClick")
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
            console.log("OUT: sortByClick")
        },

        UploadSubtitleFile(event) {
            console.log("IN: UploadSubtitleFile")
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
            console.log("OUT: UploadSubtitleFile")
        },

        // Playing with time units
        // ===============================================================
        timeUnitToTimeStamp(timeUnit) {
            console.log("IN: timeUnitToTimeStamp")
            try {
            console.log("IN: TRY: timeUnitToTimeStamp")
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
            console.log("IN: CATCH: timeUnitToTimeStamp")
                console.log(error);
            }
            console.log("OUT: timeUnitToTimeStamp")
        },

        timeStampToTimeUnit(timeString) {
            console.log("IN: timeStampToTimeUnit")
            if (this.timeFormat == "00:00:00:000") {
                const [hours, minutes, seconds, milliseconds] = timeString
                    .split(":")
                    .map(Number);
            console.log("IN: IF: OUT timeStampToTimeUnit")

                return hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
            } else {
            console.log("IN: ELSE: OUT timeStampToTimeUnit")

                const [minutes, seconds, milliseconds] = timeString
                    .split(":")
                    .map(Number);
                return minutes * 60 + seconds + milliseconds / 1000;
            }
        },

        replaceDotAndComma(timestamp) {
            console.log("IN: replaceDotAndComma")
            try {
                console.log("IN: TRY: replaceDotAndComma")

                const temp = timestamp.replace(".", ":");
                const newTimestamp = temp.replace(",", ":");

                if (this.timeFormat === "00:00:00:000") {
            console.log("IN: TRY: IF: OUT: replaceDotAndComma")

                    return newTimestamp.substring(0, 12);
                } else {
            console.log("IN: TRY: ELSE: OUT: replaceDotAndComma")

                    return newTimestamp.substring(0, 9);
                }
            } catch (error) {
            console.log("IN: CATCH: replaceDotAndComma")

                console.log(error);
            }
            console.log("OUT: replaceDotAndComma")

        },

        pixelToTime(pixel) {
            console.log("IN: pixelToTime")
            const timeUnit = (pixel - 10) / this.viewSecondsSizeOnScale;
            console.log("OUT: pixelToTime")

            return timeUnit;
        },

        pixelToTimeStamp(pixel) {
            console.log("IN: pixelToTimeStamp")
            const timeUnit = this.pixelToTime(pixel);
            console.log("OUT: pixelToTimeStamp")

            return this.timeUnitToTimeStamp(timeUnit);
        },

        // ===============================================================

        getVideoDuration() {
            console.log("IN-OUT:getVideoDuration")
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
            console.log("IN: backToHome")
            this.$router.push("/");
            this.$store.commit("removeVideoFile");
            this.$store.commit("removeSubtitleFile");
            console.log("OUT: backToHome")
        },

        setTimeFormat() {
            console.log("IN: setTimeFormat")
            if (this.videoDuration < 3600) {
                this.timeFormat = "00:00:000";
                this.dataMaskFormat = "99:99:999";
            } else {
                this.timeFormat = "00:00:00:000";
                this.dataMaskFormat = "99:99:99:999";
            }
            console.log("OUT: setTimeFormat")
        },

        displaySubtitle(currentTime) {
            console.log("IN: displaySubtitle")
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
                console.log("OUT: displaySubtitle")
                return null;
            }
            this.subtitleAvailable = false;
            console.log("OUT: displaySubtitle")
            return (this.currentSubtitle = "");
        },

        updateStartTimestamp(value, currentId) {
            console.log("IN: updateStartTimestamp")
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
            console.log("OUT: updateStartTimestamp")
        },

        updateEndTimestamp(value, currentId) {
            console.log("IN: updateEndTimestamp")
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
            console.log("OUT: updateEndTimestamp")
            this.$utils.updateSubtitle(cardData, currentId);
        },

        updateSubtitle(value, currentId) {
            console.log("IN: updateSubtitle")
            const index = this.subtitleFile.findIndex(
                (card) => card.subtitleId === currentId
            );

            this.subtitleFile[index].subtitle = value;

            this.$utils.updateFile(this.subtitleFile);
            console.log("OUT: updateSubtitle")
        },

        addTime(time1, time2) {
            console.log("IN: addTime")
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
                console.log("IN: IF: OUT: addTime")

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
                console.log("IN: ELSE: OUT: addTime")

                return formattedResult;
            }
        },

        nextCardTime(lastTime, start = false, end = false) {
            console.log("IN: nextCardTime")
            if (start) {
                if (this.timeFormat === "00:00:00:000") {
            console.log("IN: IF(START): IF: OUT: nextCardTime")

                    return this.addTime(lastTime, "00:00:00:200");
                } else {
            console.log("IN: IF(START): ELSE: OUT: nextCardTime")

                    return this.addTime(lastTime, "00:00:200");
                }
            }

            if (end) {
                if (this.timeFormat === "00:00:00:000") {
            console.log("IN: IF(END): IF: OUT: nextCardTime")

                    return this.addTime(lastTime, "00:00:02:200");
                } else {
            console.log("IN: IF(END): ELSE: OUT: nextCardTime")

                    return this.addTime(lastTime, "00:02:200");
                }
            }
        },

        deleteCurrentCard(currentId) {
            console.log("IN: deleteCurrentCard")
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
                console.log("IN: IF: OUT: deleteCurrentCard")
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
                console.log("IN: ELSE: OUT: deleteCurrentCard")
                return;
            }

            // const index = this.subtitleFile.findIndex(card => card.subtitleId === currentId);
        },

        setFocusOut(cardId) {
            console.log("IN: setFocusOut")
            this.isFocused = false;
            if (cardId !== this.currentFocusedCardId) {
                this.currentFocusedCardId = null;
            } else {
                this.currentFocusedCardId = cardId;
            }
            console.log("OUT: setFocusOut")

        },

        setFocusIn(cardId) {
            console.log("IN: setFocusIn")
            if (this.currentFocusedCardId === null) {
                this.isFocused = true;
                this.$utils.updateFile(this.subtitleFile);
                this.currentFocusedCardId = cardId;
                // console.log("InFocusNULL::", document.querySelector(".right-handle").style.left)

                this.applyshorting();

            } else {
                this.isFocused = true;
                this.currentFocusedCardId = cardId;
                // console.log("InFocus::", document.querySelector(".right-handle").style.left)

            }
            console.log("OUT: setFocusIn")

        },

        saveSubtitles() {
            console.log("IN: saveSubtitles")
            this.$utils.updateFile(this.subtitleFile);
            this.subtitleFile.sort((a, b) => {
            console.log("OUT: saveSubtitles")

                return (
                    this.timeStampToTimeUnit(a.startTimeStamp) -
                    this.timeStampToTimeUnit(b.startTimeStamp)
                );
            });
        },

        downloadSubtitleFile() {
            console.log("IN: downloadSubtitleFile")
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
            console.log("OUT: downloadSubtitleFile")
        },

        generateSRT() {
            console.log("IN: generateSRT")
            let srtContent = "";

            this.subtitleFile.forEach((card, index) => {
                const startTime = card.startTimeStamp;

                const endTime = card.endTimeStamp;

                const subtitleText = card.subtitle;

                srtContent += index + 1 + "\n";

                srtContent += `${startTime} --> ${endTime}\n`;

                srtContent += `${subtitleText}\n\n`;
            });
            console.log("OUT: generateSRT")

            return srtContent;
        },

        updateLeftAndWidth(startTimeStamp, endTimeStamp) {
            console.log("IN: updateLeftAndWidth")
            const startTime = this.timeStampToTimeUnit(startTimeStamp);
            const endTime = this.timeStampToTimeUnit(endTimeStamp);
            const duration = endTime - startTime;
            const result = {
                left: 10 + parseInt(startTime * this.viewSecondsSizeOnScale),
                width: parseInt(duration * this.viewSecondsSizeOnScale),
            };
            console.log("OUT: updateLeftAndWidth")
            return result;
        },

        addLeftAndWidth(cardData) {
            console.log("IN: addLeftAndWidth")
            const startTime = this.timeStampToTimeUnit(cardData.startTimeStamp);
            const endTime = this.timeStampToTimeUnit(cardData.endTimeStamp);
            const duration = endTime - startTime;

            const newObj = {
                ...cardData,
                left: 10 + parseInt(startTime * this.viewSecondsSizeOnScale),
                width: parseInt(duration * this.viewSecondsSizeOnScale),
            };
            console.log("OUT: addLeftAndWidth")
            return newObj;
        },

        readSubtitleFile() {
            console.log("IN: readSubtitleFile")
            try {
            console.log("IN: TRY: readSubtitleFile")

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
                            } else if ((this.videoDuration >= 3600) && (totoalCount === 3)) {
                                timestamps[0] = this.replaceDotAndComma(timestamps[0]);
                            } else {
                                alert("Invalid file formate. Please enter a valid file.");
                                return;
                            }
                            if ((this.videoDuration < 3600) && (totoalCount === 2)) {
                                timestamps[1] = this.replaceDotAndComma(timestamps[1]);
                            } else if ((this.videoDuration >= 3600) && (totoalCount === 3)) {
                                timestamps[1] = this.replaceDotAndComma(timestamps[1]);
                            } else {
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
                console.log("IN: CATCH: readSubtitleFile")

                console.log(error);
            }
            console.log("out: readSubtitleFile")

        },

        addNewCard() {
            console.log("IN: addNewCard")
            const lastSubtitle =
                this.subtitleFile[this.subtitleFile.length - 1]?.subtitle || "";

            const lastTime =
                this.subtitleFile[this.subtitleFile.length - 1]?.endTimeStamp || "";

            if (lastSubtitle !== "") {
                console.log("IN: IF: addNewCard")
                const cardData = this.addLeftAndWidth({
                    startTimeStamp: this.nextCardTime(lastTime, true),
                    endTimeStamp: this.nextCardTime(lastTime, false, true),
                    subtitle: "",
                    subtitleId: uuidv4(),
                });

                this.$utils.addSubtitle(cardData);
            }
            console.log("OUT: addNewCard")
        },

        // Need to update this method
        addNextCard(currentId) {
            console.log("IN: addNextCard")
            const index = this.subtitleFile.findIndex(
                (card) => card.subtitleId === currentId
            );

            const lastTime = this.subtitleFile[index]?.endTimeStamp || "";

            if (
                this.subtitleFile[index]?.subtitle !== "" &&
                this.subtitleFile[index + 1]?.subtitle !== ""
            ) {
                console.log("IN: IF: addNextCard")
                const cardData = this.addLeftAndWidth({
                    startTimeStamp: this.nextCardTime(lastTime, true),
                    endTimeStamp: this.nextCardTime(lastTime, false, true),
                    subtitle: "",
                    subtitleId: uuidv4(),
                });
                this.subtitleFile.splice(index + 1, 0, cardData);
            }
            this.$utils.updateFile(this.subtitleFile);
            console.log("OUT: addNextCard")
        },
    },

    created() {
        console.log("IN: created")
        
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
        console.log("OUT: created")
    },

    mounted() {
        this.subtitleFile = this.$utils.getSubtitleFile();

        this.viewSecondsSizeOnScale = parseInt(this.viewSecondsSizeOnScale)
                this.subtitleFile.forEach((cardData) => {
                    const result = this.updateLeftAndWidth(cardData.startTimeStamp, cardData.endTimeStamp)
                    cardData.left = result.left
                    cardData.width = result.width
                })

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
        this.setFocusIn(this.subtitleFile[0].subtitleId)
        this.setCstPointer(0)
        const videoElement = this.$refs.videoPlayer;

        videoElement.addEventListener("timeupdate", () => {
            const currentTime = videoElement.currentTime;

            this.displaySubtitle(currentTime);
        });
    },
};
</script>
