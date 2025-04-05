// Listen for form submission
document.getElementById('consumptionForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Get values from the form
  const bodyLength     = parseFloat(document.getElementById('bodyLength').value)     || 0;
  const sleeveLength   = parseFloat(document.getElementById('sleeveLength').value)   || 0;
  const halfChest      = parseFloat(document.getElementById('halfChest').value)      || 0;
  const allowanceBody  = parseFloat(document.getElementById('allowanceBody').value)  || 0;
  const allowanceChest = parseFloat(document.getElementById('allowanceChest').value) || 0;
  const gsm            = parseFloat(document.getElementById('gsm').value)            || 0;
  const wastage        = parseFloat(document.getElementById('wastage').value)        || 0;
  const quantity       = parseFloat(document.getElementById('quantity').value)       || 0;

  /*
    Updated Formula for T-Shirt Fabric Consumption (per dozen):

    Per Dozen (kg) = 
      [(bodyLength + sleeveLength + allowanceBody) *
       (halfChest + allowanceChest) *
       2 *
       gsm *
       12] / 10000000
       multiplied by (1 + wastage/100)
    
    Consumption per T-Shirt = finalPerDozen / 12
    Total Consumption = Consumption per T-Shirt * Total Quantity
  */

  // Base calculation per dozen
  const basePerDozen = (
    (bodyLength + sleeveLength + allowanceBody) *
    (halfChest + allowanceChest) *
    2 *
    gsm *
    12
  ) / 10000000;

  // Include wastage
  const finalPerDozen = basePerDozen * (1 + wastage / 100);

  // Consumption per T-Shirt
  const perTshirt = finalPerDozen / 12;

  // Total consumption for the entire quantity
  const totalConsumption = perTshirt * quantity;

  // Round up each value to two decimals
  const roundedPerTshirt = (Math.ceil(perTshirt * 100) / 100).toFixed(2);
  const roundedPerDozen = (Math.ceil(finalPerDozen * 100) / 100).toFixed(2);
  const roundedTotalConsumption = (Math.ceil(totalConsumption * 100) / 100).toFixed(2);

  // Update the UI with the rounded values
  document.getElementById('perTshirt').textContent       = roundedPerTshirt;
  document.getElementById('perDozen').textContent        = roundedPerDozen;
  document.getElementById('totalConsumption').textContent = roundedTotalConsumption;
});
