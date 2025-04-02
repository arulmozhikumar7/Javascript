fetch('env.json')
    .then(response => response.json())
    .then(env => {
    const apiKey = env.API_KEY;
                const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
                
    document.getElementById('searchBtn').addEventListener('click', () => {
        const city = document.getElementById('cityInput').value.trim();
            if (city === '') {
                alert('Please enter a city name');
                return;
            }
                    
            fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => {
            if (!response.ok) {
            throw new Error('City not found');                        }
            return response.json();
                        })
            .then(data => {
                document.getElementById('cityName').textContent = `Weather in ${data.name}`;
                document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
                document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
                document.getElementById('condition').textContent = `Condition: ${data.weather[0].description}`;
                })
            .catch(error => {
                alert(error.message);
                });
                });
            })
            .catch(error => console.error('Error loading environment variables:', error));