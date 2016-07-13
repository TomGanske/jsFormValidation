# jsFormValidation Repository

- Version 1.0.2
- Date 16. July 2016
- Author Tom Ganske


## Realtime form validation with jsFormValidation.js (no jQuery!)

Thats the first version of jsFormValidation with a size of **4KB** if minimized and will be improved.
**jsFormValidation** field support:
- text
- date
- number
- tel
- email
- checkbox
- radio
- textarea
- select
- password
- postcode

jsFormValidaton supports also multiple form definitions on one website.

By **deactivated javascript** the standard behavior off **css** will be replaced the functionality.


## Code Examples

#####STANDARD FORM FIELD DEFINITION
```html
<label for="field" class="required">
 <span>Field</span>
 <input type="password" id="field" minlength="8" maxlength="35" 
        onkeyup="selectFunction(this)" autocomplete="off" required>
 <ul class="rules">
  <li>min. 8 char</li>
  <li>upper- and lower chars</li>
  <li>min. one special sign</li>
 </ul>
</label>
```

#####SELECT FIELD DEFINITION
```html
<label for="field" class="required">
 <span>Field</span>
 <div class="select-wrapper required">
  <select id="field" onchange="selectFunction(this)" required>
   <option selected></option>
   <option>Case 1</option>
   <option>...</option>
  </select>
 </div>
 <ul class="rules">
  <li>min. 1 selection</li>
 </ul>
</label>
```

#####FIELDSET CHECKBOX DEFINITION
```html
<fieldset class="c-checkbox">
 <span>Field</span>
 <label for="checkbox" class="required">
  <input type="checkbox" id="checkbox" value="agb" name="agb" onclick="selectFunction(this)" required>
  Checkbox Label
 </label>
 <label for="checkbox2" class="required">
  <input type="checkbox" id="checkbox2" value="wr" name="wr" onclick="selectFunction(this)" required>
  Checkbox Label 2
 </label>
</fieldset>
```

#####FIELDSET RADIO DEFINITION
```html
<fieldset class="c-radio required">
 <span>Field</span>
 <label for="radio3">
  <input type="radio" id="radio3" value="MS" name="radio" onclick="selectFunction(this)" required>
  Radio
 </label>
 <label for="radio4">
  <input type="radio" id="radio4" value="PP" name="radio" onclick="selectFunction(this)">
  Radio 2
 </label>
</fieldset>
```

## Motivation

Most forms are validate on server side. Thats truly a bad scenario in the mobile world.
Thats the reason why I wrote this script to make forms better in the future and
improve the usability.


## Installation

1. set a id to your form
   ```html < form id="demo" > ```
2. set the required attribute for every mandatory form element
3. suround your input form elements by the **label** tag,
   exception are select fields or radio and checkbox groups 
4. Set **class="required"** attribute to the label tag, required will be replaced later by valid if the form field is true 
5. every form element get the **selectFunction(this)** methode depends on there action, methods: onclick, onchange, onkeyup
6. **open jsFormValidation.js** file and go to the function definition **selectFunction** and registry your form element to the switch loop as a own case with the right method. ie.: 
  ```javascript
  case "firstname"     : textFunc(ele,eValue,inputLength,minLength,maxLength,rules);break;
  ```
7. depends on the form field you should set attributes like minlength, maxlength, pattern and so on and if you are not sure see the JS methode which attributes are needed


## License

Open Source project. Feel free to use it for commercial and private use. No licence provided.