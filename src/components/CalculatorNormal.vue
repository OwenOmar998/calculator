<template>
  <div id="calculator">
    <div class="top-container">
      <div
        class="value"
        :class="[
          calcResult.result.length <= 5 ? 'ff5' : '',
          calcResult.result.length === 6 ? 'ff6' : '',
          calcResult.result.length === 7 ? 'ff7' : '',
          calcResult.result.length === 8 ? 'ff8' : '',
          calcResult.result.length === 9 ? 'ff9' : '',
        ]"
      >
        {{ calcResult.result }}
      </div>
    </div>

    <div class="buttons-container">
      <div
        class="button function"
        @click="calcResult.handleOperatorClick('AC')"
      >
        AC
      </div>
      <div class="button function" @click="calcResult.handleSignClick">±</div>
      <div class="button function" @click="calcResult.handlePercentClick">
        %
      </div>
      <div
        class="button operator"
        :class="{ cur: calcResult.operation === '÷' }"
        @click="calcResult.handleOperatorClick('÷')"
      >
        ÷
      </div>
      <div class="button" @click="calcResult.handleNumberClick('7')">7</div>
      <div class="button" @click="calcResult.handleNumberClick('8')">8</div>
      <div class="button" @click="calcResult.handleNumberClick('9')">9</div>
      <div
        class="button operator"
        :class="{ cur: calcResult.operation === '*' }"
        @click="calcResult.handleOperatorClick('*')"
      >
        ×
      </div>
      <div class="button" @click="calcResult.handleNumberClick('4')">4</div>
      <div class="button" @click="calcResult.handleNumberClick('5')">5</div>
      <div class="button" @click="calcResult.handleNumberClick('6')">6</div>
      <div
        class="button operator"
        :class="{ cur: calcResult.operation === '-' }"
        @click="calcResult.handleOperatorClick('-')"
      >
        −
      </div>
      <div class="button" @click="calcResult.handleNumberClick('1')">1</div>
      <div class="button" @click="calcResult.handleNumberClick('2')">2</div>
      <div class="button" @click="calcResult.handleNumberClick('3')">3</div>
      <div
        class="button operator"
        :class="{ cur: calcResult.operation === '+' }"
        @click="calcResult.handleOperatorClick('+')"
      >
        +
      </div>
      <div class="button number-0" @click="calcResult.handleNumberClick('0')">
        0
      </div>
      <div class="button" @click="calcResult.handleNumberClick('.')">.</div>
      <div class="button operator" @click="calcResult.handleEqualClick()">
        =
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useCalcResult } from "../../stores/CalcResult";
export default {
  setup() {
    const calcResult = useCalcResult();
    window.addEventListener("orientationchange", calcResult.detectOrientation);

    return { calcResult };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  user-select: none;
}

body {
  font-family: "Helvetica Neue", sans-serif;
  margin: 25px;
}

#calculator {
  background: black;
  border-radius: 50px;
  color: white;
  height: 844px;
  position: relative;
  width: 390;
  padding: 15px;
}

.top-container {
  height: 250px;
  display: flex;
}

.value {
  font-weight: 300;
  max-width: 360;
  text-align: right;
  align-self: flex-end;
  justify-content: flex-end;
}
.ff5 {
  font-size: 120px;
}
.ff6 {
  font-size: 110px;
}
.ff7 {
  font-size: 95px;
}
.ff8 {
  font-size: 85px;
}
.ff9 {
  font-size: 75px;
}

.buttons-container {
  margin: auto;
  display: grid;
  grid-gap: 10px;
  grid-row-gap: 20px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
}

.button {
  align-items: center;
  background: #333;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  font-size: 45px;
  height: 82.5px;
  justify-content: center;
  transition: filter 0.3s;
  width: 82.5px;
}

.button.function {
  color: black;
  background: #a5a5a5;
}

.button.operator {
  background: #f1a33c;
}

.button.number-0 {
  border-radius: 55px;
  grid-column: 1 / span 2;
  justify-content: flex-start;
  padding-left: 25px;
  width: 175px;
}

.button:active,
.button:focus,
.cur {
  filter: brightness(150%);
}
</style>
