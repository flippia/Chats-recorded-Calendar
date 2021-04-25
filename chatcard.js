const list = document.querySelector('.list');

const days = document.querySelector('.days');
// console.log(days);
const chosenday = document.querySelector('.chosenday');

const closeButton = document.querySelector('.close-button');

const overlay = document.getElementById('overlay');

const getChats = async(mon, date, year) => {
    const response = await fetch(`chats/${mon}${date}${year}.json`);
    const data = await response.json();        
    return data;    
};

const conversation = items => {
    items.forEach(item => {
        // console.log(list.innerHTML);
        let html = ``;
        if(item.time){
            if(item.user === 'A'){
                html = `
                    <li class="leftChat">
                        <div class="time">
                            <span class="time">${item.time}</span>
                        </div>
                        <div class="layout">
                            <div class="img"><img src="pic/Smile and say Carrots rabbit.jpg"></div>
                            <div class="item">${item.content}</div>
                        </div>
                    </li>
                `;
            } else {
                html = `
                    <li class="rightChat">
                        <div class="time">
                            <span class="time">${item.time}</span>
                        </div>
                        <div class="layout">
                            <div class="img"><img src="pic/Smile and say Carrots fox.jpg"></div>
                            <div class="item">${item.content}</div>
                        </div>
                    </li>
                `;
            }
        } else {
            if(item.user === 'A'){
                html = `
                    <li class="leftChat">
                        <div class="layout">
                            <div class="img"><img src="pic/Smile and say Carrots rabbit.jpg"></div>
                            <div class="item">${item.content}</div>
                        </div>
                    </li>
                `;
            } else {
                html = `
                    <li class="rightChat">
                        <div class="layout">
                            <div class="img"><img src="pic/Smile and say Carrots fox.jpg"></div>
                            <div class="item">${item.content}</div>
                        </div>
                    </li>
                `;
            }        
        }
        list.innerHTML += html;
    });
};

// days.addEventListener('click', e => {
//     console.log(e.target.classList);
//     if(!e.target.childElementCount && !e.target.classList.contains('pre-date') && !e.target.classList.contains('next-date')){
//         list.innerHTML = "";
//         date.setDate(e.target.innerText);
//         chosenday.innerHTML = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
//         getChats(jsonMonths[date.getMonth()],("0"+e.target.innerText).slice(-2),date.getFullYear()).then(items => conversation(items));
//         openCard();
//         date.setDate(1);
//     }
// });

days.addEventListener('click', e => {
    // console.log(e.target.innerText);
    if(!e.target.childElementCount){
        if(e.target.classList.contains('pre-date')) {
            date.setMonth(date.getMonth() - 1, e.target.innerText);
        } else if (e.target.classList.contains('next-date')) {
            date.setMonth(date.getMonth() + 1, e.target.innerText);
        } else { date.setDate(e.target.innerText); }
        list.innerHTML = "";
        chosenday.innerHTML = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
        getChats(jsonMonths[date.getMonth()], ("0" + e.target.innerText).slice(-2), date.getFullYear()).then(items => conversation(items));
        openCard();
        if(e.target.classList.contains('pre-date')) {
            date.setMonth(date.getMonth() + 1, 1);
        } else if (e.target.classList.contains('next-date')) {
            date.setMonth(date.getMonth() - 1, 1);
        } else { date.setDate(1); }
    }
});

closeButton.addEventListener('click', () => {
    closeCard();
});

const openCard = () => {
    const card = document.querySelector('.card');
    card.classList.add('active');
    overlay.classList.add('active');

    const calendar = document.querySelector('.calendar');
    calendar.classList.add('moveleft');
};

const closeCard = () => {
    const card = document.querySelector('.card');
    card.classList.remove('active');
    overlay.classList.remove('active');

    const calendar = document.querySelector('.calendar');
    calendar.classList.remove('moveleft');
};

overlay.addEventListener('click', () => {
    const cardActive = document.querySelector('.card.active');
    cardActive.classList.remove('active');
    overlay.classList.remove('active');

    const calendar = document.querySelector('.calendar');
    calendar.classList.remove('moveleft');
});
