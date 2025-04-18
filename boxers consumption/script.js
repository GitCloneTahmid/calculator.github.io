document.getElementById('consumptionForm').addEventListener('submit', function(e) {
    e.preventDefault();


  // Get values from the form
  const boxerlength     = parseFloat(document.getElementById('boxerlength').value)     || 0;
  const waistbandheight   = parseFloat(document.getElementById('waistbandheight').value)   || 0;
  const allowancelengthandheight      = parseFloat(document.getElementById('allowancelengthandheight').value)      || 0;
  const halfhip = parseFloat(document.getElementById('halfhip').value) || 0;
  const halfhipallowance = parseFloat(document.getElementById('halfhipallowance').value) || 0;
  const gsm            = parseFloat(document.getElementById('gsm').value)            || 0;
  const wastage        = parseFloat(document.getElementById('wastage').value)        || 0;
  const quantity       = parseFloat(document.getElementById('quantity').value)       || 0;



  /* FORMULA FOR BOXERS (PER DOZEN):
  per dozen(kg)
  [(bodylength + waistband casing heihgt + Allowance)]
  * (1/2 HIP widht + Allowance) * 2 * GSM * 12] / 10,000,000
  + wastage %
 */ 

/* calculation per dozen */

const basePerDozen = (
    (boxerlength + waistbandheight + allowancelengthandheight) *
    (halfhip + halfhipallowance) * 2 * gsm * 12) / 10000000;

//Include wastage

const finalPerDozen = basePerDozen * (1 + wastage / 100);

//Consumption per t-shirt

const perBoxers = finalPerDozen / 12;

//TOTAL for quantity

const totalConsumption = perBoxers * quantity;

//Format to 3 decimals places

const formattedPerBoxers = perBoxers.toFixed(3);
const formattedPerDozen = finalPerDozen.toFixed(3);
const formattedTotalConsumption = totalConsumption.toFixed(3);


//update UI with the formations of decimal values

document.getElementById('perBoxers').textContent = formattedPerBoxers;
document.getElementById('perDozen').textContent = formattedPerDozen;
document.getElementById('totalConsumption').textContent = formattedTotalConsumption;


});




