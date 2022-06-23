// Select your form for submition
let form = document.getElementById("form");
let file;

//LOADER
let isLoading = false; 

// Select your input type file and store it in a variable
let input = document.getElementById('file');
let inputFirstFile = input.files
const submitForm = document.querySelector('input[type="submit"]');

//UPLOAD FILE and send response to a variable
//browse file
const button = document.getElementById("browseFile");
button.onclick = () => input.click();//on click open file selector

// submit file button
const submitBtn= document.getElementById("submit-btn");
submitBtn.onclick = () => submitForm.click();



//submit the form
form.addEventListener("submit", async function (event) {
  isLoading = true;
  console.log(isLoading);
  event.preventDefault();
  //create a formdata object
  console.log("formdata"+" what is uploaded")
  console.log(input.files[0]);
  console.log(file);
  console.log("formdata"+" what has been uploaded")

  let data = new FormData();
  // data.append("file", input.files[0]);
  data.append("file", file);
  console.log(data);

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
      if (result) {progressBar()}

    })
    .catch((error) => {
      console.error("Error:", error);// Handle the error response object
    });
    form.reset()
    isLoading = false;
    console.log(isLoading);

});


//drag and drop
const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector(".dragHeader");


input.addEventListener("change", function(){
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = input.files[0];
  dropArea.classList.add("active");
  console.log(file)
  showFile(); //calling function
});

//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", ()=>{
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

//If user drop File on DropArea
dropArea.addEventListener("drop", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = event.dataTransfer.files[0];
  showFile(); //calling function
});

//file preview
function showFile(){
  let fileType = file.type; //getting selected file type
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
  if(validExtensions.includes(fileType)){ //if user selected file is an image file
    let fileReader = new FileReader(); //creating new FileReader object
    fileReader.onload = ()=>{
      let fileURL = fileReader.result; //passing user file source in fileURL variable
      let imgTag = `<img src="${fileURL}" alt="">`; //creating an img tag and passing user selected file source inside src attribute
      dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
    }
    fileReader.readAsDataURL(file);
    console.log(file); 
    // input =file;
    console.log('hello file'); 
  }else{
    alert("This is not an Image File!");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}

//progressBar
function progressBar(){
 let progressIndicator= document.querySelector(".progressIndicator");
  progressIndicator.style.animation = "progress 6s";
  progressIndicator.style.width = "100%";
  document.querySelector(".close").style.display = "none";
  document.querySelector(".success").style.display = "block";
}