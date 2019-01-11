<template>
<div>
  <!-- If media is a folder -->
  <div class="text-xs-center" v-if="isFolder">
    <v-btn icon class="zoom">
      <v-icon color="blue darken-2" large>folder</v-icon>
    </v-btn>
    <p class="body-1">{{ name }}</p>
  </div>
  <!-- Else: media is a file -->
  <div class="text-xs-center" v-else>
    <v-btn icon class="zoom">
      <v-icon color="amber darken-1" large>insert_drive_file</v-icon>
    </v-btn>
    <p class="body-1">{{ name }}</p>
  </div>
  <span v-if="hover">Hovered!</span>
</div>
</template>

<script>
export default {
  data: function () {
    return {
      hover: false
    }
  },
  props: {
    name: String,
    isFolder: Boolean
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
  .zoom:hover {
    transform: scale(1.5);
  }
</style>
