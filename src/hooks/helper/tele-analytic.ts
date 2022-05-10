let teleBOT=process.env.REACT_APP_TELE_BOT
let teleChat=process.env.REACT_APP_TELE_CHAT

export default function teleAnalytic() {
  let string =
    `https://api.telegram.org/${teleBOT}/sendMessage?chat_id=${teleChat}&text=` +
    window.navigator.userAgent;

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
    }
  };
  xhr.open("GET", string, true);
  xhr.send(null);
}
