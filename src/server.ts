import "dotenv/config";
import app from "./app";

const PORT = Number(process.env.PORT) || 5000;

console.log("BREVO:", process.env.BREVO_API_KEY ? "Loaded ✅" : "Not Loaded ❌");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});