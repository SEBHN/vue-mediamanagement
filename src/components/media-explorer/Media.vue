<template>
<div>
  <!-- If media is a folder -->
  <div class="text-xs-center" v-if="isFolder">
    <v-btn icon class="zoom">
      <v-icon color="blue darken-2" large>folder</v-icon>
    </v-btn>
    <p class="subheading font-weight-light">{{ name }}</p>
  </div>
  <!-- Else: media is a file -->
  <div class="text-xs-center" v-else>
    <v-bottom-sheet v-model="sheet">
      <v-btn icon class="zoom" slot="activator">
        <v-icon color="amber darken-1" large>insert_drive_file</v-icon>
      </v-btn>
      <v-list>
        <v-subheader>{{ name }}</v-subheader>
        <v-list-tile @click="delegate('rename')">
          <v-list-tile-title>Rename</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="delegate">
          <v-list-tile-title>Delete</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="delegate">
          <v-list-tile-title>Download</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="delegate">
          <v-list-tile-title>Tag</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-bottom-sheet>
    <p class="subheading font-weight-light">{{ name }}</p>
  </div>
</div>

</template>

<script>
export default {
  data: function () {
    return {
      hover: false,
      sheet: false,
      tag: String
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
      },
      delegate() {
        // check operation here
        this.sheet = false;
      }
  }
}
</script>

<style>
  .zoom:hover {
    transform: scale(1.5);
  }
</style>
