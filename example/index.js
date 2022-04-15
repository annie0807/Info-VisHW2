var giveMePi = document.getElementById('show-pi')
var app = document.getElementById('app')
var colorChanger = document.getElementById('color-changer')
var colorInput = document.getElementById('color-value')
var message = document.getElementById('message')
var clock = document.getElementById('clock')

var colorChangeHistory = []
var time = new Date()
clock.innerHTML = time.toTimeString().split(' ')[0]

giveMePi.addEventListener('click', () => {
    message.innerHTML = Math.PI
})

colorChanger.addEventListener('click', () => {
    changeColor(colorInput.value)
})

function changeColor(color){
    clock

function update(){
    time = new Date()
    clock.innerHTML = time.toTimeString().split(' ')[0]
}

window.setInterval(update, 1000)