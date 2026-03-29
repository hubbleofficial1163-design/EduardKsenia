document.addEventListener('DOMContentLoaded', function() {
    // Анимация печатающегося текста - ЗАЦИКЛЕННАЯ
    const textElement = document.getElementById('typing-text');
    const cursor = document.getElementById('cursor');
    const fullText = "Эдуард + Ксения = ";
    const heartSpan = "<span class='heart'>❤</span>";
    let charIndex = 0;
    let isTyping = true;
    let isDeleting = false;
    let loopTimeout;
    
    function typeWriter() {
        if (isTyping) {
            if (charIndex < fullText.length) {
                textElement.innerHTML = fullText.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(typeWriter, 150);
            } else {
                // После завершения печати текста, добавляем сердечко
                textElement.innerHTML = fullText + heartSpan;
                // Делаем сердечко видимым
                const heart = textElement.querySelector('.heart');
                if (heart) {
                    heart.style.opacity = '1';
                }
                // Оставляем курсор
                cursor.style.animation = 'none';
                cursor.style.opacity = '0.5';
                
                // Ждем 3 секунды и начинаем стирать
                loopTimeout = setTimeout(() => {
                    isTyping = false;
                    isDeleting = true;
                    const heart = textElement.querySelector('.heart');
                    if (heart) {
                        heart.style.opacity = '0';
                    }
                    deleteText();
                }, 3000);
            }
        }
    }
    
    function deleteText() {
        if (isDeleting) {
            if (charIndex > 0) {
                textElement.innerHTML = fullText.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(deleteText, 80);
            } else {
                isDeleting = false;
                // Ждем немного и начинаем заново
                loopTimeout = setTimeout(() => {
                    isTyping = true;
                    cursor.style.animation = 'blink 1s infinite';
                    cursor.style.opacity = '1';
                    typeWriter();
                }, 1000);
            }
        }
    }
    
    // Запускаем анимацию через секунду после загрузки
    setTimeout(typeWriter, 800);
    
    // Музыкальный плеер
    const playButton = document.getElementById('playButton');
    const audio = document.getElementById('weddingMusic');
    const playIcon = playButton.querySelector('i');
    
    playButton.addEventListener('click', function() {
        if (audio.paused) {
            audio.play()
                .then(() => {
                    playIcon.className = 'fas fa-pause';
                    playButton.style.background = '#888888';
                })
                .catch(error => {
                    console.log("Автовоспроизведение заблокировано: ", error);
                    alert("Пожалуйста, разрешите воспроизведение музыки в вашем браузере.");
                });
        } else {
            audio.pause();
            playIcon.className = 'fas fa-play';
            playButton.style.background = '#666666';
        }
    });
    
    // Обновляем иконку при окончании воспроизведения
    audio.addEventListener('ended', function() {
        playIcon.className = 'fas fa-play';
        playButton.style.background = '#666666';
    });
    
    // Таймер обратного отсчета до 22.08.2026
    function updateCountdown() {
        const weddingDate = new Date('2026-06-06T15:00:00').getTime();
        const now = new Date().getTime();
        const timeLeft = weddingDate - now;
        
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days;
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            document.getElementById('countdown').innerHTML = '<div style="font-size: 20px; color: #8B0000; font-weight: bold; padding: 20px;">Свадьба состоялась! Спасибо, что были с нами!</div>';
        }
    }
    
    // Обновляем таймер каждую секунду
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Генерация календаря на июнь 2026
    function generateCalendar() {
        const calendarContainer = document.getElementById('calendarContainer');
        const weddingDate = new Date(2026, 5, 6); // Июнь 2026 (месяцы 0-11)
        const today = new Date();
        
        // Названия дней недели
        const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        
        // Названия месяцев
        const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
                           'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        
        // Получаем первый день месяца и количество дней в месяце
        const firstDayOfMonth = new Date(weddingDate.getFullYear(), weddingDate.getMonth(), 1);
        const lastDayOfMonth = new Date(weddingDate.getFullYear(), weddingDate.getMonth() + 1, 0);
        const totalDays = lastDayOfMonth.getDate();
        
        // Определяем день недели первого дня (0-6, где 0 - воскресенье, 1 - понедельник)
        let firstDayIndex = firstDayOfMonth.getDay();
        // Преобразуем к нашему формату (понедельник = 0)
        firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
        
        let calendarHTML = `<div class="calendar-grid">`;
        
        // Добавляем дни недели
        for (let i = 0; i < 7; i++) {
            calendarHTML += `<div class="calendar-day">${daysOfWeek[i]}</div>`;
        }
        
        // Добавляем пустые ячейки для дней предыдущего месяца
        for (let i = 0; i < firstDayIndex; i++) {
            calendarHTML += `<div class="calendar-date-cell empty"></div>`;
        }
        
        // Добавляем дни текущего месяца
        for (let day = 1; day <= totalDays; day++) {
            let cellClass = 'calendar-date-cell';
            const currentDate = new Date(weddingDate.getFullYear(), weddingDate.getMonth(), day);
            
            // Проверяем, является ли это день свадьбы
            if (day === 6) {
                cellClass += ' wedding-day';
            }
            // Проверяем, является ли это сегодняшний день (только если в том же месяце и году)
            else if (today.getFullYear() === currentDate.getFullYear() && 
                    today.getMonth() === currentDate.getMonth() && 
                    today.getDate() === day) {
                cellClass += ' current-day';
            }
            
            calendarHTML += `<div class="${cellClass}">${day}</div>`;
        }
        
        calendarHTML += `</div>`;
        // Месяц и год внизу в черном цвете
        calendarHTML += `<div class="calendar-month-label">${monthNames[weddingDate.getMonth()]} ${weddingDate.getFullYear()}</div>`;
        
        calendarContainer.innerHTML = calendarHTML;
    }
    
    // Генерируем календарь
    generateCalendar();
    
    // ========== ФУНКЦИЯ ДЛЯ ПРЕОБРАЗОВАНИЯ АЛКОГОЛЯ ==========
    function getAlcoholText(alcoholValues) {
        if (!alcoholValues || alcoholValues.length === 0) return 'Не выбрано';
        
        const alcoholMap = {
            'sparkling': 'Игристое',
            'white_wine': 'Белое вино',
            'red_wine': 'Красное вино',
            'konyak': 'Коньяк',
            'vodka': 'Водка',
            'no_alcohol': 'Не буду пить алкоголь'
        };
        
        const selected = alcoholValues.map(val => alcoholMap[val] || val);
        
        // Если выбран "Не буду пить алкоголь" и другие напитки, показываем только "Не буду пить алкоголь"
        if (alcoholValues.includes('no_alcohol')) {
            return 'Не буду пить алкоголь';
        }
        
        return selected.join(', ');
    }
    
    // ========== ФУНКЦИЯ ДЛЯ ПОКАЗА УВЕДОМЛЕНИЙ ==========
    function showNotification(message, type) {
        // Создаем элемент уведомления
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            font-family: 'Raleway', sans-serif;
            font-size: 16px;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            text-align: center;
            max-width: 90%;
            white-space: pre-line;
        `;
        
        document.body.appendChild(notification);
        
        // Удаляем через 5 секунд
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.5s';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 5000);
    }
    
    // Обработка формы с отправкой в Google Sheets
    const guestForm = document.getElementById('guestForm');
    
    guestForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Проверяем заполнение обязательных полей
        const fio = this.querySelector('[name="fio"]').value.trim();
        const phone = this.querySelector('[name="phone"]').value.trim();
        const attendance = this.querySelector('[name="attendance"]:checked');
        
        if (!fio || !phone || !attendance) {
            showNotification('Пожалуйста, заполните все обязательные поля!', 'error');
            return;
        }
        
        // Показываем сообщение о отправке
        const submitButton = this.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Отправка...';
        submitButton.disabled = true;
        
        // Собираем данные формы
        const formData = new FormData(guestForm);
        
        // Получаем ФИО
        const name = formData.get('fio') || '';
        
        // Получаем телефон
        let phone_number = formData.get('phone') || '';
        
        // Экранируем телефон, если начинается со спецсимволов
        if (phone_number.match(/^[=+\-@]/)) {
            phone_number = "'" + phone_number;
        }
        
        // Получаем ответ о присутствии
        const attendance_value = formData.get('attendance') || '';
        let attendanceText = '';
        if (attendance_value === 'yes') attendanceText = 'С удовольствием приду';
        else if (attendance_value === 'no') attendanceText = 'К сожалению, не смогу присутствовать';
        else if (attendance_value === 'later') attendanceText = 'Сообщу позже';
        else attendanceText = attendance_value;
        
        // Собираем выбранные напитки и преобразуем в русские названия
        const alcoholValues = formData.getAll('alcohol');
        const alcoholText = getAlcoholText(alcoholValues);
        
        // Получаем комментарии
        const comments = formData.get('comments') || '';
        
        // !!! ВАЖНО: Замените этот URL на ваш собственный из развернутого веб-приложения Google Apps Script !!!
        const scriptURL = 'https://script.google.com/macros/s/AKfycbxamzccgsx6cGU2Pv8N-FuwU4cOv0y1rEo-R94ydmdCOqTz_B2TMEDzrFinpDI2oId7yQ/exec   ';
        
        try {
            // Создаем FormData для отправки
            const formBody = new URLSearchParams();
            formBody.append('name', name);
            formBody.append('phone', phone_number);
            formBody.append('attendance', attendanceText);
            formBody.append('alcohol', alcoholText);
            formBody.append('comments', comments);
            
            // Отправляем данные
            const response = await fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formBody
            });
            
            showNotification('Спасибо! Ваш ответ отправлен. Мы с нетерпением ждем вас на свадьбе! ❤️', 'success');
            guestForm.reset();
            
        } catch (error) {
            console.error('Ошибка при отправке:', error);
            showNotification('Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону.', 'error');
        } finally {
            // Возвращаем кнопку в исходное состояние
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
    
    // Плавная прокрутка при клике на ссылки
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Функция для скролла к основному контенту
function scrollToContent() {
    const content = document.querySelector('.content');
    window.scrollTo({
        top: content.offsetTop - 60,
        behavior: 'smooth'
    });
}
