function sendMail(e) {
  e.preventDefault()
  var data = {}
  var dataToSend = {}
  if (e.target.id === "contact-company-form") {
    data = {
      name: $("#name-ff").val(),
      company: $("#company-ff").val(),
      email: $("#mail-ff").val(),
      message: $("#message-ff").val(),
      subject: $("#subject-ff").val(),
    }
    dataToSend = {
      subject: `Smart Butler Contact from ${data.name} `,
      body: `name: ${data.name}
  company: ${data.company}
  email: ${data.email}
  subject: ${data.subject}
  message: ${data.message}`,
    }
  } else {
    data = {
      name: $("#name").val(),
      phone: $("#tel").val(),
      email: $("#mail").val(),
      message: $("#message").val(),
    }

    dataToSend = {
      subject: `Smart Butler Contact from ${data.name} `,
      body: `name: ${data.name}
  phone: ${data.phone}
  email: ${data.email}
  message: ${data.message}`,
    }
  }

  $.ajax({
    type: "POST",
    url: "https://jaybee.info/jaybee/website/email",
    dataType: "json",
    crossDomain: "true",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(dataToSend),

    success: function () {

      alert("Thank you!");
      location.reload()
    },
    error: function (e) {
      console.error(e)
    },
  })
}
