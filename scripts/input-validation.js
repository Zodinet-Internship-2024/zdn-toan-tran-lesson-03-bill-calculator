class InputValidator {
    constructor() {
        if (InputValidator.instance) {
            return InputValidator.instance;
        }

        InputValidator.instance = this;
        return this;
    }

    preventNumberInvalidInput() {
        const inputs = document.querySelectorAll('input[type="number"]');
        const invalidKeys = ['e', 'E', '-', '+'];
        inputs.forEach((input) => {
            input.addEventListener('keydown', (e) => {
                if (invalidKeys.includes(e.key)) {
                    e.preventDefault();
                }
            });
        });
        return this;
    }

    preventPasteInvalidInput() {
        const inputs = document.querySelectorAll('input[type="number"]');
        inputs.forEach((input) => {
            input.addEventListener('paste', (e) => {
                const regex = /^[0-9]*$/;
                const text = e.clipboardData.getData('text');
                if (!regex.test(text)) {
                    e.preventDefault();
                }
            });
        });
        return this;
    }
}

const inputValidator = new InputValidator();
export default inputValidator;
