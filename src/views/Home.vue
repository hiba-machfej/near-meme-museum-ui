<template>
  <SignIn />
  <Hero />
  <TransactionAlert />
  <Form :addMeme="addMeme" />
  <Memes
    :memes="memes"
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
import TransactionAlert from "@/components/TransactionAlert.vue";
export default {
  components: {
    Memes,
    SignIn,
    Form,
    Hero,
    TransactionAlert,
  },
  setup() {
    const { memes, addMeme, addComment, donate, vote } = useMemes();

    return {
      memes,
      addMeme,
      addComment,
      donate,
      vote,
    };
  },
};
</script>

<style></style>
