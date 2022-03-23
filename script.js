var userInput = document.getElementById("text");

userInput.oninput = function () {
  countWords(userInput.value);
  textAreaResize();
  syncStorage(userInput.value);
};
window.onload = function () {
  chrome.storage.local.get("words", function (item) {
    if (item.words === undefined) {
      userInput.value = "";
    } else {
      userInput.value = item.words;
    }
    countWords(userInput.value);
    textAreaResize();
  });
};

function countWords(userWords) {
  var length = userWords.length;
  var lengthNoSpace = userWords.replace(/\s/g, "").length;
  document.getElementById("include").innerText = `공백 포함 ${length} 자`;
  document.getElementById(
    "exclude"
  ).innerText = `공백 제외 ${lengthNoSpace} 자`;
}

function textAreaResize() {
  var textArea = document.getElementById("text");
  textArea.style.height = "auto";
  textArea.style.height = `${textArea.scrollHeight}px`;
}

function syncStorage(userInput) {
  chrome.storage.local.set({ words: userInput });
}
