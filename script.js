let display = document.getElementById("display");
function clearDisplay() {
  display.value = "0";
}
function deleteLast() {
  display.value = display.value.slice(0, -1) || "0";
}
function appendToDisplay(val) {
  if (display.value === "0" || display.value === "Error") display.value = "";
  display.value += val;
}
function insertParen() {
  let v = display.value;
  let open = (v.match(/\(/g) || []).length;
  let close = (v.match(/\)/g) || []).length;
  if (open > close && /[0-9π)]$/.test(v)) display.value += ")";
  else display.value += "(";
}
function insertFunc(f) {
  if (f === "log") appendToDisplay("log(");
  if (f === "√") appendToDisplay("√(");
}
function insertPi() {
  appendToDisplay("π");
}
function factorial(n) {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}
function normalize(expr) {
  return expr
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/π/g, "Math.PI")
    .replace(/log\(/g, "Math.log10(")
    .replace(/√\(/g, "Math.sqrt(")
    .replace(/\^/g, "**")
    .replace(/(\d+(\.\d+)?)%/g, "($1/100)")
    .replace(/(\d+)!/g, "factorial($1)");
}
function calculate() {
  try {
    display.value = eval(normalize(display.value));
  } catch {
    display.value = "Error";
  }
}
