<template>
  <SignIn />
  <Hero />
  <Form :addMeme="addMeme" />
  <Memes
    :memeList="memeList"
    :addComment="addComment"
    :donate="donate"
    :vote="vote"
  />
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
    const { memeList, addMeme, addComment, donate, vote } = useMemes();

    return {
      memeList,
      addMeme,
      addComment,
      donate,
      vote,
    };
  },
};
</script>

<style></style>
