document.addEventListener("DOMContentLoaded", function() {
    fetchScores();
    setInterval(fetchScores, 1000 * 60 * 5);
});

function fetchScores() {
    fetch('https://tuboquest.alexishenry.eu/api/scoreboard')
        .then(response => response.json())
        .then(data => {
            const scoreList = document.getElementById('scoreList');
            console.log(scoreList);
            scoreList.innerHTML = '';

            data.forEach(scoreEntry => {
                const listItem = document.createElement('li');
                listItem.textContent = `${scoreEntry.name}: ${scoreEntry.score}`;
                scoreList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching scores:', error);
        });
}
