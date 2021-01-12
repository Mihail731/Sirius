let square = document.getElementById('square');
square.onmouseover = square.onmouseout = square.onmousemove = handler;

function handler(event) {
  let type = event.type;
  while (type < 11) type += ' ';

  log(type + " target=" + event.target.id)
  return false;
}

function clearText() {
  text.value = "";
  lastMessage = "";
}
let concounterv = 0;
let medcounterv = 0;
let lastMessageTime = 0;
let lastMessage = "";
let repeatCounter = 1;
let mezh = 0;
let best_score=0;
let all_score=0;
let count_out=1; /*Количество выходов из квадрата*/
let lastframetime=0;
function log(message) {
  if (lastMessageTime == 0) lastMessageTime = new Date();
  square.style.backgroundColor= 'rgb(' + concounterv*255/100 + ',' + (medcounterv+concounterv)/2 + ',' + medcounterv*255/100 + ')';
  let time = new Date();

  if (time - lastMessageTime > 500) {
    message = 'Лучшее значение'+ best_score + 'количество выходов: '+ count_out +'\n' + message;
  }
//Ищем медитацию, здесь, раз в цикл, высчитывается, как много пользователь делал лишних движений внутри квадрата, за идеал берётся значение 250. Умножение на 100 необходимо для получения процента
let ntime = new Date();
if (ntime - lastframetime >= 6000) {
  medcounterv = (repeatCounter/250)*100;
  medcounter.value= medcounterv +'%';
  count_out=0;
  lastframetime=ntime;
}
  if (message === lastMessage) {
    repeatCounter++; /*Увеличение счётчика за каждый пиксель*/
    if (repeatCounter == 2) {
      text.value = text.value.trim() + 'x 2\n '; 
    } else {
      all_score+=1; /*общее кол-во пикселей перемещённых в квадрате*/
      text.value = text.value.slice(0, text.value.lastIndexOf('x') + 1) + repeatCounter + "\n";
    }

  } else {
    if (best_score < repeatCounter) {
      best_score = repeatCounter;
    }
    /*Пытаемся найти концентрацию,по принципу 1 делить на количество выходов, при этом, т.к. мы делим 1 на какое-либо целое число, оно не может быть больше 1 и меньше 0, поэтому проверка не нужна*/
    concounterv = (1/count_out)*100
    concounter.value=concounterv + '%';
    /*Закончили пытаться найти концентрацию*/
    count_out+=1;
    repeatCounter = 1;
    text.value += message + "\n";
  }

  text.scrollTop = text.scrollHeight;

  lastMessageTime = time;
  lastMessage = message;
}
