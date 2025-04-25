document.addEventListener('DOMContentLoaded', function() {
    // Get references to form elements
    const mortgageForm = document.getElementById('mortgage-form');
    const clearAllButton = document.getElementById('clear-all');
    const mortgageAmount = document.getElementById('mortgage-amount');
    const mortgageTerm = document.getElementById('mortgage-term');
    const interestRate = document.getElementById('interest-rate');
    const repaymentRadio = document.getElementById('repayment');
    const interestOnlyRadio = document.getElementById('interest-only');
    const monthlyRepaymentEl = document.getElementById('monthly-repayment');
    const totalRepaymentEl = document.getElementById('total-repayment');

    // Clear All button functionality
    clearAllButton.addEventListener('click', function() {
        // Reset form inputs to default or empty values
        mortgageAmount.value = '';
        mortgageTerm.value = '';
        interestRate.value = '';
        repaymentRadio.checked = true; // Set default radio option
        
        // Clear results
        monthlyRepaymentEl.textContent = '';
        totalRepaymentEl.textContent = '';
    });

    // Calculate mortgage function
    function calculateMortgage(amount, years, rate, isRepayment) {
        // Convert inputs to numbers and handle potential errors
        amount = parseFloat(amount);
        years = parseFloat(years);
        rate = parseFloat(rate) / 100 / 12; // Monthly interest rate
        const months = years * 12;
        
        let monthlyPayment, totalPayment;
        
        if (isRepayment) {
            // Formula for repayment mortgage: M = P[r(1+r)^n]/[(1+r)^n-1]
            if (rate === 0) {
                // Handle edge case of 0% interest
                monthlyPayment = amount / months;
            } else {
                monthlyPayment = amount * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
            }
            totalPayment = monthlyPayment * months;
        } else {
            // Interest only: just pay the monthly interest
            monthlyPayment = amount * rate;
            totalPayment = (monthlyPayment * months) + amount; // Total interest plus principal
        }
        
        return {
            monthly: monthlyPayment.toFixed(2),
            total: totalPayment.toFixed(2)
        };
    }

    // Handle form submission
    mortgageForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent form submission
        
        const amount = mortgageAmount.value;
        const term = mortgageTerm.value;
        const rate = interestRate.value;
        const isRepayment = repaymentRadio.checked;
        
        // Validate inputs
        if (!amount || !term || !rate) {
            alert('Please fill in all fields');
            return;
        }
        
        // Calculate and display results
        const result = calculateMortgage(amount, term, rate, isRepayment);
        monthlyRepaymentEl.textContent = result.monthly;
        totalRepaymentEl.textContent = result.total;
    });
});