const ticketForm = document.getElementById("ticket-form");
const avatarUploadContainer = document.getElementById(
  "avatar-upload-container"
);
const avatarPreview = document.getElementById("preview");
const avatarUpload = document.getElementById("avatar-upload");
const avatarUploadInfo = document.getElementById("avatar-upload-info");
const emailError = document.getElementById("email-error");
const nameError = document.getElementById("name-error");

const emailInput = document.getElementById("email-address");

const fullNameInput = document.getElementById("full-name");

let uploadedImage = null;
let avatarPictureCorrect = false;

/* 

    avatarUploadError.innerHTML = `<img src="images/icon-info.svg" alt="info icon" />
            <span>Upload your photo (JPG or PNG, max size: 500px).</span>
            `;
    avatarUploadError.className = "info error";
*/
fullNameInput.addEventListener("input", () => {
  nameError.style.display = "none";
});

emailInput.addEventListener("input", () => {
  emailError.style.display = "none";
});

avatarUpload.addEventListener("change", function () {
  const file = this.files[0];
  const maxSize = 500 * 1024;

  if (file && file.size > maxSize) {
    avatarUploadInfo.innerHTML = `
        <img src="images/icon-info.svg" alt="info icon" />
        <span>File too large.Please upload a photo under 500kb.</span>
        `;
    avatarUploadInfo.className = "info error";
    avatarUploadContainer.style.borderColor = "hsl(7, 71%, 60%)";
    avatarPreview.style.display = "none";
    avatarUploadContainer.style.display = "flex";
    avatarPictureCorrect = false;
  } else if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedImage = e.target.result;
      avatarUploadContainer.style.display = "none";
      avatarPreview.style.display = "flex";
      avatarPreview.innerHTML = `
    <img 
    src="${e.target.result}"
    class="preview-image"
    alt="preview picture"
    />
    <div class="preview-button-container">
    <button type="button" class="remove-btn" onclick="removeImage()">Remove image</button>
    <label for="avatar-upload" class="change-btn">Change image</label>
    </div>
    `;
      avatarUploadInfo.innerHTML = `
    <img src="images/icon-info.svg" alt="info icon" />
    <span>Upload your photo (JPG or PNG, max size: 500px).</span>
    </div>`;
      avatarUploadInfo.className = "avatar-upload-info info";
      avatarUploadContainer.style.borderColor = "hsl(252, 6%, 83%)";
    };
    avatarPictureCorrect = true;

    reader.readAsDataURL(file);
  }
});

ticketForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const fullName = document.getElementById("full-name").value;
  const email = document.getElementById("email-address").value;
  const gitHubUsername = document
    .getElementById("github-username")
    .value.trim();

  if (!avatarPictureCorrect) {
    displayError(avatarUploadInfo);
  }

  if (!isValidFullName(fullName)) {
    displayError(nameError);
  }

  if (!isValidEmail(email)) {
    displayError(emailError);
  } else {
    const ticket = {
      image: uploadedImage,
      "full name": fullName,
      email: email,
      "github username": gitHubUsername,
    };
    console.log(ticket);
  }
});

/* 
avatarUpload.addEventListener("drag", (e) => {
    const file = e.dataTransfer.files;
    if (file) {
        avatarUpload.files = file;
    }
})
    */

const isValidFullName = (name) => {
  const fullNameRegex = /^[A-Za-z]+(?:\s+)[A-Za-z]+$/;
  return fullNameRegex.test(name.trim());
};

const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

const removeImage = () => {
  avatarUpload.value = "";
  avatarPreview.innerHTML = "";
  avatarPreview.style.display = "none";
  avatarUploadContainer.style.display = "flex";
};

const displayError = (element) => {
  element.style.display = "flex";

  if (element === emailError) {
    element.innerHTML = `<img src="images/icon-info.svg" alt="info icon" />
    <span>Please enter a valid email address.</span>`;
    emailInput.style.borderColor = "hsl(7, 71%, 60%)";
  }

  if (element === nameError) {
    element.innerHTML = `<img src="images/icon-info.svg" alt="info icon" />
    <span>Please enter your full name.</span>`;
    fullNameInput.style.borderColor = "hsl(7, 71%, 60%)";
  }

  if (element === avatarUploadInfo) {
    element.innerHTML = `
        <img src="images/icon-info.svg" alt="info icon" />
        <span>Please upload a photo under 500kb.</span>
        `;
    element.className = "info error";
    avatarUploadContainer.style.borderColor = "hsl(7, 71%, 60%)";
  }
};
