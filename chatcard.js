const days = document.querySelector('.days');
// console.log(days);
const chosenday = document.querySelector('.chosenday');

const closeButton = document.querySelector('.close-button');

const overlay = document.getElementById('overlay');

const getChats = async(mon,date,year) => {
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
                        <div class="img"><img src="pic/Smile and say Carrots rabbit.jpg"></div>
                        <div class="item">${item.content}</div>
                    </li>
                `;
            } else {
                html = `
                    <li class="rightChat">
                        <div class="time">
                            <span class="time">${item.time}</span>
                        </div>
                        <div class="item">${item.content}</div>
                        <div class="img"><img src="pic/Smile and say Carrots fox.jpg"></div>
                    </li>
                `;
            }
        } else {
            if(item.user === 'A'){
                html = `
                    <li class="leftChat">
                        <div class="img"><img src="pic/Smile and say Carrots rabbit.jpg"></div>
                        <div class="item">${item.content}</div>
                    </li>
                `;
            } else {
                html = `
                    <li class="rightChat">
                        <div class="item">${item.content}</div>
                        <div class="img"><img src="pic/Smile and say Carrots fox.jpg"></div>
                    </li>
                `;
            }        
        }
        list.innerHTML += html;
    });
};

days.addEventListener('click', e => { 
    list.innerHTML = "";       
    date.setDate(e.target.innerText);
    chosenday.innerHTML = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    getChats(jsonMonths[date.getMonth()],("0"+e.target.innerText).slice(-2),date.getFullYear()).then(items => conversation(items));
    openCard();
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
