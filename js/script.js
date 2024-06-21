document.addEventListener('DOMContentLoaded', function() {
    fetch('https://api.github.com/users/hy2oning/repos')
        .then(response => response.json())
        .then(data => {
            const languages = {};
            const languagePromises = data.map(repo => {
                return fetch(repo.languages_url)
                    .then(response => response.json())
                    .then(repoLanguages => {
                        for (const [language, bytes] of Object.entries(repoLanguages)) {
                            if (languages[language]) {
                                languages[language] += bytes;
                            } else {
                                languages[language] = bytes;
                            }
                        }
                    });
            });

            Promise.all(languagePromises).then(() => {
                const sortedLanguages = Object.entries(languages).sort((a, b) => b[1] - a[1]);
                const languageList = document.getElementById('github-languages');
                sortedLanguages.forEach(([language, bytes]) => {
                    const listItem = document.createElement('p');
                    listItem.textContent = `${language}: ${bytes} bytes`;
                    languageList.appendChild(listItem);
                });
            });
        })
        .catch(error => console.error('Error fetching GitHub data:', error));
});

document.getElementById('video-link').addEventListener('click', function(event) {
    event.preventDefault(); // 기본 링크 동작 방지
    document.getElementById('video-player').style.display = 'block'; // 동영상 플레이어 보이기
    document.getElementById('video-player').play(); // 동영상 재생
});
