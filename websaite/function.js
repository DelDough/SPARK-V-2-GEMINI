// Import Gemini API at the top of function.js
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("YOUR_API_KEY");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

function myFunction() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
}

// Add this to restore dark mode preference on page load
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
    loadResults();
});

async function submit() {
    const input = document.getElementById('inputid');
    const submitBtn = document.querySelector('.submit-btn');
    const alertDiv = document.getElementById('alert');
    
    if (!input.value.trim()) {
        alert("Please enter a question");
        return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Thinking...';
    alertDiv.textContent = "Processing your question...";
    
    try {
        // Get response from Gemini
        const result = await model.generateContent(input.value);
        const response = await result.response.text();
        
        // Store data before redirect
        localStorage.setItem('userQuestion', input.value);
        localStorage.setItem('sparkResponse', response);
        
        // Redirect to results page
        window.location.href = 'results.html';
    } catch (error) {
        alertDiv.textContent = "Error: " + error.message;
        submitBtn.disabled = false;
        submitBtn.textContent = 'Ask SPARK';
    }
}

// Add this function to load results
function loadResults() {
    if (window.location.pathname.includes('results.html')) {
        const questionEl = document.getElementById('userQuestion');
        const responseEl = document.getElementById('sparkResponse');
        
        questionEl.textContent = localStorage.getItem('userQuestion');
        responseEl.textContent = localStorage.getItem('sparkResponse');
    }
}

async function generateStudyMaterial() {
    const input = document.getElementById('inputid');
    
    if (!input.value.trim()) {
        alert("Please enter a topic for the study guide");
        return;
    }
    
    // Store question for results page
    localStorage.setItem('userQuestion', `Generate study guide: ${input.value}`);
    
    try {
        const prompt = `Create a comprehensive study guide about: ${input.value}. Include key points, definitions, and examples.`;
        const result = await model.generateContent(prompt);
        const content = result.response.text();
        
        // Store response and redirect
        localStorage.setItem('sparkResponse', content);
        window.location.href = 'results.html';
    } catch (error) {
        alert("Error generating study guide: " + error.message);
    }
}

export { myFunction, submit, generateStudyMaterial, loadResults };