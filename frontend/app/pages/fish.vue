<script setup lang="ts">
import { CATEGORY_HERO_MEDIA } from '~/config/operational-media';
</script>

<template>
  <div>
    <CategoryHero
      title="FISHING GAMES"
      :image="CATEGORY_HERO_MEDIA.fish.image"
      :focal-point="CATEGORY_HERO_MEDIA.fish.focalPoint"
      :eyebrow="CATEGORY_HERO_MEDIA.fish.eyebrow"
    />
    <VendorBrowser title="Fishing Games" kind="fish" />
  </div>
</template>
