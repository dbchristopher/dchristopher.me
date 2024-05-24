<script lang="ts">
	export let date: Date;
  export let handleDateNext: () => void
  export let handleDatePrev: () => void
	$: date;
</script>

<div class="date-picker">
  <button on:click={handleDatePrev}>&#8592;</button> 
  {date.getFullYear()}-{date.getMonth() + 1}-{date.getDate()}
  <button on:click={handleDateNext}>&#8594;</button>
</div>

<style>
  .date-picker {
    text-align: center;
  }
</style>