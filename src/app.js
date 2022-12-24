// 웹팩의 loader를 통해 css를 모듈로 가져올 수 있게 됨
import './app.css';
import nyancat from './nyancat.jpg';

document.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML = `
        <img src="${nyancat}" />
    `
})