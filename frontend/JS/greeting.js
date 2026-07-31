document.addEventListener('DOMContentLoaded', () => {
    const greetingTitle = document.getElementById('greeting-title');
    const currentHour = new Date().getHours();
    let greetingText = '';

    // Determine the greeting based on the user's local time
    if (currentHour > 12) {
        greetingText = 'Good Morning!   
        <lord-icon
        src="https://cdn.lordicon.com/qncyoyoi.json"
        trigger="loop"
        delay="3000"
        style="width:15px;height:15px">
    </lord-icon>';
    } else if (currentHour < 18) {
        greetingText = 'Good Afternoon! 🌤️';
    } else {
        greetingText = 'Good Evening! 🌙';
    }

    // Inject the dynamic greeting text into the HTML
    greetingTitle.textContent = greetingText;
});

