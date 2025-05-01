<script setup lang="ts">
const addHours = defineModel<boolean>('addHours');
const additionalHours = defineModel<number>('additionalHours');

function increment() {
  additionalHours.value = (additionalHours.value ?? 1) + 1;
}

function decrement() {
  if ((additionalHours.value ?? 1) > 1) {
    additionalHours.value!--;
  }
}
</script>

<template>
  <div class="sm:max-w-sm w-[261px]">
    <h3 class="sm:text-2xl text-xl text-center font-bold text-gray-800 pt-10 mb-5">
      Would you like to add additional hours beyond the included 5?
    </h3>
    <ul class="grid w-full gap-6 md:grid-cols-2">
      <li>
        <input
          type="radio"
          id="add-hours-yes"
          class="hidden peer"
          :checked="addHours === true"
          @change="addHours = true"
        />
        <label
          for="add-hours-yes"
          class="inline-flex items-center justify-between w-full p-5 bg-[var(--black-soft)] leading-none text-[var(--white-soft)] rounded-lg cursor-pointer border peer-checked:border-green-500 peer-checked:text-green-500 hover:ring-2 transition-[var(--transition-default)]"
        >
          <div class="block">
            <div class="w-full text-lg font-semibold">Yes</div>
          </div>
          <svg
            class="w-5 h-5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </label>
      </li>
      <li>
        <input
          type="radio"
          id="add-hours-no"
          class="hidden peer"
          :checked="addHours === false"
          @change="addHours = false"
        />
        <label
          for="add-hours-no"
          class="inline-flex items-center justify-between w-full p-5 bg-[var(--black-soft)] leading-none text-[var(--white-soft)] rounded-lg cursor-pointer border peer-checked:border-red-500 peer-checked:text-red-500 hover:ring-2 transition-[var(--transition-default)]"
        >
          <div class="block">
            <div class="w-full text-lg font-semibold">No</div>
          </div>
          <svg
            class="w-5 h-5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </label>
      </li>
    </ul>

    <div v-if="addHours" class="mt-6 flex items-center justify-center gap-4">
      <button
        type="button"
        @click="decrement"
        class="w-10 h-10 rounded-full bg-[var(--black-soft)] text-[var(--white-soft)] text-xl font-bold cursor-pointer"
      >
        –
      </button>
      <span class="text-xl font-semibold text-[var(--black-soft)]">
        {{ additionalHours ?? 1 }} hour{{ (additionalHours ?? 1) > 1 ? 's' : '' }}
      </span>
      <button
        type="button"
        @click="increment"
        class="w-10 h-10 rounded-full bg-[var(--black-soft)] text-[var(--white-soft)] text-xl font-bold cursor-pointer"
      >
        +
      </button>
    </div>
  </div>
</template>
