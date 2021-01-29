function Course(buy, sell) {
    return {
        buy,
        sell
    }
    
}


let arrCourse = [];
if (localStorage.getItem('course')) {
    arrCourse = JSON.parse(localStorage.getItem('course'))
} else {
    let grn = new Course(1, 1);
arrCourse.push(grn)
let dol = new Course(28.21, 28.43)
arrCourse.push(dol)
let evro = new Course(33.15, 33.50)
arrCourse.push(evro)
let rub = new Course(0.3711, 0.3771);
arrCourse.push(rub);
}



function insertCourse(allcourse) {
    let tab = document.querySelector('#tab_course');
    let rows = tab.rows;
    for (let i = 1; i < allcourse.length; i++) {
        rows[i].cells[1].innerHTML = allcourse[i].buy;
        rows[i].cells[2].innerHTML = allcourse[i].sell;
    }
}

function changeCourse() {
    let dol = prompt('Введите курс USD (покупку и продажу через пробел)')
    if (dol) {
        dol = dol.split(' ')
        arrCourse[1] = new Course(Number(dol[0]), Number(dol[1]))
    }
    let evro = prompt('Введите курс EUR (покупку и продажу через пробел)')
    if (evro) {
        evro = evro.split(' ')
        arrCourse[2] = new Course(Number(evro[0]), Number(evro[1]))
    }
    let rub = prompt('Введите курс RUB (покупку и продажу через пробел)')
    if (rub) {
        rub = rub.split(' ')
        arrCourse[3] = new Course(Number(rub[0]), Number(rub[1]))
    }
    insertCourse(arrCourse)
    saveLocalStore()
}
let btn = document.querySelector('button');
btn.addEventListener('click', changeCourse)

insertCourse(arrCourse)


let inpt_buy = document.querySelector('#inpt_buy')
let inpt_sell = document.querySelector('#inpt_sell')
let select1 = document.querySelector('#buys')
let select2 = document.querySelector('#sells')

let changeInputValue = function () {
    if(select1.value === select2.value) {
        inpt_sell.value = inpt_buy.value
    } else if(select2.value === '0') {
        inpt_sell.value = String(Math.round(Number(inpt_buy.value) * (arrCourse[select1.value].buy * 100)) / 100);
    } else {
        inpt_sell.value = String(Math.round((Math.round(Number(inpt_buy.value) * (arrCourse[select1.value].buy * 100)) / 100) / arrCourse[select2.value].sell * 100) / 100);
    }
}


inpt_buy.addEventListener('input', changeInputValue)
inpt_sell.addEventListener('input', () => {
    if(select1.value === select2.value) {
        inpt_buy.value = inpt_sell.value
    } else if(select2.value === '0') {
        inpt_buy.value = String(Math.round(Number(inpt_sell.value) / arrCourse[select1.value].buy * 100) / 100);
    } else {
        inpt_buy.value = String(Math.round((Math.round(Number(inpt_sell.value) * arrCourse[select2.value].sell * 100) / 100) / arrCourse[select1.value].buy * 100) / 100);
    }
})
select1.addEventListener('change', changeInputValue)
select2.addEventListener('change', changeInputValue)

let change = document.querySelector('.change');
change.addEventListener('click', () => {
    let temp = select1.value;
    select1.value = select2.value;
    select2.value = temp;
    changeInputValue()
})

let real = document.querySelector('#real')
real.addEventListener('input', () => {
    let rest = Math.round((Number(inpt_buy.value) * arrCourse[select1.value].buy - Number(real.value) * arrCourse[select2.value].sell) * 100) / 100;
    document.querySelector('#rest').value = `${rest} грн`
})

function saveLocalStore() {
    let data = JSON.stringify(arrCourse)
    localStorage.setItem('course', data)
}