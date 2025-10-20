// === Универсальная проверка для всех .phone_block ===
document.querySelectorAll('.phone_block').forEach(block => {
    const input = block.querySelector('input');
    const button = block.querySelector('button');
    const result = block.querySelector('.checker');

    // Определяем страну по placeholder
    const isKyrgyz = input.placeholder.includes('+996');
    const isRussian = input.placeholder.includes('+7');

    const kyrgyzRegExp = /^\+996\s[2579]\d{2}\s\d{2}-\d{2}-\d{2}$/;
    const russianRegExp = /^\+7\s[9]\d{2}\s\d{3}-\d{2}-\d{2}$/;

    // === Маска ввода ===
    input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        let formatted = '';

        if (isKyrgyz) {
            if (value.length > 12) value = value.slice(0, 12);
            if (value.startsWith('996')) value = value.slice(3);
            if (!value) value = '5';

            formatted = '+996 ';
            if (value.length > 0) {
                const first = ['2','5','7','9'].includes(value[0]) ? value[0] : '5';
                formatted += first;
            }
            if (value.length >= 2) formatted += value.slice(1, 3);
            if (value.length >= 4) formatted += ' ' + value.slice(3, 5);
            if (value.length >= 6) formatted += '-' + value.slice(5, 7);
            if (value.length >= 8) formatted += '-' + value.slice(7, 9);
        }

        if (isRussian) {
            if (value.length > 11) value = value.slice(0, 11);
            if (value.startsWith('7')) value = value.slice(1);
            if (value.startsWith('8')) value = '9' + value.slice(1);
            if (!value.startsWith('9') && value.length > 0) value = '9' + value.slice(0, 9);

            formatted = '+7 ';
            if (value.length > 0) formatted += value.slice(0, 3);
            if (value.length >= 4) formatted += ' ' + value.slice(3, 6);
            if (value.length >= 7) formatted += '-' + value.slice(6, 8);
            if (value.length >= 9) formatted += '-' + value.slice(8, 10);
        }

        e.target.value = formatted;
    });

    // === Авто +996 / +7 при фокусе ===
    input.addEventListener('focus', () => {
        if (!input.value) {
            input.value = isKyrgyz ? '+996 ' : '+7 ';
        }
    });

    // === Проверка ===
    button.addEventListener('click', () => {
        const value = input.value.trim();
        const valid = (isKyrgyz && kyrgyzRegExp.test(value)) || (isRussian && russianRegExp.test(value));
        const country = isKyrgyz ? 'Кыргызстан' : 'Россия';

        if (valid) {
            result.textContent = `${country}: верный`;
            result.style.color = 'green';
            input.style.borderColor = 'green';
        } else {
            result.textContent = `${country}: неверный`;
            result.style.color = 'red';
            input.style.borderColor = 'red';
        }
    });

    // === Enter ===
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            button.click();
        }
    });
});