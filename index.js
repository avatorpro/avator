function sendMail(e) {
  e.preventDefault()
  var data = {}

  if (e.target.id === "contact-company-form") {
    data = {
      name: $("#name-ff").val(),
      company: $("#company-ff").val(),
      email: $("#mail-ff").val(),
      message: $("#message-ff").val(),
      subject: $("#subject-ff").val(),
    }
  } else {
    data = {
      name: $("#name").val(),
      phone: $("#tel").val(),
      email: $("#mail").val(),
      message: $("#message").val(),
    }
  }

  var formData = {
    access_key: "eb3c901d-0f27-4a01-a79d-5192523df288",
    subject: "Avator - הודעה חדשה מ" + data.name,
    from_name: "Avator Website",
    name: data.name,
    email: data.email,
    phone: data.phone || "",
    company: data.company || "",
    message: data.message || "",
  }

  $.ajax({
    type: "POST",
    url: "https://api.web3forms.com/submit",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(formData),

    success: function () {
      alert("!תודה רבה! ההודעה נשלחה בהצלחה");
      location.reload()
    },
    error: function (e) {
      console.error(e)
      alert("שגיאה בשליחה, נסו שוב מאוחר יותר")
    },
  })
}
