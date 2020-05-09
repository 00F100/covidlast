<template>
  <div class="row">
    <div class="col">
      <h5>Chart cases - cases {{ countriesSelected }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChartCasesPopulation',
  props: {
    countriesSelected: Array
  }
}
</script>