<template>
  <div class="mx-auto px-4 max-w-7xl sm:px-6 lg:px-8">
    <div class="w-full flex justify-between items-center mb-20">
      <div
        class="flex justify-start items-center bg-near-black text-near-white font-bold pr-3 rounded-full"
      >
        <img class="w-8 md:w-12" src="@/assets/logo.svg" alt="logo" />
        <p>Meme Museum</p>
      </div>
      <div v-if="accountId" class="flex w-40 justify-between">
        <p>{{ accountId }}</p>
        <button @click="signOut">
          {{ "Log out" }}
        </button>
      </div>

      <button v-else @click="signIn">
        {{ "Login with NEAR Wallet" }}
      </button>
    </div>
  </div>
</template>

<script>
import { wallet, CONTRACT_ID } from "@/services/near";

export default {
  setup() {
    const accountId = wallet.getAccountId();

    return {
      accountId,
      signIn: () => wallet.requestSignIn(CONTRACT_ID),
      signOut: () => {
        wallet.signOut();
        window.location.reload();
      },
    };
  },
};
</script>

<style></style>
