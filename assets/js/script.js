// Select your form for submition
form = document.getElementById("form");

//LOADER
let isLoading = false; 

// Select your input type file and store it in a variable
let input = document.querySelector('input[type="file"]');

//UPLOAD FILE and send response to a variable

//submit the form
form.addEventListener("submit", async function (event) {
  isLoading = true;
  console.log(isLoading);
  event.preventDefault();
  //create a formdata object
  let data = new FormData();
  data.append("file", input.files[0]);

  await fetch("https://file.io", { // Your POST endpoint
    method: "POST", // or 'PUT'
    headers: {
        /*One needs to omit content-type header for the Fetch request. 
        Then the browser will automatically add the Content type header including the Form Boundary which looks like:
         "Content-Type": 'multipart/form-data; boundary=—-WebKitFormBoundaryfgtsKTYLsT7PNUVD',*/
    },
    body: data,// This is your file object
  })
    .then((response) => response.json())// if the response is a JSON object
    .then((result) => {
      console.log("Success:", result); // Handle the success response object
    })
    .catch((error) => {
      console.error("Error:", error);// Handle the error response object
    });
    form.reset()
    isLoading = false;
    console.log(isLoading);

});
// submit(input)
// async function submit(req, res, next) {
//   try {
//     const formData = new FormData();
//     formData.append("file", req.files[0]);

//     const options = {
//       method: "POST",
//       headers: {
//         "Content-Type": "multipart/form-data",

//         },
//         body: formData,
//       }

//      await fetch("https://file.io", {options})
//       .then((result) => {
//         console.log("Success:", result); // Handle the success response object
//         })
//      .catch((error) => {
//       console.error("Error:", error);// Handle the error response object
//       res.status(500).send(error);
//     });

//     return next();
//   } catch (error) {
//     console.error("Error:", error);// Handle the error response object
//     res.status(500).send(error);
//   }
// };
