'use strict';

const selectList = document.querySelector('select');
const inputRub = document.querySelector('#rub');
const btnCount = document.querySelector('button');
const outputResult = document.querySelector('.output__text');
selectList.value = 'none';

document.addEventListener('DOMContentLoaded', () => {
    const request = new XMLHttpRequest();
    request.open('GET', 'https://www.cbr-xml-daily.ru/daily_json.js');
    request.send();
    request.addEventListener('load', () => {
        //request
        if (request.status === 200) {
            const data = JSON.parse(request.response);
        //определение валюты
            for (let bankCurr in data.Valute) {
        //работа со списком
                selectList.addEventListener('change', (e) => {
                    let selectedCurr = (e.target.value);
                    inputRub.value = null;
                    outputResult.textContent = '';
                    if (selectedCurr == data.Valute[bankCurr].CharCode) {
                        const calcCurrency = data.Valute[bankCurr].Value;
        //работа с инпутом
                        inputRub.addEventListener('input', () => {
                            let result;
                            if (selectList.value == 'none') {result = 'Выберите валюту из списка выше'} 
                            else {
                            result = (inputRub.value / calcCurrency).toFixed(2);}
        //вывод
                            outputResult.textContent = result;                     
                        }); 
                }
            });
            }
        }
        btnCount.addEventListener('click', () => {
            outputResult.textContent = '';
            inputRub.value = '';
            selectList.value = 'none';
        });
    });
});