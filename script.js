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
    function showRegistrationMessage(title, description, errors = []) {
        registrationMessageTitle.textContent = title;
        registrationMessageDescription.textContent = description;
        registrationMessageErrors.replaceChildren(
            ...errors.map((error) => {
                const item = document.createElement('li');
                item.textContent = error;
                return item;
            })
        );
        registrationMessageErrors.hidden = errors.length === 0;
        registrationMessageErrorIcon.hidden = errors.length === 0;
        registrationDialog.showModal();
    }

    function getValidationReason(control) {
        if (control.validity.valueMissing) {
            return control.type === 'checkbox'
                ? 'Debes aceptar los términos para continuar.'
                : 'Este campo es obligatorio; complétalo o selecciona una opción.';
        }

        if (control.validity.typeMismatch && control.type === 'email') {
            return 'Ingresa una dirección de correo electrónico válida.';
        }

        if (control.validity.tooShort) {
            return `Ingresa al menos ${control.minLength} caracteres.`;
        }

        if (control.validity.tooLong) {
            return `Ingresa no más de ${control.maxLength} caracteres.`;
        }

        if (control.validity.patternMismatch) {
            return 'El formato ingresado no es válido.';
        }

        return 'Revisa el valor ingresado en este campo.';
    }

    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!registrationForm.checkValidity()) {
            const errors = Array.from(registrationForm.querySelectorAll(':invalid')).map((control) => {
                const label = control.labels?.[0]?.textContent.replace(/\s+/g, ' ').replace(/\*/g, '').trim();
                return `${label || control.name}: ${getValidationReason(control)}`;
            });

            showRegistrationMessage(
                'Revisa tu información',
                'No se pudo completar el registro. Corrige los siguientes campos:',
                errors
            );
            return;
        }

        showRegistrationMessage(
            'Información validada',
            '¡Gracias! Tus datos se validaron correctamente.'
        );
    });

    registrationMessageClose.addEventListener('click', () => {
        registrationDialog.close();
    });
}
