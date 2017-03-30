
function createCurrencyList(list) {
 var select = document.createElement('select');
    list.forEach(function (currency) {
        var option = document.createElement('option');
        option.value = currency.Cur_Abbreviation;
        option.textContent = currency.Cur_Name;
        select.appendChild(option);
    });

    return select;
}
var object = {};
function makeRequest(params, callback) {
var xhr = new XMLHttpRequest();
    xhr.open(params.method, params.url, true);
    xhr.responseType = 'json';
    xhr.addEventListener('loadend', function listener() {
        xhr.removeEventListener('loadend', listener);
        object = xhr.response;
        callback(object);
    });
    xhr.send();
}

function loadCurrencyRate(code, callback) {
    makeRequest({
        method: 'GET',
        url:'http://www.nbrb.by/api/ExRates/Rates/' + code + '?ParamMode=2'
    },callback);
}

function makeInput() {
    var input = document.createElement('input');
    input.type = 'number';
    input.placeholder = 'Enter amount';
    return input;
}

function conversion(input,object,h1) {
    var amount = (input.value * object.Cur_OfficialRate / object.Cur_Scale).toFixed(2);
    h1.textContent = `  = ${amount} BY`;
    h1.style.border = '2px solid #000';
    h1.style.borderRadius = '30px';
    h1.style.width = '350px';
    h1.style.textAlign = 'center';
    h1.style.background = 'yellow';
    return amount;
}

function alertMoney(amount) {
    alert(amount);
}

makeRequest({
    method:'GET',
    url:'http://www.nbrb.by/API/ExRates/Currencies'
}, function (list) {
    var select = createCurrencyList(list),
        input = makeInput(),
        amount,
        h1 = document.createElement('h1');
    loadCurrencyRate(select,function (rate) {
    });
    select.addEventListener('change',function () {
        var currencyCode = select.value;
        loadCurrencyRate(currencyCode,function (rate) {
            console.log(rate);
        });
        input.addEventListener('input', function () {
            amount = conversion(input,object,h1);
        });

    });
    document.body.appendChild(select);
    document.body.appendChild(input);
    document.body.appendChild(h1);

});



/*function loadCurrencyRate(code,callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET','http://www.nbrb.by/API/ExRates/Rates/' + code + '?ParamMode=2',true);
    xhr.addEventListener('loadend',function listener() {
        xhr.removeEventListener('loadend',listener);
        callback(xhr.response);
    });
    xhr.send();
}


    var xhr = new XMLHttpRequest();
    xhr.open('GET','http://www.nbrb.by/API/ExRates/Currencies',true);
    xhr.responseType = 'json';
    xhr.addEventListener('loadend',function listener() {
        xhr.removeEventListener('loadend',listener);
        var select = createCurrencyList(xhr.response);
        select.addEventListener('change',function () {
           var currencyCode = select.value;
            loadCurrencyRate(currencyCode,function (rate) {
                console.log(rate);
            });
        });
        document.body.appendChild(select);
    });
    xhr.send();*/

