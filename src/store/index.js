import { createStore } from "vuex";

export default createStore({
  state: {
    startAgain: false,
    isEditorView: false,
    videoFile: {
      name: null,
      size: null,
      videoURL: null,
    },
    subtitleFile: [],
  },

  getters: {},

  mutations: {
    initializeStore(state) {
      if (
        localStorage.getItem("videoName") &&
        localStorage.getItem("videoSize") &&
        localStorage.getItem("videoURL")
      ) {
        state.videoFile.name = localStorage.getItem("videoName");
        state.videoFile.size = localStorage.getItem("videoSize");
        state.videoFile.videoURL = localStorage.getItem("videoURL");
      }
    },

    setVideoFile(state, payload) {
      state.videoFile.name = payload.name;
      state.videoFile.size = payload.size;
      state.videoFile.videoURL = payload.url;
      localStorage.setItem("videoName", payload.name);
      localStorage.setItem("videoSize", payload.size);
      localStorage.setItem("videoURL", payload.url);
    },

    removeVideoFile(state) {
      state.videoFile.name = null;
      state.videoFile.size = null;
      state.videoFile.videoURL = null;
      localStorage.removeItem("videoName");
      localStorage.removeItem("videoSize");
      localStorage.removeItem("videoURL");
    },

    setIsEditorView(state, payload) {
      state.isEditorView = payload;
    },

    saveSubtitleFile(state) {
      localStorage.setItem("SubtitleFile", state.subtitleFile);
    },
  },

  actions: {},

  modules: {},
});
