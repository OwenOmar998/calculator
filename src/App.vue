<template>
  <div id="app">
    <CalculatorNormal v-if="calcResult.orientation === 'portrait'" />
    <CalculatorScientific v-if="calcResult.orientation === 'landscape'" />
  </div>
</template>

<script lang="ts">
import { useCalcResult } from "../stores/CalcResult";
import { defineComponent } from "vue";
import CalculatorNormal from "./components/CalculatorNormal.vue";
import CalculatorScientific from "./components/CalculatorScientific.vue";

export default defineComponent({
  setup() {
    const calcResult = useCalcResult();
    window.addEventListener("orientationchange", calcResult.detectOrientation);

    return { calcResult };
  },
  name: "App",
  components: { CalculatorNormal, CalculatorScientific },
});
</script>

<style>
body {
  background-color: #222;
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Arial, Helvetica;
  font-size: 1rem;
}
</style>
