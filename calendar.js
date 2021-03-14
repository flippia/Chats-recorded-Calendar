const date = new Date();
const list = document.querySelector('.list');

const renderCalendar = () => {
    
    const monthDays = document.querySelector('.days');
    monthDays.innerHTML = '';

    //to get the date of the last day of current month
    const lastDay = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();

    //to get the date of the last day of last month
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    //to get the day of the first day of current month
    const firstDayIndex = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    // const firstDayIndex = date.getDay();

    //to get the day of the last day of current month
    const lastDayIndex = new Date(date.getFullYear(), date.getMonth()+1, 0).getDay();

    //days need to create and show on the calendar after the current month
    const nextDays = 7 - lastDayIndex - 1;

    //show current month and today on top
    document.querySelector('.date h1').innerHTML = months[date.getMonth()];

    //<p> tag shows today or the year html stays on
    if(date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()){
        document.querySelector('.date p').innerHTML = new Date().toDateString();
    }else{
        document.querySelector('.date p').innerHTML = date.getFullYear();
    };
    
    //to create the previous month days
    for(let x = firstDayIndex; x > 0; x--){
        monthDays.innerHTML += `<div class="pre-date">${prevLastDay - x + 1}</div>`;
    };

    //to create all days of the current month, including today & marked days
    for(let i = 1; i <= lastDay; i++){
        if(i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()){
            monthDays.innerHTML += `<div class="today">${i}</div>`;
        } else {
            markedDays.forEach(day => {
                if(i === Number(day.substring(3,5)) && jsonMonths[date.getMonth()] === day.substring(0,3) && date.getFullYear() === Number(day.substring(5,9))){
                    monthDays.innerHTML += `<div class="marked">${i}</div>`;
                };                               
            });
            if(!monthDays.innerHTML.includes(`<div class="marked">${i}</div>`)){
                monthDays.innerHTML += `<div>${i}</div>`;
            };
        }
    };

    //to create and show the days of next month on the calendar
    for(let j = 1; j <= nextDays; j++){
        monthDays.innerHTML += `<div class="next-date">${j}</div>`;    
    };
    
    // marked days
    // markedDays.forEach(day => {
    //     for (let i = 0; i < monthDays.childElementCount; i++) {
    //         if(i === Number(day.substring(3,5)) && jsonMonths[date.getMonth()] === day.substring(0,3) && date.getFullYear() === Number(day.substring(5,9))){
    //             monthDays.children[i].classList.add('marked');
    //         }            
    //     }
    // });

    //adjust the calendar size by the number of days shown
    if(monthDays.getElementsByTagName("div").length!=42){
        document.querySelector('.calendar').style.height = "39.45rem";
    }else{
        document.querySelector('.calendar').style.height = "43.75rem";        
    };
};

//show previous month
document.querySelector('.prev').addEventListener('click', () => {    
    date.setMonth(date.getMonth()-1);
    renderCalendar();    
});

//show next month
document.querySelector('.next').addEventListener('click', () => {
    date.setMonth(date.getMonth()+1);
    renderCalendar();    
});

renderCalendar();

