function myFunction() {
    document.body.classList.toggle('dark-mode');
    // Save preference to localStorage
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
}

// Add this to restore dark mode preference on page load
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
});

async function submit() {
    const input = document.getElementById('inputid');
    const submitBtn = document.querySelector('.submit-btn');
    const alertDiv = document.getElementById('alert');
    
    if (!input.value.trim()) {
        alertDiv.textContent = "Please enter a question";
        return;
    }
    
    // Disable input and button while processing
    input.disabled = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Thinking...';
    alertDiv.textContent = "Processing your question...";
    
    try {
        const response = await fetch('YOUR_API_ENDPOINT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: input.value })
        });
        
        const data = await response.json();
        alertDiv.textContent = data.response;
    } catch (error) {
        alertDiv.textContent = "An error occurred. Please try again.";
    } finally {
        // Re-enable input and button
        input.disabled = false;
        submitBtn.disabled = false;
        submitBtn.textContent = 'Ask SPARK';
        input.focus();
    }
}

async function generateStudyMaterial() {
    const input = document.getElementById('inputid').value;
    const alertDiv = document.getElementById('alert');
    
    try {
        const prompt = `Create a comprehensive study guide about: ${input}. Include key points, definitions, and examples.`;
        const result = await model.generateContent(prompt);
        const content = result.response.text();
        
        // Create downloadable file
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `study_guide_${input.slice(0,30)}.txt`;
        a.click();
        window.URL.revokeObjectURL(url);
        
        alertDiv.textContent = "Study guide generated and downloaded!";
    } catch (error) {
        alertDiv.textContent = "Error generating study guide: " + error.message;
    }
}

export { myFunction, submit, generateStudyMaterial };