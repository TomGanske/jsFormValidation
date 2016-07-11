# jsFormValidation Repository

- Version 1.0.0
- Date 16. July 2016
- Author Tom Ganske


## Improve your Front-End form behavior with jsFormValidation (no jQuery!)

Thats the first version of jsFormValidation with a size of **4KB** and will be improved.
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


## Code Example

	**STANDARD FORM FIELD DEFINITION**
	<label for="field" class="required">
      <span>Field</span>
      <input type="password" id="field" minlength="8" maxlength="35" onkeyup="selectFunction(this)" autocomplete="off" required>
      <ul class="rules">
        <li>min. 8 char</li>
        <li>upper- and lower chars</li>
        <li>min. one special sign</li>
      </ul>
    </label>

	**SELECT FIELD DEFINITION**
	<label for="field" **class="required"**>
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

    **FIELDSET CHECKBOX DEFINITION**
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

    **FIELDSET RADIO DEFINITION**
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


## Motivation

Most forms are validate on server side. Thats truly a bad scenario in the mobile world. Thats the reason why I wrote this script to prevent this mistakes.


## Installation

1. Init form by setup a form id. Example: <form **id="demo"**>
2. Suround your input form element by the label tag
3. Set the **class="required"** attribute to the label tag, required will be replaced by valid if the form is checked true 
3. Every form element get the **selectFunction(this)** methode depends on there action ie. onclick, onchange, onkeyup and so on
4. Open formValidation.js file and go to the function definition **selectFunction** and add your form element to the switch loop as a own case.
	ie.: case "firstname"     : textFunc(ele,eValue,inputLength,minLength,maxLength,rules);break;
5. Depends on the form field you should set attributes like minlength, maxlength, pattern


## License

Open Source project. Feel free to use it for commercial and private use. No licence provided.