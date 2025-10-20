// === Проверка Gmail ===
const gmailInput = document.getElementById('gmail_input');
const gmailButton = document.getElementById('gmail_button');
const gmailResult = document.getElementById('gmail_result');

const gmailRegExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

if (gmailButton) {
    gmailButton.addEventListener('click', () => {
        const value = gmailInput.value.trim();
        if (gmailRegExp.test(value)) {
            gmailResult.textContent = 'Почта верна';
            gmailResult.style.color = 'green';
            gmailInput.style.borderColor = 'green';
        } else {
            gmailResult.textContent = 'Почта не верна';
            gmailResult.style.color = 'red';
            gmailInput.style.borderColor = 'red';
        }
    });

    gmailInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') gmailButton.click();
    });
}

// === Проверка ИИН (Казахстан) ===
console.log('ИИН: скрипт запущен'); // ДОЛЖНО ПОЯВИТЬСЯ В КОНСОЛИ

const iinInput = document.getElementById('iin_input');
const iinButton = document.getElementById('iin_button');
const iinResult = document.getElementById('iin_result');

if (!iinInput || !iinButton || !iinResult) {
    console.error('ОШИБКА: Не найдены элементы ИИН!', { iinInput, iinButton, iinResult });
} else {
    console.log('ИИН: элементы найдены');
}

function validateIIN(iin) {
    const cleanIIN = iin.replace(/\D/g, '');
    if (cleanIIN.length !== 12) {
        console.log('ИИН: длина не 12 цифр');
        return false;
    }

    const digits = cleanIIN.split('').map(Number);
    const weights1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    let sum = 0;
    for (let i = 0; i < 11; i++) {
        sum += digits[i] * weights1[i];
    }
    let control = sum % 11;

    if (control === 10) {
        const weights2 = [3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 2];
        sum = 0;
        for (let i = 0; i < 11; i++) {
            sum += digits[i] * weights2[i];
        }
        control = sum % 11;
        if (control === 10) control = 0;
    }

    const isValid = control === digits[11];
    console.log('ИИН проверка:', cleanIIN, '→', isValid ? 'ВАЛИДЕН' : 'НЕВАЛИДЕН', 'Контроль:', control, 'Последняя цифра:', digits[11]);
    return isValid;
}

// Автоматическая проверка
iinInput.addEventListener('input', () => {
    const value = iinInput.value.trim();
    const cleanValue = value.replace(/\D/g, '');

    if (cleanValue.length === 12) {
        if (validateIIN(cleanValue)) {
            iinResult.textContent = 'ИИН валиден';
            iinResult.style.color = 'green';
            iinInput.style.borderColor = 'green';
        } else {
            iinResult.textContent = 'ИИН невалиден';
            iinResult.style.color = 'red';
            iinInput.style.borderColor = 'red';
        }
    } else {
        iinResult.textContent = '';
        iinInput.style.borderColor = '';
    }
});

// Проверка по кнопке
if (iinButton) {
    iinButton.addEventListener('click', () => {
        console.log('Кнопка ИИН нажата');
        iinInput.dispatchEvent(new Event('input'));
    });
}

// Маска ввода
iinInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 12);
});