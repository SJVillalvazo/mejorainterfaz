const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePasswordBtn');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');

if (passwordInput && togglePasswordBtn && strengthBar && strengthText) {
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePasswordBtn.classList.toggle('text-[#552882]');
    });

    passwordInput.addEventListener('input', () => {
        const val = passwordInput.value;
        let score = 0;

        if (!val) {
            strengthBar.style.width = '0%';
            strengthBar.className = 'h-full bg-gray-300 transition-all duration-300 w-0';
            strengthText.textContent = 'Introduce contraseña';
            strengthText.className = 'font-semibold text-gray-400';
            return;
        }

        if (val.length >= 8) score++;
        if (/[A-Z]/.test(val)) score++;
        if (/[0-9]/.test(val)) score++;
        if (/[^A-Za-z0-9]/.test(val)) score++;

        switch (score) {
            case 1:
                strengthBar.style.width = '25%';
                strengthBar.className = 'h-full bg-red-500 transition-all duration-300';
                strengthText.textContent = 'Débil';
                strengthText.className = 'font-semibold text-red-500';
                break;
            case 2:
                strengthBar.style.width = '50%';
                strengthBar.className = 'h-full bg-orange-400 transition-all duration-300';
                strengthText.textContent = 'Media';
                strengthText.className = 'font-semibold text-orange-500';
                break;
            case 3:
                strengthBar.style.width = '75%';
                strengthBar.className = 'h-full bg-yellow-400 transition-all duration-300';
                strengthText.textContent = 'Buena';
                strengthText.className = 'font-semibold text-yellow-600';
                break;
            case 4:
                strengthBar.style.width = '100%';
                strengthBar.className = 'h-full bg-emerald-500 transition-all duration-300';
                strengthText.textContent = 'Muy Segura';
                strengthText.className = 'font-semibold text-emerald-600';
                break;
            default:
                strengthBar.style.width = '15%';
                strengthBar.className = 'h-full bg-red-400 transition-all duration-300';
                strengthText.textContent = 'Muy Débil';
                strengthText.className = 'font-semibold text-red-400';
        }
    });
}

const email = document.getElementById('email');
const emailConfirm = document.getElementById('emailConfirm');
const emailMatchIcon = document.getElementById('emailMatchIcon');
const emailMatchMessage = document.getElementById('emailMatchMessage');

if (email && emailConfirm && emailMatchIcon && emailMatchMessage) {
    function checkEmails() {
        if (!emailConfirm.value) {
            emailMatchIcon.classList.add('hidden');
            emailMatchMessage.textContent = 'Asegúrate de que ambos correos coincidan.';
            emailMatchMessage.className = 'text-xs text-gray-400 mt-1';
            return;
        }

        if (email.value === emailConfirm.value && email.value !== '') {
            emailMatchIcon.classList.remove('hidden');
            emailMatchMessage.textContent = '✓ Los correos electrónicos coinciden.';
            emailMatchMessage.className = 'text-xs text-emerald-600 font-medium mt-1';
        } else {
            emailMatchIcon.classList.add('hidden');
            emailMatchMessage.textContent = '✕ Los correos electrónicos no coinciden todavía.';
            emailMatchMessage.className = 'text-xs text-red-500 font-medium mt-1';
        }
    }

    email.addEventListener('input', checkEmails);
    emailConfirm.addEventListener('input', checkEmails);
}

const registrationForm = document.getElementById('quick-registration-form');
const registrationDialog = document.getElementById('registrationMessageDialog');
const registrationMessageErrorIcon = document.getElementById('registrationMessageErrorIcon');
const registrationMessageTitle = document.getElementById('registrationMessageTitle');
const registrationMessageDescription = document.getElementById('registrationMessageDescription');
const registrationMessageErrors = document.getElementById('registrationMessageErrors');
const registrationMessageClose = document.getElementById('registrationMessageClose');

