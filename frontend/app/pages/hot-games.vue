<script setup lang="ts">
import { CATEGORY_HERO_MEDIA } from '~/config/operational-media';
</script>

<template>
  <div>
    <CategoryHero
      title="HOT GAMES"
      :image="CATEGORY_HERO_MEDIA.hotGames.image"
      :focal-point="CATEGORY_HERO_MEDIA.hotGames.focalPoint"
      :eyebrow="CATEGORY_HERO_MEDIA.hotGames.eyebrow"
    />
    <VendorBrowser title="Hot Games" kind="hot-games" direct />
  </div>
</template>
