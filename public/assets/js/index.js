$(".sectionForm .addbtn").on("click", function () {
  var todo = $(this).siblings(".todo").val().trim(); // get value of todo field
  console.log(todo);
  // if no todo item is specified, throw alert message and break out
  if (!todo) {
      alert("Add your todo item to continue.");
      return false;
  }

  var section = $(this).closest(".sectionForm").attr("id"); // get id of "form"
  console.log(section);
  var routePart = section.substring(0, section.length - 4);
  var body = {
      todo,
      createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      updatedAt: moment().format("YYYY-MM-DD HH:mm:ss")
  };
  $.ajax({
      method: "POST",
      url: `/api/${routePart}`,
      data: body
  }).then(function (response) {
      location.reload();
  });
});

$(".sectionForm:not(#journalsForm) .deleteItem").on("click", function () {
  var id = $(this).attr("id");
  var section = $(this).closest(".sectionForm").attr("id");
  var routePart = section.substring(0, section.length - 4); //IS THIS PART NECESSARY IN ALL OF THESE WITH ONLY ONE TODO LIST

  $.ajax({
      method: "DELETE",
      url: `/api/${routePart}/${id}`
  }).then(function (response) {
      location.reload();
  });
});

$(".sectionForm li").on("click", function () {
    var id = $(this).attr("id"); // id of todo to toggle
  var status = $(this).hasClass("completed"); // completed: true or false
  var section = $(this).closest(".sectionForm").attr("id"); // get id of "form"
  var routePart = section.substring(0, section.length - 4); //IS THIS PART NECESSARY IN ALL OF THESE WITH ONLY ONE TODO LIST
console.log("id", id);
  console.log("section", section);
console.log("routePart", routePart);

  $.ajax({
      method: "PUT",
      url: `/api/${routePart}/${id}`,
      data: { completed: !status }
  }).then(function (response) {
    // console.log("response", response);

      location.reload();
  });
});

//TRACKER STUFF
$(".trackerForm .addbtn").on("click", function () {
    var id = $(this).attr("id");
    var tracker = $(this).siblings(".tracker").val().trim();
    var status = $(this).hasClass("on");
    if (!tracker) {
        alert("Add your tracker item to continue.");
        return false;
    }
  
    var section = $(this).closest(".trackerForm").attr("id"); // get id of "form"
    console.log(section);
    var routePart = section.substring(0, section.length - 4);
    var body = {
        itemTitle: tracker,
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD HH:mm:ss")
    };
    $.ajax({
        method: "POST",
        url: `/api/${routePart}`,
        data: {on: !status}
    }).then(function (response) {
        location.reload();
    });
    $.ajax({
        method: "POST",
        url: `/api/${routePart}`,
        data: body
    }).then(function (response) {
        location.reload();
    });
  });
$(".trackerForm .deleteTracker").on("click", function () {
  var id = $(this).attr("id");
  console.log("DELETE ITEM", id);
  var section = $(this).closest(".trackerForm").attr("id");
  var routePart = section.substring(0, section.length - 4);

  $.ajax({
      method: "DELETE",
      url: `/api/${routePart}/${id}`
  }).then(function (response) {
      location.reload();
  });
});

//JOURNAL STUFF
$(".journalForm .addbtn").on("click", function () {
  var journal = $(this).siblings(".journal").val().trim(); // get value of todo field
  // if no journal item is specified, throw alert message and break out
  if (!journal) {
      alert("You must write something!");
      return false;
  }

  var section = $(this).closest(".journalForm").attr("id"); // get id of "form"
  console.log(section);
  var routePart = section.substring(0, section.length - 4); // get either 'todays', 'weeks', or 'months' depending
  var body = {
      body: journal,
      createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      updatedAt: moment().format("YYYY-MM-DD HH:mm:ss")
  };

  $.ajax({
      method: "POST",
      url: `/api/${routePart}`,
      data: body
  }).then(function (response) {
      location.reload();
  });
});

$(".journalForm .deleteJournal").on("click", function () {
  var id = $(this).attr("id");
  console.log("DLETE ITEM", id);
  var section = $(this).closest(".journalForm").attr("id");
  var routePart = section.substring(0, section.length - 4);

  $.ajax({
      method: "DELETE",
      url: `/api/${routePart}/${id}`
  }).then(function (response) {
      location.reload();
  });
});

var allTitles = $(".journal-title");
console.log("all titles:", allTitles);

for (var i = 0; i < allTitles.length; i++){
    var titleText = $(allTitles[i]).text().split(" ").splice(0, 4).join(" "); //IS THIS PART NECESSARY IN ALL OF THESE WITH ONLY ONE TODO LIST
    console.log("title text", titleText);
    $(allTitles[i]).text(titleText);
}

// Click events
$(function () {
  $("#loginButton").on("click", function () {
      window.location.replace("http://localhost:8000/login");
  });
  $("#signupButton").on("click", function () {
      window.location.replace("http://localhost:8000/signup");
  });
  $("#startButton").on("click", function () {
      window.location.replace("http://localhost:8000/signup");
  });
  $("#goToUserPage").on("click", function () {
      window.location.replace("http://localhost:8000/members");
  });
});
