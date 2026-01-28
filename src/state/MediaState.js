import { action, flow, makeObservable, observable } from "mobx";
import BaseState from "./BaseState/BaseState";
import { createMedia, uploadToS3 } from "../api/media";

/**
 * this state class manages the upload states
 * of an upload
 *
 * in future versions it may be used for the
 * user's media library
 */
class MediaState extends BaseState {
  progress = 0;
  busy = false;
  error = false;
  errorMessage = "";
  url = null;
  id = 0;
  constructor(root) {
    super(root);
    makeObservable(this, {
      progress: observable,
      busy: observable,
      error: observable,
      errorMessage: observable,
      url: observable,
      id: observable,
      uploadImage: flow,
      setProgress: action,
      setBusy: action,
      clear: action,
    });
  }
  *uploadImage(file) {
    this.busy = true;
    try {
      const data = yield uploadToS3(file, (progressEvent) => {
        console.log(progressEvent);
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        if (percent > 99) percent = 99;
        this.setProgress(percent);
      });
      const response = yield createMedia(data.mediaUrl, null);
      const media = response.data.media;
      this.busy = false;
      this.url = media.url;
      this.progress = 100;
      this.id = media.id;
    } catch (e) {
      this.error = true;
    }
  }
  setBusy(val) {
    this.busy = val;
  }
  setProgress(val) {
    this.progress = val;
  }
  clear() {
    this.progress = 0;
    this.busy = false;
    this.error = false;
    this.errorMessage = "";
    this.url = null;
    this.id = 0;
  }
}
export default MediaState;
