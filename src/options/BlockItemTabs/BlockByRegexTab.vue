<template>
  <block-item-base-tab
    :allow-create-new-groups="false"
    :block-type-to-show="`regex`"
    :allow-delete-groups="false"
  >
    <template v-slot:note>
      Note: If you're unfamiliar with Regex (Regular Expressions), you can skip
      this page.
    </template>
  </block-item-base-tab>
</template>

<script>
import BlockItemBaseTab from "./BlockItemBaseTab";

export default {
  name: "BlockByRegexTab",
  components: { BlockItemBaseTab }
};
</script>

<style scoped></style>
