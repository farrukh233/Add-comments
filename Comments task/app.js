const commentForm = document.getElementById("comment-form");
const commentsList = document.getElementById("comments");

// Add comment
commentForm.addEventListener("submit", event => {
  event.preventDefault();

  // Get form input values
  const nameInput = document.getElementById("name");
  const textInput = document.getElementById("text");
  const dateInput = document.getElementById("date");

  // Validate input
  let isValid = true;
  if (!nameInput.value.trim()) {
    nameInput.classList.add("invalid");
    isValid = false;
  } else {
    nameInput.classList.remove("invalid");
  }
  if (!textInput.value.trim()) {
    textInput.classList.add("invalid");
    isValid = false;
  } else {
    textInput.classList.remove("invalid");
  }

  if (!isValid) {
    return;
  }

  // Create new comment
  const newComment = document.createElement("div");
  newComment.classList.add("comment");

  const commentHeader = document.createElement("div");
  commentHeader.classList.add("comment-header");

  const commentName = document.createElement("span");
  commentName.classList.add("comment-name");
  commentName.textContent = nameInput.value;

  const commentDate = document.createElement("span");
  commentDate.classList.add("comment-date");
  const date = dateInput.value ? new Date(dateInput.value) : new Date();
  const dateString = getDateDisplayString(date);
  commentDate.textContent = dateString;

  const commentText = document.createElement("div");
  commentText.classList.add("comment-text");
  commentText.textContent = textInput.value;

  const commentActions = document.createElement("div");
  commentActions.classList.add("comment-actions");

  const commentLike = document.createElement("button");
  commentLike.textContent = "❤️";
  commentLike.classList.add("comment-like");
  const likeIcon = document.createElement("i");
  likeIcon.classList.add("fa", "fa-heart");
  commentLike.appendChild(likeIcon);

  const commentDelete = document.createElement("button");
  commentDelete.textContent = "❌";
  commentDelete.classList.add("comment-delete");
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa", "fa-trash");
  commentDelete.appendChild(deleteIcon);

  commentHeader.appendChild(commentName);
  commentHeader.appendChild(commentDate);
  commentActions.appendChild(commentLike);
  commentActions.appendChild(commentDelete);

  newComment.appendChild(commentHeader);
  newComment.appendChild(commentText);
  newComment.appendChild(commentActions);

  commentsList.appendChild(newComment);

  // Clear form inputs
  nameInput.value = "";
  textInput.value = "";
  dateInput.value = "";
});

// Delete comment
const comments = document.getElementById("comments");
comments.addEventListener("click", event => {
  if (event.target.classList.contains("comment-delete")) {
    const comment = event.target.closest(".comment");
    comments.removeChild(comment);
  }
});

// Like comment
comments.addEventListener("click", event => {
  if (event.target.classList.contains("comment-like")) {
    const likeIcon = event.target.querySelector("i");
    likeIcon.classList.toggle("liked");
  }
});

function getDateDisplayString(date) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const isToday = date.toDateString() === today.toDateString();
  const isYesterday = date.toDateString() === yesterday.toDateString();

  let dateString = "";
  if (isToday) {
  } else if (isYesterday) {
  } else {
    dateString = date.toLocaleDateString();
  }

  let timeString = "";
  if (!isToday && !isYesterday) {
    timeString = date.toLocaleTimeString();
  } else {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    timeString = `${hours}:${minutes}`;
  }

  return `${dateString}, ${timeString}`;
}
