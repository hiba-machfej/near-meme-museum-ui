<template>
  <div
    class="flex justify-between mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-10"
  >
    <form>
      <label for="meme" class="mr-2">Meme Name</label>
      <input
        v-model="meme"
        type="text"
        name="meme"
        id="meme"
        placeholder="meme"
        class="border rounded p-1 px-3 w-40"
      />
      <label for="message" class="mr-2 ml-10">Title</label>
      <input
        v-model="title"
        type="text"
        name="title"
        id="title"
        placeholder="Title"
        class="border rounded p-1 px-3 w-40"
      />
      <label for="data" class="mr-2 ml-10">9gag Link</label>
      <input
        v-model="data"
        type="text"
        name="data"
        id="data"
        placeholder="9gag Link"
        class="border rounded p-1 px-3 w-40"
      />
      <label for="donation" class="mr-2 ml-10">Category</label>

      <select v-model="category" class="border rounded p-1 px-3 w-15">
        <option>0</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
      </select>
    </form>
    <div>
      <div></div>

      <button @click="handleSubmit" class="p-1 w-20 rounded-full bg-indigo-200">
        Send
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

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
    const meme = ref("");
    const title = ref("");
    const data = ref("");
    const category = ref(0);

    const handleSubmit = () => {
      /* eslint-disable no-useless-escape */
      // const nearRegexAccountId = /^(([a-z\d]+[\-_])*[a-z\d]+\.)*([a-z\d]+[\-_])*[a-z\d]+$/;

      // if (nearRegexAccountId.test(meme.value)) {
      //   alert("your meme account is not valid");
      //   meme.value = "";
      // } else {
      //   props.addMeme({
      //     meme: meme.value,
      //     title: title.value,
      //     data: data.value,
      //     category: parseInt(category.value),
      //   });
      // }
      props.addMeme({
        meme: meme.value,
        title: title.value,
        data: data.value,
        category: parseInt(category.value),
      });
    };

    return {
      meme,
      title,
      handleSubmit,
      data,
      category,
    };
  },
};
</script>

<style></style>
