export default {
  async email(message, env, ctx) {
    const from = message.from;
    const to = message.to;
    const subject = message.headers.get("subject") || "No Subject";
    let textBody = "";
    try { textBody = await message.text(); } catch (e) { textBody = "Error"; }

    const webhookUrl = "https://iqmail.netlify.app/.netlify/functions/receive-email";

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from, to, subject, textBody, receivedAt: new Date().toISOString() })
      });
      console.log("Email forwarded: " + from + " -> " + to);
    } catch (error) {
      console.error("Error: " + error);
    }
  }
};