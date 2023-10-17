import store from "@/store";

const createSubtitleFile = () => {
  // ...
};

const getSubtitleFile = () => {
  // const subtitleJsonData = localStorage.getItem("subtitleFile");
  // let subtitleFile = [];
  // if (subtitleJsonData === null) {
  //   subtitleFile = store.state.subtitleFile;
  // } else {
  //   // store.state.subtitleFile = JSON.parse(subtitleJsonData);

  //   subtitleFile = store.state.subtitleFile;
  // }
  const subtitleFile = store.state.subtitleFile;

  return subtitleFile;
};

const updateSubtitle = (subtitleData) => {
  const subtitleFile = store.state.subtitleFile;
  for (let i = 0; i < subtitleFile.length; i++) {
    if (subtitleFile[i].subtitleId === subtitleData.subtitleId) {
      subtitleFile[i].startTimeStamp = subtitleData.startTimeStamp;
      subtitleFile[i].endTimeStamp = subtitleData.endTimeStamp;
      subtitleFile[i].subtitle = subtitleData.subtitle;
      subtitleFile[i].left = subtitleData.left;
      subtitleFile[i].width = subtitleData.width;
      break;
    }
  }
  store.commit("saveSubtitleFile", subtitleFile);
  return { status: true, subtitleFile: subtitleFile };
};

const deleteSubtitle = (subtitleId) => {
  const subtitleFile = store.state.subtitleFile;
  for (let i = 0; i < subtitleFile.length; i++) {
    if (subtitleFile[i].subtitleId === subtitleId) {
      subtitleFile.splice(i, 1);
      break;
    }
  }
  store.commit("saveSubtitleFile", subtitleFile);
  return { status: true, subtitleFile: subtitleFile };
};

const addSubtitle = (subtitleData) => {
  const subtitleFile = store.state.subtitleFile;
  subtitleFile.push(subtitleData);
  store.commit("saveSubtitleFile", subtitleFile);
  return { status: true, subtitleFile: subtitleFile };
};

const updateFile = (file) => {
  store.commit("saveSubtitleFile", file);
};

const getVideodata = () => {
  const videoFile = store.state.videoFile;
  return videoFile;
};

export default {
  createSubtitleFile,
  getSubtitleFile,
  updateSubtitle,
  deleteSubtitle,
  addSubtitle,
  updateFile,
  getVideodata,
};
