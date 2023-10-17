import { createStore } from "vuex";

export default createStore({
  state: {
    startAgain: false,
    isEditorView: false,
    videoFile: {
      name: null,
      size: null,
      url: null,
      duration: null,
    },
    subtitleFile: [],
  },

  getters: {},

  mutations: {
    initializeStore(state) {
      if (
        localStorage.getItem("subtitleFile") &&
        localStorage.getItem("videoFile")
      ) {
        const subtitleJsonData = localStorage.getItem("subtitleFile");
        const videoJsonData = localStorage.getItem("videoFile");

        state.subtitleFile = JSON.parse(subtitleJsonData);
        state.videoFile = JSON.parse(videoJsonData);
      }
    },

    setVideoFile(state, payload) {
      state.videoFile = payload;
      const JSONData = JSON.stringify(payload);
      localStorage.setItem("videoFile", JSONData);
    },

    removeVideoFile(state) {
      state.videoFile = null;
      localStorage.removeItem("videoFile");
    },

    setIsEditorView(state, payload) {
      state.isEditorView = payload;
    },

    readSubtitleFile(state) {
      if (localStorage.getItem("subtitleFile")) {
        state.subtitleFile = localStorage.getItem("subtitleFile");
      }
    },

    saveSubtitleFile(state, payload) {
      state.subtitleFile = payload;
      const JSONData = JSON.stringify(payload);
      localStorage.setItem("subtitleFile", JSONData);
    },

    removeSubtitleFile(state) {
      state.subtitleFile = [];
      localStorage.removeItem("subtitleFile");
    },
  },

  actions: {},

  modules: {},
});
