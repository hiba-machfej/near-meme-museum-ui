<template>
  <SignIn />
  <Hero />
  <Form :addMeme="addMeme" />
  <Memes :memeList="memeList" :addComment="addComment" />
</template>

<script>
import { useMemes } from "@/composables/near";
import Memes from "@/components/Memes";
import SignIn from "@/components/SignIn";
import Form from "@/components/Form";
import Hero from "@/components/Hero";
export default {
  components: {
    Memes,
    SignIn,
    Form,
    Hero,
  },
  setup() {
    const { memeList, addMeme, addComment } = useMemes();

    return {
      memeList,
      addMeme,
      addComment,
    };
  },
};
</script>

<style></style>
