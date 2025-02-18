import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyD0LVIthyXuQpepTWt2eOhPxGTKAS6ET2g");

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash",
            systemInstruction: ""
 });

const prompt = "write a haiku about art and society";

const result = await model.generateContent(prompt);
console.log(result.response.text());


function myFunction() {
    var element = document.body;
    element.classList.toggle("darkmode");
  }

function submit() {
  var x = document.getElementById('inputid').value;
  console.log(x)
}