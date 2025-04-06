// Global variables for each consumption result (kg/dozen)
let bodyConsumption = 0;
let collarConsumption = 0;
let cuffConsumption = 0;

// Recalculate everything whenever any input changes
const inputs = document.querySelectorAll("input[type='number']");
inputs.forEach(input => {
  input.addEventListener("input", calculateAll);
});

function calculateAll() {
  // 1) Body Consumption
  const bodyLength     = parseFloat(document.getElementById("bodyLength").value)    || 0;
  const sleeveLength   = parseFloat(document.getElementById("sleeveLength").value)  || 0;
  const bodyAllowance  = parseFloat(document.getElementById("bodyAllowance").value) || 0;
  const halfChest      = parseFloat(document.getElementById("halfChest").value)     || 0;
  const chestAllowance = parseFloat(document.getElementById("chestAllowance").value)|| 0;
  const bodyGSM        = parseFloat(document.getElementById("bodyGSM").value)       || 0;

  // Corrected Formula for body (kg/dozen):
  // ( (BodyLength + SleeveLength + Body Sleeve Allowance) * (1/2 Chest Width + Chest Allowance) * 2 * GSM * 12 ) / 10000000
  bodyConsumption = ((bodyLength + sleeveLength + bodyAllowance) *
                     (halfChest + chestAllowance) *
                     2 * bodyGSM * 12) / 10000000;
  document.getElementById("bodyResult").textContent = bodyConsumption.toFixed(6);

  // 2) Collar Consumption
  const collarLength = parseFloat(document.getElementById("collarLength").value) || 0;
  const collarWidth  = parseFloat(document.getElementById("collarWidth").value)  || 0;
  const collarGSM    = parseFloat(document.getElementById("collarGSM").value)    || 0;

  // Formula for collar (kg/dozen):
  // ( Collar Length * Collar Width * 12 * GSM ) / 10000000
  collarConsumption = (collarLength * collarWidth * 12 * collarGSM) / 10000000;
  document.getElementById("collarResult").textContent = collarConsumption.toFixed(6);

  // 3) Cuff Consumption
  const cuffLength = parseFloat(document.getElementById("cuffLength").value) || 0;
  const cuffWidth  = parseFloat(document.getElementById("cuffWidth").value)  || 0;
  const cuffGSM    = parseFloat(document.getElementById("cuffGSM").value)    || 0;

  // Formula for cuff (kg/dozen):
  // ( Cuff Length * Cuff Width * 2 * 12 * GSM ) / 10000000
  cuffConsumption = (cuffLength * cuffWidth * 2 * 12 * cuffGSM) / 10000000;
  document.getElementById("cuffResult").textContent = cuffConsumption.toFixed(6);

  // 4) Final Totals
  const quantity = parseFloat(document.getElementById("quantity").value) || 0;
  const wastage  = parseFloat(document.getElementById("wastage").value)  || 0;

  // Sum of body, collar, and cuff in kg/dozen
  let totalNoWastage = bodyConsumption + collarConsumption + cuffConsumption;

  // Apply wastage percentage
  let totalWithWastage = totalNoWastage * (1 + wastage / 100);

  // Consumption per T-Shirt (kg/pc) = totalWithWastage / 12
  let perTshirt = totalWithWastage / 12;

  // Total consumption for the given quantity (kg)
  let totalConsumption = perTshirt * quantity;

  // Display final results
  document.getElementById("consumptionPerTshirt").textContent  = perTshirt.toFixed(3);
  document.getElementById("consumptionPerDozen").textContent   = totalWithWastage.toFixed(3);
  document.getElementById("totalConsumption").textContent      = totalConsumption.toFixed(3);
}
