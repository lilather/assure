(function () {
  "use strict";

  function init() {

    let form = document.getElementById("contactForm");
    let controls = form.querySelectorAll(".input-form");
    let contactSubmit = document.getElementById("contactSubmit");
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      submit(form, contactSubmit);
    });
    // add foreach control.addEventListener("focusout", function(){
    controls.forEach((field) =>
      field.addEventListener("focusout", function (e) {
        handleInputErrors(e, contactSubmit);
      })
    );
  }

  function submit(form, contactSubmit) {
    // clear all previous errors
    form.querySelectorAll(".inputError span").forEach((n) => n.remove());
    // add processsing text to submit button
    contactSubmit.innerHTML = "<span>Processsing...</span>";
    //check form errors
    handleFormErrors(form, contactSubmit);
  }

  function handleFormErrors(form, contactSubmit) {
    //  get all inputs from form
    let control = form.querySelectorAll(".input-form");
    // initiate error count
   var  errors = 0;
    //foreach input check validations
    control.forEach(function (field) {
      //add errors from validator functions
      errors += handleRequired(field);
      console.log(handleRequired(field));
      errors += handleMin(field);
      errors += handleMax(field);
      // red border to input
      console.log(errors)
      if (errors){
        field.classList.add("reqError");

      }
     else{
        field.classList.remove("reqError");
      }
    });
    // if no errors send function
    if(errors ==0){
      sendContact(form, contactSubmit);
    }
    else{
    // if error add failed text to submit button and

      contactSubmit.innerHTML = "<span>Failed...</span>";

    }
  }




  
  function handleInputErrors(e, contactSubmit) {
  let errors=0;

    var field = e.currentTarget;
    errors+=handleRequired(field);
    errors+=handleMin(field);
    errors+=handleMax(field);


    if (errors){
      field.classList.add("reqError");
      contactSubmit.innerHTML = "<span>Failed...</span>";

    }
   else{
      field.classList.remove("reqError");
    }
  }

  function handleRequired(field) {
    if (field.attributes.required != undefined) {
      var requiredField = field.nextSibling.querySelectorAll(".required");
      if (field.value == "" && requiredField.length > 0) {
        return 0;
      }

      if (field.value == "" && requiredField.length == 0) {
        field.nextSibling.innerHTML += `<span class="required">this field is required </span>`;
        return 1;
      }
      if (field.value.length > 1 && requiredField.length > 0) {
        requiredField[0].parentNode.removeChild(requiredField[0]);
        return -1;
      }
      if (field.value.length > 1 && requiredField.length == 0) {
        return 0;
      }
    }
    else{
      return 0;
    }
  }

  function handleMin(field){
    if (field.attributes.minlength != undefined) {
      var  minValue =field.attributes.minlength.value;
      let minField = field.nextSibling.querySelectorAll(".minlength");
      let validated=field.attributes.minlength.value < field.value.length;
      if (!validated  && minField.length > 0) {
        return 1;
      }

    if (!validated && minField.length == 0) {
        field.nextSibling.innerHTML += `<span class="minlength">this field must be at least ` + minValue + ` characters long`+ `</span>`;
        return 1;
      }
      if (validated && minField.length > 0) {
        minField[0].parentNode.removeChild(minField[0]);
        return -1;
      }
      if (validated && minField.length == 0) {
        return 0;
      }
    }
    else{
      return 0;
    }
  }

  function handleMax(field){
    if (field.attributes.maxlength != undefined) {
      var maxValue =field.attributes.maxlength.value;

      let maxField = field.nextSibling.querySelectorAll(".maxlength");
      let validated=field.attributes.maxlength.value > field.value.length;
      if (!validated  && maxField.length > 0) {
        return 1;
      }

    if (!validated && maxField.length == 0) {
        field.nextSibling.innerHTML += `<span class="maxlength">this field must not exceed` + maxValue + ` characters long`+ `</span>`;
        return 1;
      }
      if (validated && maxField.length > 0) {
        maxField[0].parentNode.removeChild(maxField[0]);
        return -1;
      }
      if (validated && maxField.length == 0) {
        return 0;
      }
    }
else return 0;
  }
  function sendContact(form, contactSubmit){
    let xhr = new XMLHttpRequest();
    // reset contactmessage css
    xhr.open('POST', '../scripts/contact.php');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    var f_name = document.getElementById("full_name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var message = document.getElementById("contactMessage").value;
    let submitMessage=document.getElementById("submitMessage");

    xhr.onload = function() {
      if(xhr.status !== 200)
      {
        submitMessage.innerHTML="Failed to send your message. Please try again at a later time ";
        contactSubmit.innerHTML="Failed!"
        submitMessage.classList.add('reqError');         
      }
      else if(response.message === 0){
        var response = JSON.parse(xhr.responseText)
        submitMessage.innerHTML=response.error;
      }
      else{
        submitMessage.classList.remove('reqError');         
        submitMessage.classList.add('success');         
        submitMessage.innerHTML=`Thanks for being awesome! We have received your message and would like to thank you for writing to us, we will reply by email as soon as possible.
        Talk to you soon,"`; 
        contactSubmit.innerHTML="success!"
    
    }

    
    };
    var data = {
      'f_name' : f_name ,
      'email' : email,
      'telephone' :  phone,
      'message': message
      }
      xhr.send(encodeURI(data));
    }
  init();
})();
