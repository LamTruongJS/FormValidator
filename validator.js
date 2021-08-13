//Đối tượng validator
function validator(options){
        // lấy ra form-1
        var formElemnt = document.querySelector(options.form);
        
        if(formElemnt)
        {
           options.rules.forEach(function(rule){
               //lấy ra input hiện hành
                var inputElement= formElemnt.querySelector(rule.selector);
                if(inputElement)
                {
                    inputElement.onblur= function(){
                        //value: inputElement.value
                        //test function : rule.test                      
                        var errorMessage = rule.test(inputElement.value);
                        //parentElement--> lấy thẻ cha của thẻ input
                        //lấy thẻ message trùng với thẻ input đó
                        var errorElement= inputElement.parentElement.querySelector(".form-message");
                        if(errorMessage)
                        {
                            errorElement.innerText = errorMessage;
                            inputElement.parentElement.classList.add('invalid');
                        }
                        else
                        {
                            errorElement.innerText=" ";
                            inputElement.parentElement.classList.remove('invalid');
                        }
                        // sự kiện oninput
                        inputElement.oninput = function() {
                            errorElement.innerHTML = " ";
                        }
                    }
                }
           });
        }
}


//Định nghĩa các rule
//Nguyên tắc của các rules:
//1. Khi có lỗi => trả về mess lỗi
validator.isRequired = function(selector, message){
    return {
        selector: selector,
        test: function(value){
          return value.trim() ? undefined :message ||'Vui lòng nhập trường này'
        }
    };
}
validator.isEmail= function(selector){
    return {
        selector: selector,
        test: function(value){
            var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
          return regex.test(value) ? undefined :'Trường này phải là email'
        }
    };
}
validator.isPassword = function(selector, minlength){
    return{
        selector:selector,
        test:function(value){
           return value.length > minlength ? undefined: `Vui lòng nhập nhiều hơn ${minlength} kí tự`;
        }
    }
}
validator.isConfirmPassword = function(selector, getConfirmValue, message){
    return{
        selector:selector,
        test: function(value){
            if(!value)
            {
                return "Vui lòng nhập trường này";
            }
            else return value === getConfirmValue() ? undefined : message || "Giá trị không trùng khớp";
        }
    }
}

//ví dụ về import và export
// export function Mouse(color) {
//     this.color= color;
//     this.isdead = false;
// }
// Mouse.prototype.die= function () {
//     this.isdead = true;
// }

// export function Dog(color) {
//     this.color= color;
//     this.isSleeping= false;
// }
// Dog.prototype.sleep= function () {
//     this.isSleeping= true;
// }
