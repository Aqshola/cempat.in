let teleBOT = process.env.REACT_APP_TELE_BOT;
let teleChat = process.env.REACT_APP_TELE_CHAT;

export function teleAnalytic() {
  let string =
    `https://api.telegram.org/bot${teleBOT}/sendMessage?chat_id=${teleChat}&text=` +
    window.navigator.userAgent;

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
    }
  };
  xhr.open("GET", string, true);
  xhr.send(null);
}

export function teleModeration(
  id: string,
  title: string,
  content: string,
  action: string
) {
  const generateHTML = `
  Posted Story  \n 
  action: <b>${action} Story</b> \n
  id: <b>${id}</b>  \n
  title: <b>${title}</b> \n 
  content: ${content} \n
  date: ${new Date()}
  
  `;
  let string = `https://api.telegram.org/bot${teleBOT}/sendMessage?chat_id=${teleChat}&text=
    ${encodeURIComponent(generateHTML)}  
    &parse_mode=html`;

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
    }
  };
  xhr.open("GET", string, true);
  xhr.send(null);
}
