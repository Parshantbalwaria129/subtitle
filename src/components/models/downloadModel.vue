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
                                v-bind="subtitleFileName">
                            <label for="floatingInput">{{ subtitleFileName }}</label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-dark" data-bs-dismiss="modal"
                            :onClick="cancelButtonClicked">Cancel</button>
                        <button type="button" class="btn btn-dark" :onClick="downloadButtonClicked">Download</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "downloadModel",

    data() {
        return {

        };
    },
    props: [
        'subtitleFileDefaultName',
    ],

    methods: {
        downloadButtonClicked() {
            this.$emit('downloadButtonClicked');
        },

        cancelButtonClicked() {
            this.$emit('cancelButtonClicked');
        },
    }
};
</script>
