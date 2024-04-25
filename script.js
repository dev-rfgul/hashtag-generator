// function displayHashtags(hashtags) {
//   const hashtagsDiv = document.getElementById("hashtags");
//   hashtagsDiv.innerHTML = "<h2>Generated Hashtags</h2>";
//   const ul = document.createElement("ul");

//   hashtags.forEach((hashtag) => {
//     const li = document.createElement("li");
//     li.textContent = hashtag;
//     ul.appendChild(li);
//   });

//   hashtagsDiv.appendChild(ul);
// }




const apiUrl = "https://api.groq.com/openai/v1/chat/completions";
const apiKey = "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";

async function generateHashtags() {
  const textInput = document.getElementById("textInput").value;
  alert(textInput);

  const messages = [
    {
      role: "system",
      content:
        "You are a SEO expert who have to generate hashtags  and you have to extract all the relevant keywords from the paragraph and after that you have to generate the SEO friendly hashtags for the paragraph based on the keywords and current trends and at the end regenerate the paragraph using the extracted SEO friendly keywords and  add the hashtags at the end of the paragraph.",
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
        Authorization: `Bearer ${apiKey}`, 
      },
      body: JSON.stringify({ messages , "model": "mixtral-8x7b-32768"}),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Response from Groq AI:", data);
    // Handle the response data here
  } catch (error) {
    console.error("Error:", error);
  }
}


function displayHashtags(hashtags) {
  const hashtagsDiv = document.getElementById("hashtags");
  hashtagsDiv.innerHTML = "<h2>Generated Hashtags</h2>";
  const ul = document.createElement("ul");

  hashtags.forEach((hashtag) => {
    const li = document.createElement("li");
    li.textContent = hashtag;
    ul.appendChild(li);
  });

  hashtagsDiv.appendChild(ul);
}
















// Keywords: Tic Tac Toe, multiplayer, HTML, CSS, JavaScript, mobile-responsive, game, friends, family, mobile device, computer.

// SEO friendly hashtags: #TicTacToe #Multiplayer #HTML #CSS #JavaScript #MobileResponsive #Game #Friends #Family #MobileDevice #Computer

// Regenerated paragraph:

// Introducing my latest creation: a multiplayer Tic Tac Toe game! This game is built entirely with HTML, CSS, and JavaScript, making it fully functional and mobile-responsive. Challenge your friends to a game anytime, anywhere - all they need is a mobile device or computer. I'm thrilled to share this project with you all. Give it a try and let me know what changes can be made in the code as well as the game. #TicTacToe #Multiplayer #HTML #CSS #JavaScript #MobileResponsive #Game #Friends #Family #MobileDevice #Computer