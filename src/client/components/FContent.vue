<script lang="ts" setup>
import MainBox from './MainBox.vue';
import markdownit from 'markdown-it';

const markdown = markdownit();
const props = defineProps<{content: string}>();

</script>
<template>
    <MainBox>
        <div class="markdown-body" v-html="markdown.render(props.content)"></div>
    </MainBox>
</template>