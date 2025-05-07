<script setup lang="ts">
const uplights = defineModel<boolean>('uplights');
</script>
<template>
  <div class="sm:max-w-sm w-[261px] place-items-center">
    <h3 class="sm:text-2xl text-xl text-center font-bold text-gray-800 mt-4 lg:mt-0 mb-4">
      Additional Uplighting?
    </h3>
    <ul class="grid gap-2 grid-cols-2 w-[190px]">
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
          class="h-[48px] inline-flex items-center justify-between w-full py-2.5 px-4 bg-[var(--black-soft)] leading-none text-[var(--white-soft)] rounded-lg cursor-pointer border-2 border-transparent peer-checked:border-2 peer-checked:border-green-500 peer-checked:text-green-500 hover:border-green-500 hover:ring-2 transition-[var(--transition-default)] shadow-md"
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
          class="h-[48px] inline-flex items-center justify-between w-full py-2.5 px-4 bg-[var(--black-soft)] leading-none text-[var(--white-soft)] rounded-lg cursor-pointer border-2 border-transparent peer-checked:border-2 peer-checked:border-red-500 peer-checked:text-red-500 hover:border-red-500 hover:ring-2 transition-[var(--transition-default)] shadow-md"
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
