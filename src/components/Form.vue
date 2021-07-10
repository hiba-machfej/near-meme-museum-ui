<template>
  <div class="flex justify-center w-full">
    <form>
      <label for="message" class="mr-2">Title</label>
      <input
        v-model="title"
        type="text"
        name="title"
        id="title"
        placeholder="Title"
      />
      <label for="data" class="mr-2">9gag Link</label>
      <input
        v-model="data"
        type="text"
        name="data"
        id="data"
        placeholder="9gag Link"
      />
      <label for="donation" class="mr-2">Category</label>

      <input v-model="category" type="number" placeholder="category" />
    </form>
    <div>
      <div></div>

      <button @click="handleSubmit">Send</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { wallet } from "@/services/near";

export default {
  props: {
    // pass addMessage as a prop to Form
    // Form and Messages are sybling components that share state (Form sets messages; Messages gets messages)
    // since they share state, the state should be lifted to their parent component (Home)
    addMeme: {
      type: Function,
      required: true,
    },
  },

  setup(props) {
    const accountId = wallet.getAccountId();
    const title = ref("");
    const data = ref("");
    const category = ref(0);

    const handleSubmit = () => {
      props.addMeme({
        meme: accountId,
        title: title.value,
        data: data.value,
        category: category.value,
      });
    };

    return {
      title,
      handleSubmit,
      data,
      category,
    };
  },
};
</script>

<style></style>
