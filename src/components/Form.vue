<template>
  <div class="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-10">
    <Form
      @submit="handleSubmit"
      :validation-schema="schema"
      class="flex justify-between max-w-7xl mx-auto items-center"
    >
      <div
        v-for="field in formFields"
        :key="field.id"
        class="flex px-4 items-center"
      >
        <div class="flex flex-col h-10">
          <div>
            <label :for="field.id" class="mr-2">{{ field.label }}</label>

            <Field
              :v-model="field.id"
              type="text"
              :name="field.id"
              :id="field.id"
              :placeholder="field.label"
              class="border rounded p-1 px-3 w-40"
            />
          </div>
          <ErrorMessage :name="field.id" class="w-64 text-red-500" />
        </div>
      </div>
      <div>
        <label for="donation" class="mr-2">Category</label>

        <Field
          as="select"
          v-model="category"
          name="category"
          id="category"
          class="border rounded p-1 px-3 w-15"
        >
          <option>0</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </Field>
      </div>

      <button class="p-1 w-20 rounded-full bg-indigo-200">Send</button>
    </Form>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import { useForm, useField, Form, Field, ErrorMessage } from "vee-validate";

export default {
  props: {
    // pass addMessage as a prop to Form
    // Form and Messages are sybling components that share state (Form sets messages; Messages gets messages)
    // since they share state, the state should be lifted to their parent component (Home)
    addMeme: {
      type: Function,
      required: true,
    },
    memes: {
      type: Array,
      required: true,
    },
  },
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  setup(props) {
    const memeIds = ref();
    watchEffect(() => {
      memeIds.value = props.memes.map((meme) => {
        return meme.id;
      });
    });

    /*
      This is a set of rule defined for the form
    */

    const schema = {
      meme(value) {
        if (!value) {
          return "This field is required";
        }
        if (value.length < 2) {
          return "minimum length is 2";
        }
        if (value === memeIds.value.find((id) => id === value)) {
          return "This meme Id is already taken, please choose another one";
        }
        // Check if memeId apply to the NEAR Protocol account names system.
        if (
          // eslint-disable-next-line
          !/^(([a-z\d]+[\-_])*[a-z\d]+\.)*([a-z\d]+[\-_])*[a-z\d]+$/.test(value)
        ) {
          return "This memeId doesn't follow the NEAR Protocol account names system.";
        }
        return true;
      },
      title(value) {
        if (!value) {
          return "This field is required";
        }
        if (value.length < 2) {
          return "minimum length is 2";
        }
        return true;
      },
      data(value) {
        if (
          // Checks if this is a 9gag link
          // eslint-disable-next-line
          !/(https:|http:)+(\/\/)+(9gag\.com\/gag\/)+\S/.test(value)
        ) {
          return "This should be a 9gag link";
        }
        return true;
      },
    };

    useForm({
      validationSchema: schema,
    });

    const { value: meme, errorMessage: memeError } = useField("meme");
    const { value: title, errorMessage: titleError } = useField("title");
    const { value: data, errorMessage: dataError } = useField("data");

    const category = ref(0);

    const handleSubmit = (values) => {
      props.addMeme(values);
    };

    const formFields = [
      {
        label: "Meme Name",
        id: "meme",
      },
      {
        label: "Title",
        id: "title",
      },
      {
        label: "9gag Link",
        id: "data",
      },
    ];

    return {
      schema,
      category,
      handleSubmit,
      formFields,
    };
  },
};
</script>

<style></style>
