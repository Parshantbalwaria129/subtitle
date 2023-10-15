<template>
    <div class="subtitle-item-container" :class="{ focus: isFocused }" :onFocusin="setFocusIn" :onFocusout="setFocusOut">
        <div class="subtitle-time-stamp-container">

            <input v-model="startTimeStamp" type="text" pattern="[0-9]*">
            <input v-model="endTimeStamp" type="text" pattern="[0-9]*">

        </div>

        <div class="subtitle-container">

            <textarea v-model="subtitle" placeholder="New Subtitle" rows="2"></textarea>

        </div>

        <div class="subtitle-button-container">

            <svg @click="deleteCard" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                class="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path
                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>

            <svg @click="addCard" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                class="bi bi-plus-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path
                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>

        </div>
    </div>
</template>
    
<script>

// import './index.css'

export default {
    name: 'SubtitleCard',

    data() {
        return {
            isFocused: false
        }
    },

    props: ['index', 'cardData', 'timeFormat', 'dataMaskFormat'],

    mounted() {
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    },

    computed: {

        startTimeStamp: {

            get() {

                return this.cardData.startTimeStamp
            },

            set(value) {

                this.$emit('update:startTimeStamp', value, this.cardData.subtitleId)
            }
        },

        endTimeStamp: {

            get() {

                return this.cardData.endTimeStamp;
            },

            set(value) {

                this.$emit('update:endTimeStamp', value, this.cardData.subtitleId);
            }
        },

        subtitle: {

            get() {

                return this.cardData.subtitle;
            },

            set(value) {

                this.$emit('update:subtitle', value, this.cardData.subtitleId);
            }
        }
    },

    methods: {

        addCard() {

            this.$emit('addNextCard', this.cardData.subtitleId)
        },

        deleteCard() {

            this.$emit('deleteCurrentCard', this.cardData.subtitleId)
        },

        setFocusIn() {
            this.$emit('setFocusIn', this.cardData.subtitleId)

            this.isFocused = true

        },

        setFocusOut() {
            this.isFocused = false
            this.$emit('setFocusOut', this.cardData.subtitleId)
        },

    }
}
</script>
    