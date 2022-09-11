import "izitoast/dist/css/iziToast.min.css";
import iZtoast from "izitoast";
iZtoast.settings({
  timeout: 2000,
  icon: "material-icons",
  transitionIn: "flipInX",
  transitionOut: "flipOutX",
});
const toast = {
  error: (message, title = "Error") => {
    return iZtoast.error({
      title: title,
      message: message,
      position: "topCenter",
    });
  },
  success: (message, title = "Success") => {
    return iZtoast.success({
      title: title,
      message: message,
      position: "topCenter",
    });
  },
};

export default toast;
