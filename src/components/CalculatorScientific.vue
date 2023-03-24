<template>
  <div id="calculator">
    <div class="top-container">
      <div class="value">{{ calcResult.result }}</div>
    </div>
    <div class="buttons-container">
      <div class="button secondary">(</div>
      <div class="button secondary">)</div>
      <div class="button secondary">mc</div>
      <div class="button secondary">m+</div>
      <div class="button secondary">m-</div>
      <div class="button secondary">mr</div>
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

      <div
        class="button secondary"
        :class="{ cur: calcResult.nd }"
        @click="calcResult.toggle2nd()"
      >
        2<sup>nd</sup>
      </div>
      <div class="button secondary" @click="calcResult.handleSingleOp('sq')">
        x<sup>2</sup>
      </div>
      <div class="button secondary" @click="calcResult.handleSingleOp('cu')">
        x<sup>3</sup>
      </div>
      <div
        class="button secondary"
        :class="{ cur: calcResult.tempOp === 'exp' }"
        @click="calcResult.handleDoubleOp('exp')"
      >
        x<sup>y</sup>
      </div>
      <div
        v-if="calcResult.nd"
        class="button secondary"
        :class="{ cur: calcResult.tempOp === 'exp' }"
        @click="calcResult.handleDoubleOp('exp')"
      >
        y<sup>x</sup>
      </div>
      <div
        v-else
        class="button secondary"
        @click="calcResult.handleSingleOp('ex')"
      >
        e<sup>x</sup>
      </div>
      <div
        v-if="calcResult.nd"
        class="button secondary"
        @click="calcResult.handleSingleOp('2ex')"
      >
        2<sup>x</sup>
      </div>
      <div
        v-else
        class="button secondary"
        @click="calcResult.handleSingleOp('10ex')"
      >
        10<sup>x</sup>
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

      <div class="button secondary" @click="calcResult.handleSingleOp('rev')">
        1 &#8725; x
      </div>
      <div class="button secondary" @click="calcResult.handleSingleOp('root2')">
        &radic; x
      </div>
      <div class="button secondary" @click="calcResult.handleSingleOp('root3')">
        &#8731; x
      </div>
      <div
        class="button secondary"
        :class="{ cur: calcResult.tempOp === 'root' }"
        @click="calcResult.handleDoubleOp('root')"
      >
        <sup>y</sup>&radic;x
      </div>
      <div
        v-if="calcResult.nd"
        class="button secondary"
        :class="{ cur: calcResult.tempOp === 'logy' }"
        @click="calcResult.handleDoubleOp('logy')"
      >
        log<sub>y</sub>
      </div>
      <div
        v-else
        class="button secondary"
        @click="calcResult.handleSingleOp('ln')"
      >
        ln
      </div>
      <div
        v-if="calcResult.nd"
        class="button secondary"
        @click="calcResult.handleSingleOp('log2')"
      >
        log<sub>2</sub>
      </div>
      <div
        v-else
        class="button secondary"
        @click="calcResult.handleSingleOp('log')"
      >
        log<sub>10</sub>
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

      <div class="button secondary" @click="calcResult.handleSingleOp('fac')">
        x!
      </div>
      <div class="button secondary" @click="calcResult.handleSingleOp('sin')">
        <span v-if="calcResult.nd">sin<sup>-1</sup></span>
        <span v-else>sin</span>
      </div>
      <div class="button secondary" @click="calcResult.handleSingleOp('cos')">
        <span v-if="calcResult.nd">cos<sup>-1</sup></span>
        <span v-else>cos</span>
      </div>
      <div class="button secondary" @click="calcResult.handleSingleOp('tan')">
        <span v-if="calcResult.nd">tan<sup>-1</sup></span>
        <span v-else>tan</span>
      </div>
      <div
        class="button secondary"
        @click="
          calcResult.result = calcResult.currentValue =
            Math.E.toString().substring(0, 16)
        "
      >
        e
      </div>
      <div
        class="button secondary"
        :class="{ cur: calcResult.tempOp === 'EE' }"
        @click="calcResult.handleDoubleOp('EE')"
      >
        EE
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

      <div class="button secondary" @click="calcResult.toggleRad()">
        <span v-if="calcResult.rad">Deg</span>
        <span v-else>Rad</span>
      </div>
      <div class="button secondary" @click="calcResult.handleSingleOp('sinh')">
        <span v-if="calcResult.nd">sinh<sup>-1</sup></span>
        <span v-else>sinh</span>
      </div>
      <div class="button secondary" @click="calcResult.handleSingleOp('cosh')">
        <span v-if="calcResult.nd">cosh<sup>-1</sup></span>
        <span v-else>cosh</span>
      </div>
      <div class="button secondary" @click="calcResult.handleSingleOp('tanh')">
        <span v-if="calcResult.nd">tanh<sup>-1</sup></span>
        <span v-else>tanh</span>
      </div>
      <div
        class="button secondary"
        @click="
          calcResult.result = calcResult.currentValue =
            Math.PI.toString().substring(0, 16)
        "
      >
        &pi;
      </div>
      <div class="button secondary" @click="calcResult.handleSingleOp('rand')">
        Rand
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
  components: {},
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
  height: 390px;
  position: relative;
  width: 844px;
  padding: 20px 50px;
}

.top-container {
  height: 75px;
}

.value {
  font-weight: 300;
  font-size: 50px;
  text-align: right;
}

.buttons-container {
  margin: auto;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(6, 0.75fr) repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
}

.button {
  align-items: center;
  background: #333;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  font-size: 30px;
  height: 42.5px;
  justify-content: center;
  transition: filter 0.3s;
  width: 65px;
}
.secondary {
  background: #222;
  font-size: 20px;
}
sup {
  font-size: 0.6em;
  margin-bottom: 10px;
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
  grid-column: 7 / span 2;
  justify-content: flex-start;
  padding-left: 25px;
  width: 140px;
}

.button:active,
.button:focus,
.cur {
  filter: brightness(150%);
}
</style>
