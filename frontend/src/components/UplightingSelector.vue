<script setup lang="ts">
const uplights = defineModel<boolean>('uplights');
</script>
<template>
  <div class="sm:max-w-sm w-[261px]">
    <h3 class="sm:text-2xl text-xl text-center font-bold text-gray-800 pt-10 mb-5">
      Would you like to add the additional uplighting package for only $200 extra?
    </h3>
    <ul class="grid w-full gap-6 md:grid-cols-2">
      <li>
        <input
          type="radio"
          id="uplighting-yes"
          class="hidden peer"
          :checked="uplights === true"
          @change="uplights = true"
        />
        <label
          for="uplighting-yes"
          class="inline-flex items-center justify-between w-full p-5 bg-[var(--black-soft)] leading-none text-[var(--white-soft)] rounded-lg cursor-pointer border peer-checked:border-green-500 peer-checked:text-green-500 hover:ring-2 transition-[var(--transition-default)] shadow-md"
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
          id="uplighting-no"
          class="hidden peer"
          :checked="uplights === false"
          @change="uplights = false"
        />
        <label
          for="uplighting-no"
          class="inline-flex items-center justify-between w-full p-5 bg-[var(--black-soft)] leading-none text-[var(--white-soft)] rounded-lg cursor-pointer border peer-checked:border-red-500 peer-checked:text-red-500 hover:ring-2 transition-[var(--transition-default)] shadow-md"
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
  </div>
</template>
