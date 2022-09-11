const baseUrl = 'http://solidappmaker.ml:5042/api/v1/';
const fileUrl = 'http://solidappmaker.ml:5042/files/';


const getCurrentTimeStamp = () => {
    let currentTime = new Date().getTime();
    let tzOffset = new Date().getTimezoneOffset();
    return Math.round(new Date(currentTime + tzOffset).getTime() / 1000);
}

export { baseUrl,getCurrentTimeStamp,fileUrl}