if (
    registrationForm instanceof HTMLFormElement &&
    registrationDialog instanceof HTMLDialogElement &&
    registrationMessageErrorIcon &&
    registrationMessageTitle &&
    registrationMessageDescription &&
    registrationMessageErrors &&
    registrationMessageClose
) {
    // Clases CSS de Tailwind para marcar campos válidos o erróneos
    const ERROR_CLASSES = ['!border-red-500', '!bg-red-50', '!ring-2', '!ring-red-200'];

    function markControlInvalid(control) {
        control.classList.add(...ERROR_CLASSES);
    }

    function clearControlInvalid(control) {
        control.classList.remove(...ERROR_CLASSES);
    }

    function showRegistrationMessage(title, description, errors = []) {
    registrationMessageTitle.textContent = title;
    registrationMessageDescription.textContent = description;

    // Seleccionamos el contenedor del icono para cambiar su estilo e icono interno
    const isError = errors.length > 0;

    if (isError) {
        // Icono de error (Signo de admiración rojo)
        registrationMessageErrorIcon.innerHTML = `
            <svg class="w-12 h-12 text-red-500 mx-auto" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>[cite: 3]
        `;
        registrationMessageErrorIcon.classList.remove('hidden');

        // Renderizar la lista de errores
        registrationMessageErrors.replaceChildren(
            ...errors.map((error) => {
                const item = document.createElement('li');
                item.textContent = error;
                return item;
            })
        );
        registrationMessageErrors.classList.remove('hidden');
    } else {
        // Icono de éxito (Check verde)
        registrationMessageErrorIcon.innerHTML = `
            <svg class="w-12 h-12 text-emerald-500 mx-auto" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
        `;
        registrationMessageErrorIcon.classList.remove('hidden');

        // Ocultar lista de errores
        registrationMessageErrors.replaceChildren();
        registrationMessageErrors.classList.add('hidden');
    }

    registrationDialog.showModal();
}
    // Mensajes de error claros, directos y resumidos
    function getValidationReason(control) {
        if (control.validity.valueMissing) {
            return control.type === 'checkbox'
                ? 'Campo requerido'
                : 'Obligatorio';
        }

        if (control.validity.typeMismatch && control.type === 'email') {
            return 'Correo no válido';
        }

        if (control.validity.tooShort) {
            return `Mínimo ${control.minLength} caracteres`;
        }

        if (control.validity.tooLong) {
            return `Máximo ${control.maxLength} caracteres`;
        }

        if (control.validity.patternMismatch) {
            return 'Formato incorrecto';
        }

        return 'Revisar campo';
    }

    // Listener para limpiar el borde rojo dinámicamente cuando el usuario corrija o escriba
    registrationForm.querySelectorAll('input, select, textarea').forEach((control) => {
        const handleValidation = () => {
            if (control.checkValidity()) {
                clearControlInvalid(control);
            }
        };
        control.addEventListener('input', handleValidation);
        control.addEventListener('change', handleValidation);
    });

    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Limpiar errores visuales anteriores
        registrationForm.querySelectorAll('input, select, textarea').forEach(clearControlInvalid);

        if (!registrationForm.checkValidity()) {
            const invalidControls = Array.from(registrationForm.querySelectorAll(':invalid'));

            const errors = invalidControls.map((control) => {
                // Destacar en rojo el input erróneo
                markControlInvalid(control);

                const label = control.labels?.[0]?.textContent.replace(/\s+/g, ' ').replace(/\*/g, '').trim();
                return `${label || control.name}: ${getValidationReason(control)}`;
            });

            showRegistrationMessage(
                'Datos incompletos',
                'Por favor corrige los siguientes campos señalados en rojo:',
                errors
            );
            return;
        }

        showRegistrationMessage(
            '¡Registro exitoso!',
            'Tus datos han sido validados correctamente.'
        );
    });

    registrationMessageClose.addEventListener('click', () => {
        registrationDialog.close();
    });
}