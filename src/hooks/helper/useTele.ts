let teleBOT = process.env.REACT_APP_TELE_BOT;
let teleChat = process.env.REACT_APP_TELE_CHAT;

export function teleAnalytic() {
  let string =
    `https://api.telegram.org/${teleBOT}/sendMessage?chat_id=${teleChat}&text=` +
    window.navigator.userAgent;

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
    }
  };
  xhr.open("GET", string, true);
  xhr.send(null);
}

export function teleModeration(id: string, title: string, content: string, action:string) {
  let string = `https://api.telegram.org/${teleBOT}/sendMessage?chat_id=${teleChat}&text=
    Posted Story ${"\n"}
    action:${action} ${"\n"}
    id: ${id} ${"\n"}
    title: ${title} ${"\n"}
    content:${content} ${"\n"}
    `;

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
    }
  };
  xhr.open("GET", string, true);
  xhr.send(null);
}
