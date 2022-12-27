let userName = document.getElementById('username')
let pasword = document.getElementById('password')
let submit = document.getElementById('submit')

userName.addEventListener('blur',()=>{
    console.log('this is username validation')
    let regex = /^[a-zA-Z][_0-9a-zA-Z]{2,20}$/
    let str = userName.value;
    if(regex.test(str.trim())){
        console.log('Test PAssed')
    }else{
        console.log('Test Failed')
    }
})