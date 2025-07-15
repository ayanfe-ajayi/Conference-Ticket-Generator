const avatarUploadContainer = document.getElementById(
  "avatar-upload-container"
);
const avatarUpload = document.getElementById("avatar-upload");
const avatarUploadInfo = document.getElementById("avatar-upload-info");
const emailError = document.getElementById("email-error");
const avatarPreview = document.getElementById("preview");

let avatarPictureCorrect = false;

/* emailError.innerHTML = `<img src="images/icon-info.svg" alt="info icon" />
            <span>Upload your photo (JPG or PNG, max size: 500px).</span>`;

    avatarUploadError.innerHTML = `<img src="images/icon-info.svg" alt="info icon" />
            <span>Upload your photo (JPG or PNG, max size: 500px).</span>
            `;
    avatarUploadError.className = "info error";
*/

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
    avatarPictureCorrect = false;
  }

   else if (file) {
    console.log(file);
    const reader = new FileReader();
    reader.onload = (e) => {
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
    `
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

/* 
avatarUpload.addEventListener("drag", (e) => {
    const file = e.dataTransfer.files;
    if (file) {
        avatarUpload.files = file;
    }
})
    */

const removeImage = () => {
    avatarUpload.value = '';
    avatarPreview.innerHTML = "";
    avatarPreview.style.display = "none";
    avatarUploadContainer.style.display = "flex";
}
