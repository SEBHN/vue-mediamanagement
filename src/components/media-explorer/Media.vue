<template>
<div class="text-xs-center">
  <v-btn icon>
    <v-icon large>insert_drive_file</v-icon>
  </v-btn>
  <p class="body-1">{{ name }}</p>
 </div>
</template>

<script>
export default {
  data: function () {
    return {
    }
  },
  props: {
    name: String
  },
  methods: {
      addTag(tag) {
        this.tags.push(tag);
      },
      removeTag(tag) {
        throw new Error('Not yet implemented');
      }
  }
}
</script>

<style>

</style>
