const apiUrl = "https://api.groq.com/openai/v1/chat/completions";
// var apiKey = "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 ";
var apiKey = "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";

async function generateHashtags() {
  const textInput = document.getElementById("textInput").value;

  const messages = [
    {
      role: "system",
      content:
        "You are a SEO expert who have to generate hashtags  and you have to extract all the relevant keywords from the paragraph and after that you have to generate the SEO friendly hashtags for the paragraph based on the keywords and current trends and at the end regenerate the paragraph using the extracted SEO friendly keywords and  add the hashtags at the end of the paragraph. insert hashtags at the end of the paragaraph",
    },
    {
      role: "user",
      content: textInput,
    },
  ];

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "response-format": "json_object",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ messages, model: "mixtral-8x7b-32768" }),
    });

    console.log(response)
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data["choices"][0].message.content;
    // console.log(content)
    const sections = content.split("\n\n");
    console.log(sections);
    // Extract keywords
    const keywords = sections[0].split(": ")[1].split(", ");
    // Extract hashtags
    const hashtags = sections[1].split(": ")[1].split(", ");
    // Extract regenerated text
    const regeneratedText = sections.slice(2).join("\n\n");

    console.log(regeneratedText);
    // Display the extracted parts
document.getElementById("keywords").innerHTML =
"<strong>Keywords:</strong><br>" +
keywords.join(", ") +
`<br><img onclick="showToast()" src="copy-icon.png" alt="" class="copyIcon">`;
document.getElementById("hashtags").innerHTML =
"<strong>SEO friendly hashtags:</strong><br>" +
hashtags.join(", ") +
`<br><img onclick="showToast()" src="copy-icon.png" alt="" class="copyIcon">`;

document.getElementById("regeneratedText").innerHTML =
"<strong>Regenerated paragraph:</strong><br> " +
regeneratedText +
`<br><img  onclick="showToast()" src="copy-icon.png" alt="" class="copyIcon">`;


const copyIcons = document.getElementsByClassName("copyIcon");


for (let i = 0; i < copyIcons.length; i++) {
copyIcons[i].addEventListener("click", function() {
 
  let textToCopy = this.previousSibling.textContent.trim();
 
  const textarea = document.createElement("textarea");
 
  textarea.value = textToCopy;
 
  document.body.appendChild(textarea);
 
  textarea.select();
 
  document.execCommand("copy");
 
  document.body.removeChild(textarea);
  // alert("Text copied to clipboard!");
  document.body.showToast();
  
});
}


    // Scroll to the contentDiv smoothly
    document
      .querySelector(".contentBox")
      .scrollIntoView({ behavior: "smooth" });
  } catch (error) {
    console.error("Error:", error);
  }
}

function showToast() {
  Toastify({
    text: "Text Copied to Clip Board",
    duration: 9000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)"
    },
    onClick: function(){} // Callback after click
  }).showToast();
}


// document.addEventListener("DOMContentLoaded", function() {
//   showToast();
// });