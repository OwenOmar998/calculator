import { defineStore } from "pinia";

export const useCalcResult = defineStore("calcResult", {
  state: () => ({
    orientation: window.orientation === 0 ? "portrait" : "landscape",
    currentValue: "0" as string,
    previousValue: "" as string,
    operation: null as string | null,
    shouldReset: false,
    rad: false,
    temp: "" as string,
    tempOp: "" as string,
    nd: false,

    result: "0" as string,
  }),
  actions: {
    toggleRad() {
      this.rad = !this.rad;
    },
    handleSingleOp(op: string) {
      switch (op) {
        case "sq":
          this.currentValue = ((+this.currentValue) ** 2).toString();
          this.updateDisplay();
          break;
        case "cu":
          this.currentValue = ((+this.currentValue) ** 3).toString();
          this.updateDisplay();
          break;
        case "ex":
          this.currentValue = (Math.E ** +this.currentValue).toString();
          this.updateDisplay();
          break;
        case "10ex":
          this.currentValue = (10 ** +this.currentValue).toString();
          this.updateDisplay();
          break;
        case "2ex":
          this.currentValue = (2 ** +this.currentValue).toString();
          this.updateDisplay();
          break;
        case "rev":
          this.currentValue = (1 / +this.currentValue).toString();
          this.updateDisplay();
          break;
        case "root2":
          this.currentValue = ((+this.currentValue) ** 0.5).toString();
          this.updateDisplay();
          break;
        case "root3":
          this.currentValue = ((+this.currentValue) ** (1 / 3)).toString();
          this.updateDisplay();
          break;
        case "ln":
          this.currentValue = Math.log(+this.currentValue).toString();
          this.updateDisplay();
          break;
        case "log":
          this.currentValue = Math.log10(+this.currentValue).toString();
          this.updateDisplay();
          break;
        case "log2":
          this.currentValue = Math.log2(+this.currentValue).toString();
          this.updateDisplay();
          break;
        case "fac":
          this.currentValue =
            +this.currentValue > 0
              ? this.factorial(+this.currentValue)
              : this.currentValue;
          this.updateDisplay();
          break;
        case "rand":
          this.currentValue = ((+this.currentValue * Math.PI) / 180).toString();
          this.updateDisplay();
          break;
        case "sin":
          if (this.nd) {
            this.currentValue = this.rad
              ? (this.currentValue = Math.asin(+this.currentValue).toString())
              : (this.currentValue = (
                  (Math.asin(+this.currentValue) * 180) /
                  Math.PI
                ).toString());
          } else {
            this.currentValue = this.rad
              ? (this.currentValue = Math.sin(+this.currentValue).toString())
              : (this.currentValue = Math.sin(
                  (+this.currentValue * Math.PI) / 180
                ).toString());
          }

          this.updateDisplay();
          break;
        case "cos":
          if (this.nd) {
            this.currentValue = this.rad
              ? (this.currentValue = Math.acos(+this.currentValue).toString())
              : (this.currentValue = (
                  (Math.acos(+this.currentValue) * 180) /
                  Math.PI
                ).toString());
          } else {
            this.currentValue = this.rad
              ? (this.currentValue = Math.cos(+this.currentValue).toString())
              : (this.currentValue = Math.cos(
                  (+this.currentValue * Math.PI) / 180
                ).toString());
          }

          this.updateDisplay();
          break;
        case "tan":
          if (this.nd) {
            this.currentValue = this.rad
              ? (this.currentValue = Math.atan(+this.currentValue).toString())
              : (this.currentValue = (
                  (Math.atan(+this.currentValue) * 180) /
                  Math.PI
                ).toString());
          } else {
            this.currentValue = this.rad
              ? (this.currentValue = Math.tan(+this.currentValue).toString())
              : (this.currentValue = Math.tan(
                  (+this.currentValue * Math.PI) / 180
                ).toString());
          }

          this.updateDisplay();
          break;
        case "sinh":
          if (this.nd) {
            this.currentValue = Math.asinh(+this.currentValue).toString();
            this.updateDisplay();
          } else {
            this.currentValue = Math.sinh(+this.currentValue).toString();
            this.updateDisplay();
          }
          break;
        case "cosh":
          if (this.nd) {
            this.currentValue = Math.acosh(+this.currentValue).toString();
            this.updateDisplay();
          } else {
            this.currentValue = Math.cosh(+this.currentValue).toString();
            this.updateDisplay();
          }
          break;
        case "tanh":
          if (this.nd) {
            this.currentValue = Math.atanh(+this.currentValue).toString();
            this.updateDisplay();
          } else {
            this.currentValue = Math.tanh(+this.currentValue).toString();
            this.updateDisplay();
          }
          break;
      }
    },

    handleDoubleOp(op: string) {
      this.temp = this.result;
      this.currentValue = "";
      this.tempOp = op;
    },
    factorial(n: number) {
      let f = 1;
      for (let i = n; i > 1; i--) f *= i;
      return f.toString();
    },
    updateDisplay() {
      this.result = this.currentValue;

      if (this.orientation === "portrait") {
        if (this.result.length < 10) return;
        this.result = (+this.result).toExponential().toString();
        this.currentValue = this.result;
        const a = this.result.substring(0, this.result.indexOf("e"));
        const b = this.result.substring(this.result.indexOf("e"));
        this.result = a.substring(0, 9 - b.length) + b;
      } else {
        if (this.result.length < 16) return;
        this.result = (+this.result).toExponential().toString();
        this.currentValue = this.result;
        const a = this.result.substring(0, this.result.indexOf("e"));
        const b = this.result.substring(this.result.indexOf("e"));
        this.result = a.substring(0, 15 - b.length) + b;
      }
    },

    handleNumberClick(n: string) {
      if (this.shouldReset) {
        this.previousValue = this.currentValue;
        this.currentValue = "0";
        this.shouldReset = false;
      }
      if (this.currentValue === "0") {
        if (this.currentValue.length === 9 && this.orientation === "portrait")
          return;
        else if (
          this.currentValue.length === 15 &&
          this.orientation !== "portrait"
        )
          return;
        n === "." ? (this.currentValue = "0" + n) : (this.currentValue = n);
      } else if (this.currentValue.includes(".")) {
        if (this.currentValue.length === 9 && this.orientation === "portrait")
          return;
        else if (
          this.currentValue.length === 15 &&
          this.orientation !== "portrait"
        )
          return;
        if (n === ".") return;
        else {
          this.currentValue += n;
        }
      } else {
        if (this.currentValue.length === 9 && this.orientation === "portrait")
          return;
        else if (
          this.currentValue.length === 15 &&
          this.orientation !== "portrait"
        )
          return;
        this.currentValue += n;
      }
      this.updateDisplay();
    },

    handleOperatorClick(op: string) {
      if (this.temp) {
        switch (this.tempOp) {
          case "exp":
            this.currentValue = ((+this.temp) ** +this.currentValue).toString();
            break;
          case "root":
            this.currentValue = (
              (+this.temp) **
              (1 / +this.currentValue)
            ).toString();
            break;
          case "EE":
            this.currentValue = (
              +this.temp *
              10 ** +this.currentValue
            ).toString();
            break;
          case "logy":
            this.currentValue = (
              Math.log(+this.temp) / Math.log(+this.currentValue)
            ).toString();
            this.updateDisplay();
            break;
        }
        this.temp = "";
        this.tempOp = "";
        this.updateDisplay();
        return;
      }
      if (op === "AC") {
        this.currentValue = "0";
        this.previousValue = "";
        this.operation = null;
        this.updateDisplay();
        return;
      }

      if (this.currentValue === "" || this.shouldReset) {
        this.operation = op;
        return;
      }

      if (this.operation && this.currentValue !== "") {
        this.calculate();
      }

      this.previousValue = this.currentValue;
      this.currentValue = "";
      this.operation = op;
    },
    handleEqualClick() {
      if (this.temp) {
        switch (this.tempOp) {
          case "exp":
            this.currentValue = ((+this.temp) ** +this.currentValue).toString();
            break;
          case "root":
            this.currentValue = (
              (+this.temp) **
              (1 / +this.currentValue)
            ).toString();
            break;
          case "EE":
            this.currentValue = (
              +this.temp *
              10 ** +this.currentValue
            ).toString();
            break;
        }
        this.temp = "";
        this.tempOp = "";
        this.updateDisplay();
        return;
      }
      this.shouldReset = true;
      let res = 0;

      if (this.operation === "+") res = +this.previousValue + +this.result;
      else if (this.operation === "-") res = +this.previousValue - +this.result;
      else if (this.operation === "*") {
        res = +this.previousValue * +this.result;
      } else if (this.operation === "÷")
        res = +this.previousValue / +this.result;

      this.currentValue = res.toString();
      this.updateDisplay();
    },
    toggle2nd() {
      this.nd = !this.nd;
    },

    calculate() {
      let res = 0;

      if (this.operation === "+")
        res = +this.previousValue + +this.currentValue;
      else if (this.operation === "-")
        res = +this.previousValue - +this.currentValue;
      else if (this.operation === "*") {
        res = +this.previousValue * +this.currentValue;
      } else if (this.operation === "÷")
        res = +this.previousValue / +this.currentValue;

      this.currentValue = res.toString();
      this.updateDisplay();
      this.previousValue = "";
      this.operation = null;
    },

    handleSignClick() {
      const cur = parseFloat(this.currentValue);
      this.currentValue = (cur * -1).toString();
      this.updateDisplay();
    },

    handlePercentClick() {
      const cur = parseFloat(this.currentValue);
      this.currentValue = (cur / 100).toString();
      this.updateDisplay();
    },
    detectOrientation() {
      this.orientation = window.orientation === 0 ? "portrait" : "landscape";
    },
  },
});
