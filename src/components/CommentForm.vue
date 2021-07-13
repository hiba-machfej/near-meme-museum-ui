<template>
  <div class="flex justify-between w-full">
    <form>
      <input
        v-model="comment"
        type="comment"
        name="comment"
        id="comment"
        placeholder="Write a comment..."
        class="border rounded p-1 px-3 w-72"
      />
    </form>

    <button @click="handleSubmit">Send</button>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    addComment: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },

  setup(props) {
    const comment = ref("");

    const handleSubmit = () => {
      props.addComment({
        index: props.index,
        text: comment.value,
      });
    };

    return {
      comment,
      handleSubmit,
    };
  },
};
</script>

<style></style>
