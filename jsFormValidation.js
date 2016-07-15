 /*
    Author: Tom Ganske
    Date: 11.07.2016
    URL: http://www.ct-eye.com
    GIT: https://github.com/TomGanske
    Version 1.0.2

    ** OPEN-SOURCE **
    Feel free to change or improve the code.
    It`s free to use it in commercial and projects.
  */

(function () {

  // -------- nothing to change here --------

  // PRIVATE + GLOBAL VARS (inside this anonymouse function)
  var cSuccess              = "#227647";
  var cError                = "#D93600";
  var array                 = {};
  var aSubmitForm           = [];
  var regExEmail            = /[@.]/g;
  var regExExtend           = /[#@.:,;+'*`?=)(&%$§!\"\/\\\\]/g; // custom string :: extend if necessary ie. string.match(regEx)
  var regStandard           = /[^\w\s]/g;
  var regStandardUsername   = /[^\w\s@.]/g;
  var regStandardNumber     = /[\d]/g;
  var regTextNumber         = /[^\w\d -]/g;
  var deRegStandard         = /[^\w\s äÄöÖüÜ]/gi;
  var allowedForms          = ['form:not([id="quicksearchform"])'];
  var allowedInputsTypes    = ['input:not([type="hidden"]):required','input[type="submit"]','checkbox','radio','range','select','textarea'];
  // -------- nothing to change here END --------



  // CUSTOM FUNCTION AND SETTINGS _______________
  //---------------------------------------------
  // Registry your FIELD inside the SWITCH LOOP and set the right function which should be called
  // to check the input value and dependencies
  selectFunction = function(ele) {
      var eleId       = (ele.type === "radio" || ele.type === "checkbox") ? ele.name : ele.id,
  	    eValue      = ele.value,
      	maxLength   = (ele.hasAttribute("max")) ? parseInt(ele.getAttribute("max").length) : (ele.hasAttribute("maxlength")) ? parseInt(ele.getAttribute("maxlength")) : 0,
        minLength   = (ele.hasAttribute("min")) ? parseInt(ele.getAttribute("min").length): (ele.hasAttribute("maxlength")) ? parseInt(ele.getAttribute("minlength")) : 0,
      	inputLength = eValue.toString().length,
      	rules       = (ele.nodeName !== "SELECT" && ele.type !== "radio" && ele.type !== "checkbox") ? ele.nextSibling.nextSibling.children : '',
        submit      = ele.parentNode.parentNode.parentNode.parentNode.querySelector('input[type="submit"]');

        console.log(eleId);
    // set fields
  	switch(eleId) {
     case "number"        : numberFunc(ele,eValue,inputLength,minLength,maxLength,rules); break;
     case "topic"         : selectFunc(ele); break;
     case "firstname"     : textFunc(ele,eValue,inputLength,minLength,maxLength,rules);break;
     case "email"         : textFunc(ele,eValue,inputLength,minLength,maxLength,rules);break;
     case "message"       : textareaFunc(ele,eValue,inputLength,minLength,maxLength,rules);break;
     case "password"      : passwordFunc(ele,eValue,inputLength,minLength,maxLength,rules);break;
     case "postcode"      : postCodeFunc(ele,eValue,inputLength,minLength,maxLength,rules);break;
     case "Zahlmethode"   : radioCheckboxFunc(ele);break;
     case "Zahlmethode2"  : radioCheckboxFunc(ele);break;
     case "agb"           : radioCheckboxFunc(ele);break;
     case "wr"            : radioCheckboxFunc(ele);break;
     case "birthdate"     : "";break;
     default              : "";break;
    }
    // field valid = ?, set Label: valid or required
    setLabelValid(ele,eleId);

    // isSubmit ?
    formValid(submit);
  }




    //
    // Do not change anything after that line, until you know what you do.
    //

    // init Form
    init = function () {

        var formList = document.querySelectorAll(allowedForms);
        var fieldList = [];
        var list;

        for(var i =0; i < formList.length;i++){
            list = formList[i].querySelectorAll(allowedInputsTypes);

            // add  Form + Elements to fieldList only if list has more Properties than 'submit' as field
            if(list.length > 1) {
                fieldList[formList[i].id] = list;
                aSubmitForm[formList[i].type] = formList[i].querySelector('input[type="submit"]').setAttribute("disabled","");
            }
        }

        // set for every form field the value false
        addInputFields(fieldList);
    }

    // add all elements if the are .required to the list
    function addInputFields(elements) {

        var formItem,item;
        for(formItem in elements) {
            array[formItem] = {};
            if(elements[formItem].length > 0 || elements[formItem] === "submit" ) {
                var count = elements[formItem].length;
                for(var i=0;i<count;i++) {
                    if(elements[formItem][i].required) {
                        if(elements[formItem][i].type === "radio" || elements[formItem][i].type === "checkbox") {
                            array[formItem][elements[formItem][i].name] = false;
                        } else {
                            array[formItem][elements[formItem][i].id] = false;
                        }
                    }

                    // submit button
                    if(elements[formItem][i].type === "submit") {
                        array[formItem][elements[formItem][i].type] = false;
                    }
                }
            }
        }
    }

    // PostCode
    function postCodeFunc(ele,eValue,inputLength,minLength,maxLength,rules) {

        if(isNaN(eValue)){
            setRules(rules,1,"error");
        } else {
            setRules(rules,1,"success");
        }

        // check length
        setFieldValid(ele.id,checkLength(ele,eValue,inputLength,minLength,maxLength,rules,0));
    }

    // Names + E-Mail
    function textFunc(ele,eValue,inputLength,minLength,maxLength,rules) {

        var isValidString = false;

        // check only strings permitted and E-Mail`s
        if(checkString(ele,eValue)) {
            setRules(rules,1,"success");
            isValidString = true;
        }
        else {
            setRules(rules,1,"error");
        }

        // set formValide for entry
        if(checkLength(ele,eValue,inputLength,minLength,maxLength,rules,0) && isValidString)
            setFieldValid(ele.id,true);
        else
            setFieldValid(ele.id,false);
    }

    // Number
    function numberFunc(ele,eValue,inputLength,minLength,maxLength,rules) {
        var bIsNumber=false; 
        if(!eValue.match(regStandardNumber)) {
            ele.value = eValue.substring(0, eValue.length - 1);
            setRules(rules,1,"error");
        }
        else {
            setRules(rules,1,"success");
            bIsNumber=true;
        }

        // set formValide for entry
        if(checkLength(ele,eValue,inputLength,minLength,maxLength,rules,0) && bIsNumber)
            setFieldValid(ele.id,true)
        else
            setFieldValid(ele.id,false);
    }

    // Text + Number
    function textNumberFunc(ele,eValue,inputLength,minLength,maxLength,rules) {

        // check only strings permitted and E-Mail`s, reset also minLength Rule
        if(!checkStringNumber(ele,eValue,rules,1)) {
            setRules(rules,0,"error");
            setFieldValid(ele.id,false);
            return ;
        }


        // set formValide for entry
        setFieldValid(ele.id,checkLength(ele,eValue,inputLength,minLength,maxLength,rules,0))
    }

    // Username special function
    function usernameFunc(ele,string,inputLength,minLength,maxLength,rules) {

        // check if string starts with whitespace, true DELETE entry
        if (whitespaceStarForbidden(string)) {
            ele.value = string.substring(0, string.length - 1);
            setRules(rules, 1, "error");
            return false;
        }

        // remove special chars and ä-Ä ...
        ele.value = string.replace(regStandardUsername, '');

        if(string.length > 0) {
            setRules(rules, 1, "success");
        } else {
            setRules(rules, 1, "error");
        }

        setFieldValid(ele.id,checkLength(ele,string,inputLength,minLength,maxLength,rules,0))
    }

    // Password
    function passwordFunc(ele,eValue,inputLength,minLength,maxLength,rules) {
        // check password string
        var bPasswordString = lowerUpperCaseFunc(ele,eValue,rules,1);

        // check if special char is set
        var bSpecialChar = isSpecialChar(eValue,rules,2);

        // set formValide for entry
        var bLength = checkLength(ele,eValue,inputLength,minLength,maxLength,rules,0);

        if(bPasswordString && bSpecialChar && bLength)
            setFieldValid(ele.id,true);
        else
            setFieldValid(ele.id,false);
    }

    // Password Check (compare two passwords)
    function passwordCheckFunc(ele,eValue,oldPasswordField,rules) {

        // set orignal Password
        var oldPassword = document.getElementById(oldPasswordField);

        // compare passwords
        if(eValue === oldPassword.value){
            setRules(rules,0,"success");
            setFieldValid(ele.id,true);
        }
        else {
            setRules(rules,0,"error");
            setFieldValid(ele.id,false);
        }
    }

    // Select
    function selectFunc(ele) {
        // set formValide for entry
        setFieldValid(ele.id,checkSelect(ele));
    }

    // Message
    function textareaFunc(ele,eValue,inputLength,minLength,maxLength,rules) {
        // check only strings permitted
        checkStringTextarea(ele,eValue,rules,1);

        // set formValide for entry
        setFieldValid(ele.id,checkLength(ele,eValue,inputLength,minLength,maxLength,rules,0));
    }

    // radio + checkbox
    function radioCheckboxFunc(ele) {
        setFieldValid(ele.name,isActive(ele))
    }






    //
    // helper Functions
    //

    // check status of Radio and Checkboxes
    function isActive(ele) {
        return (ele.checked) ?  true : false;
    }

    // only Integer
    function checkNumber(ele,eValue,rules,pos) {
        if (eValue === 0  || isNaN(eValue)) {
            setRules(rules, pos, "error");
            ele.value = "";
        }
        else {
            setRules(rules, pos, "success");
        }
    }

    // only String
    function checkString(ele,eValue) {

        // if element type is e-mail, check it and return
        if(ele.type === "email") {

            var match = eValue.match(regExEmail);

            if(match !== null) {
                if (validateEmail(eValue)) {
                    // is Email
                    return true;
                }
                else {
                    // wrong Email Format
                    return false;
                }
            }
            else
                return false;
        }

        // detect numbers or special chars
        var matchNumbers = eValue.match(regStandardNumber);
        var matchSpChars = eValue.match(regExExtend,'');


        // numbers or special chars detected, remove last entry
        if(matchNumbers !== null || matchSpChars !== null ) {
            ele.value = eValue.toString().substring(0,eValue.length-1);
            return false;
        }
        else if(isNaN(Number(eValue))) {
            return true;
        }
        else {
            ele.value = "";
            return false;
        }
    }

    // only String and Numbers
    function checkStringNumber(ele,eValue,rules,pos){

        var newValue = '';

        // check if string starts with whitespace, true DELETE entry
        if(whitespaceStarForbidden(eValue)) {
            ele.value = eValue.substring(0, eValue.length - 1);
            setRules(rules,1,"error");
            return false;
        }

        // detect special chars
        var matchSpChars = eValue.match(regExExtend,'');
        if(matchSpChars !== null) {
            ele.value = eValue.toString().substring(0, eValue.length - 1);
            return false;
        }

        // value should not Empty
        if(eValue.length > 0) {
            newValue = eValue.replace(regTextNumber,'');
        }


        // value should not 0, set length message to false
        if(newValue.length === 0) {
            setRules(rules,1,"error");
            return false;
        }

        ele.value = newValue;

        if(newValue === eValue) {
            setRules(rules,pos,"success");
            return true;
        }
        else {
            setRules(rules,pos,"error");
            ele.value = newValue;
            return false;
        }
    }

    // has string lower. and uppercase letters
    function lowerUpperCaseFunc(ele,string,rules,pos) {
        var i=0;
        var character='';
        var bLower = false;
        var bUpper = false;


        // check if string starts with whitespace, true DELETE entry
        if(whitespaceStarForbidden(string))
            ele.value= string.substring(0,string.length-1);

        // remove special chars before check starts
        var newString = string.replace(regExExtend, '');


        while (i <= newString.length) {
            character = newString.charAt(i);
            if (!isNaN(character * 1)) {
            }
            else {
                if (character == character.toUpperCase()) {
                    bUpper = true;
                }
                if (character == character.toLowerCase()) {
                    bLower = true;
                }
            } i++;
        }

        if(bUpper && bLower) {
            setRules(rules,pos,"success");
            return true;
        }
        else {
            setRules(rules,pos,"error");
            return false;
        }
    }

    // forbidden to start a string with a whitespaces char
    function whitespaceStarForbidden(string) {
        if(string.charAt(0)===" ")
            return true;
    }

    // check special chars, return bool, @deprecated
    function isSpecialChar(string,rules,pos) {
        if(string.length === null || string.length === 0) {
            setRules(rules,pos,"error");
            return false;
        }

        if(string.match(regExExtend) !== null) {
            setRules(rules,pos,"success");
            return true;
        }
        else {
            setRules(rules,pos,"error");
            return false;
        }
    }

    // only String and Numbers, no special chars
    function checkStringTextarea(ele,eValue,rules,pos) {

        // accept only letters and numbers and special chars
        ele.value = eValue.replace(/[^\w\s-,.'?!"ßäÄöÖüÜ€$]/gi,'');

        if(isNaN(Number(eValue))) {
            setRules(rules,pos,"success");
        }
        else {
            setRules(rules,pos,"error");
            ele.value = "";
        }
    }

    // return bool value
    function validateEmail(email) {
        var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(email);
    }

    // check length
    function checkLength(ele,eValue,inputLength,minLength,maxLength,rules,pos){
        if(inputLength < minLength) {
            setRules(rules,pos,"error");
            return false;
        }
        else if (inputLength >= minLength && inputLength <= maxLength) {
            setRules(rules,pos,"success");
            return true;
        }
        else {
            ele.value = eValue.toString().substring(0, maxLength);
            return true;
        }
    }

    // check select
    function checkSelect(ele) {
        if(ele.options[ele.selectedIndex].text !== "") {
            return true;
        }
        else {
            return false;
        }
    }

    // set Messages true/false
    function setRules(rules, pos, color) {
        rules[pos].style.color = (color == "error") ? cError : cSuccess;
        rules[pos].style.fontWeight = "bold";

        if (color == "error")
            rules[pos].classList.remove("icon-check");
        else
            rules[pos].classList.add("icon-check");
    }

    // set field valid
    function setFieldValid(eleId,bValue) {
        var key;
        for(key in array) {
            if(array[key].hasOwnProperty(eleId))
                array[key][eleId] = bValue;
        }
    }

    // set "label" the class valid or required
    function setLabelValid(ele,eleId) {

        var key;
        var parentNode = '';

        switch(ele.type) {
            case "select-one"       : parentNode = ele.parentNode.parentNode; break;
            case "select-multiple"  : parentNode = ele.parentNode.parentNode; break;
            case "radio"            : parentNode = ele.parentNode.parentNode; break;
            case "text"             : parentNode = ele.parentNode; break;
            case "email"            : parentNode = ele.parentNode; break;
            case "number"           : parentNode = ele.parentNode; break;
            case "textarea"         : parentNode = ele.parentNode; break;
            case "checkbox"         : parentNode = ele.parentNode; break;
            case "password"         : parentNode = ele.parentNode; break;
            case "date"             : parentNode = ele.parentNode; break;
            case "range"            : parentNode = ele.parentNode; break;
            default                 : ""; break;
        }

        for(key in array) {
            if (array[key][eleId]) {
                parentNode.classList.remove("required");
                parentNode.classList.add("valid");
            }
            else {
                parentNode.classList.remove("valid");
                parentNode.classList.add("required");
            }
        }
    }

    // set form Valid and Submit to disabled true/false
    function formValid(submit) {
        var key,items;
        for (key in array) {
            if(array[key].hasOwnProperty('submit')) {
                for(items in array[key]){
                    if(array[key][items])
                        array[key]['submit'] = true;
                    else {
                        array[key]['submit'] = false;
                        return;
                    }
                }
            }
            if (array[key]['submit']) {
                submit.removeAttribute("disabled","");
                return;
            }
            else {
                if(submit !== null)
                    submit.setAttribute("disabled", "");
                return;
            }
        }
    }
})();


 window.onload = function () {
     init();
 };