<template>
  <div class="h-full">
    <!-- head -->
    <LayoutsHeader />
    <!-- content -->
    <div class="content min-h-[100vh]">
      <slot></slot>
    </div>
    <!-- footer -->
    <LayoutsFooter />
  </div>
</template>

<script lang="ts" setup>  
  
</script>

<style>
/* Fixed header is 0.72rem (logo) + 0.54rem (nav) = 1.26rem total.
   Push all page content below it globally so individual pages don't need to. */
.content {
  padding-top: 1.26rem;
}
</style>
