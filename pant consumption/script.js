// Listen for form submission
document.getElementById('consumptionForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    // Get values from the form
    const pantlength     = parseFloat(document.getElementById('pantlength').value)     || 0;
    const waistbandheight   = parseFloat(document.getElementById('waistbandheight').value)   || 0;
    const halfhip      = parseFloat(document.getElementById('halfhip').value)      || 0;
    const allowancelengthandheight  = parseFloat(document.getElementById('allowancelengthandheight').value)  || 0;
    const halfhipallowance = parseFloat(document.getElementById('halfhipallowance').value) || 0;
    const gsm            = parseFloat(document.getElementById('gsm').value)            || 0;
    const wastage        = parseFloat(document.getElementById('wastage').value)        || 0;
    const quantity       = parseFloat(document.getElementById('quantity').value)       || 0;
  
/*
    [(Pant Length + waistband hieght + allowance(both)) * (1/2 hip width +
    Allowance) * 2 * GSM * 12] / 10,000,000 + wastage % (in kg)

*/
  
    // Base calculation per dozen
    const basePerDozen = (
      (pantlength + waistbandheight + allowancelengthandheight) *
      (halfhip + halfhipallowance) *
      2 *
      gsm *
      12
    ) / 10000000;
  
// Include wastage
const finalPerDozen = basePerDozen * (1 + wastage / 100);

// Consumption per T-Shirt
const perPant = finalPerDozen / 12;

// Total consumption for the entire quantity
const totalConsumption = perPant * quantity;

// Proper rounding function to 3 decimal places
function roundTo3(num) {
  return Math.round(num * 1000) / 1000;
}

// Format values to 3 decimal places for display
const formattedPerPant = roundTo3(perPant).toFixed(3);
const formattedPerDozen = roundTo3(finalPerDozen).toFixed(3);
const formattedTotalConsumption = roundTo3(totalConsumption).toFixed(3);

// Update the UI with the formatted values
document.getElementById('perPant').textContent = formattedPerPant;
document.getElementById('perDozen').textContent = formattedPerDozen;
document.getElementById('totalConsumption').textContent = formattedTotalConsumption;
});