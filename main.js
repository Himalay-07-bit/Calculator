
let output = "";

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".digit");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;
        const lastChar = output[output.length - 1];

        if (value === "C") {
            output = output.slice(0, -1);
        } else if (value === "AC") {
            output = "";
        } else if (value === "=") {
            try {
                output = eval(output).toString();
            } catch {
                output = "Error";
            }
        } else if (["+", "-", "*", "/", "%", "."].includes(value)) {
            if (output === "" || !/\d|\)/.test(lastChar)) {
                return; // Do not allow operators if empty or last is not digit
            }
            output += value;
        } else {
            output += value; // allow digits and 00
        }

        display.textContent = output || "0";
        display.scrollLeft = display.scrollWidth; // auto-scroll
    });
});


document.addEventListener("keydown", (e) => {
    const key = e.key;
    const lastChar = output[output.length - 1];

    // Block function keys and alphabets
    if (
        (e.keyCode >= 112 && e.keyCode <= 123) || // F1-F12
        /^[a-zA-Z]$/.test(key)
    ) {
        e.preventDefault();
        return;
    }

    if (/[0-9]/.test(key)) {
        output += key;
    } else if (["+", "-", "*", "/", "%", "."].includes(key)) {
        if (output === "" || !/\d|\)/.test(lastChar)) {
            return; // don't allow operator at start or after another operator
        }
        output += key;
    } else if (key === "Enter") {
        try {
            output = eval(output).toString();
        } catch {
            output = "Error";
        }
    } else if (key === "Backspace") {
        output = output.slice(0, -1);
    } else if (key === "Delete") {
        output = "";
    } else {
        return;
    }

    display.textContent = output || "0";
    display.scrollLeft = display.scrollWidth;
});
