import { roundToTwoDecimalPlaces } from './utils/utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const preventNumberValidInput = () => {
        const inputs = document.querySelectorAll('input[type="number"]');
        const invalidKeys = ['e', 'E', '-', '+'];
        inputs.forEach((input) => {
            input.addEventListener('keydown', (e) => {
                if (invalidKeys.includes(e.key)) {
                    e.preventDefault();
                }
            });
        });
    };

    const preventPasteInvalidInput = () => {
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
    };

    preventNumberValidInput();
    preventPasteInvalidInput();

    const billInput = document.getElementById('bill');
    const billErrorMessage = document.getElementById('billErrorMessage');
    const peopleNumberErrorMessage = document.getElementById('peopleNumberErrorMessage');
    const tipItems = document.querySelectorAll('.tip-select__item');
    const customTipInput = document.getElementById('customTip');
    const numberOfPeopleInput = document.getElementById('numberOfPeople');
    const tipAmount = document.getElementById('tipAmount');
    const totalAmount = document.getElementById('totalAmount');
    const resetButton = document.getElementById('resetButton');

    const removeActiveClassFromTipItems = () => {
        tipItems.forEach((item) => item.classList.remove('active'));
    };

    const addActiveClassToItem = (item) => {
        item.classList.add('active');
    };

    const setTitlesForResults = (tipAmount, totalAmount) => {
        tipAmount.title = `Tip amount: $${tipAmount.innerHTML}`;
        totalAmount.title = `Total amount: $${totalAmount.innerHTML}`;
    };

    const calculateTip = () => {
        const activeTip = document.querySelector('.tip-select__item.active');
        const tipValue = activeTip ? activeTip.dataset.tip : customTipInput.value;

        if (!billInput.value || !numberOfPeopleInput.value || !tipValue) {
            tipAmount.innerHTML = '$0.00';
            totalAmount.innerHTML = '$0.00';
            return;
        }

        const bill = parseFloat(billInput.value);
        const numberOfPeople = parseInt(numberOfPeopleInput.value);
        const tip = parseFloat(tipValue) / 100;

        const tipResult = roundToTwoDecimalPlaces((bill * tip) / numberOfPeople);
        const totalResult = roundToTwoDecimalPlaces((bill + bill * tip) / numberOfPeople);
        tipAmount.innerHTML = `$${tipResult}`;
        totalAmount.innerHTML = `$${totalResult}`;

        setTitlesForResults(tipAmount, totalAmount);
    };

    tipItems.forEach((item) => {
        item.addEventListener('click', () => {
            removeActiveClassFromTipItems();
            addActiveClassToItem(item);
            customTipInput.value = '';
            calculateTip();
        });
    });

    const errorClass = 'tip-form__field--error';
    const handleShowError = (inputElement, errorElement) => {
        if (inputElement.value === '0') {
            errorElement.innerHTML = "Can't be zero";
            inputElement.parentElement.classList.add(errorClass);
        } else if (!inputElement.value) {
            errorElement.innerHTML = "Can't be empty";
            inputElement.parentElement.classList.add(errorClass);
        } else {
            errorElement.innerHTML = '';
            inputElement.parentElement.classList.remove(errorClass);
        }
    };
    billInput.onfocus = () => {
        billInput.select();
    };
    billInput.oninput = () => {
        handleShowError(billInput, billErrorMessage);
        calculateTip();
    };

    numberOfPeopleInput.onfocus = () => {
        numberOfPeopleInput.select();
    };
    numberOfPeopleInput.oninput = () => {
        handleShowError(numberOfPeopleInput, peopleNumberErrorMessage);
        calculateTip();
    };

    customTipInput.onfocus = () => {
        removeActiveClassFromTipItems();
        customTipInput.select();
    };
    customTipInput.oninput = () => {
        if (customTipInput.value) {
            calculateTip();
        }
    };

    resetButton.onclick = () => {
        billInput.value = '';
        customTipInput.value = '';
        numberOfPeopleInput.value = '';
        tipAmount.innerHTML = '$0.00';
        totalAmount.innerHTML = '$0.00';

        billInput.parentElement.classList.remove(errorClass);
        billErrorMessage.innerHTML = '';
        numberOfPeopleInput.parentElement.classList.remove(errorClass);
        peopleNumberErrorMessage.innerHTML = '';
        removeActiveClassFromTipItems();
    };
});
