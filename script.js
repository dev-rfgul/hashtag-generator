const apiUrl = "https://api.groq.com/openai/v1/chat/completions";
var apiKey = "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 ";

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
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ messages, model: "mixtral-8x7b-32768" }),
    });

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
      "<strong>Keywords:</strong> " + keywords.join(", ");
    document.getElementById("hashtags").innerHTML =
      "<strong>SEO friendly hashtags:</strong> " + hashtags.join(", ");
    document.getElementById("regeneratedText").innerHTML =
      "<strong>Regenerated paragraph:</strong> " + regeneratedText;
  } catch (error) {
    console.error("Error:", error);
  }
}