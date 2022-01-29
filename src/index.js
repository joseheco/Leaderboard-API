import './styles.css';
import {
  name,
  score,
  submitBtn,
  refreshBtn,
} from './utils.js';
import sendData from './sendData.js';

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/JBpxyjlHr5ZjiBM74biA/scores/';

submitBtn.addEventListener('click', async () => {
  // eslint-disable-next-line no-restricted-globals
  event.preventDefault();
  await sendData(url, { user: name.value, score: score.value });
  name.value = '';
  score.value = '';
  const msg = document.getElementById('msg');
  setTimeout(() => { msg.innerHTML = 'Score added successfully'; }, 1000);
  setTimeout(() => { msg.innerHTML = ''; }, 4000);
});

const scoresLi = document.getElementsByClassName('boardList')[0];

const loadList = async () => {
  scoresLi.innerHTML = '';
  const { result: scores } = await fetch(url)
    .then((resp) => resp.json());
  scores.forEach((result) => {
    const list = document.createElement('li');
    list.innerHTML = `${result.user} : ${result.score}`;
    scoresLi.appendChild(list);
  });
};

refreshBtn.addEventListener('click', loadList);
window.onload = loadList;
