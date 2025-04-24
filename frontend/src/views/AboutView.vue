<template>
  <div class="relative h-full">
    <video class="fixed inset-0 w-full h-full object-cover z-0" autoplay muted loop playsinline>
      <source src="@/assets/movies/movie2-loop.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div class="relative h-full z-10">
      <div class="flex justify-center pb-7 pt-17">
        <h1 class="text-6xl">About</h1>
      </div>
      <div class="flex flex-col items-center p-4 sm:p-10">
        <div
          class="flex flex-col md:flex-row md:items-stretch rounded-xl gap-6 w-full max-w-5xl"
        >
          <div class="relative w-[150px] self-center md:self-start mt-4 sm:mt-0 shadow-lg">
            <div
              class="absolute -inset-0 border-2 border-black rotate-5 z-0 rounded-sm shadow-lg"
            ></div>
            <img
              class="relative z-10 w-full h-auto rounded-sm shadow-lg border-2 border-black"
              src="@/assets/profile-pic.png"
              alt="DJ Kyle Photo"
            />
          </div>
          <div
            class="flex-1 font-medium p-8 space-y-4 rounded-xl shadow-lg text-gray-800 min-h-[250px] bg-gradient-to-b from-[rgba(136,136,136,0.3)] to-transparent"
          >
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;SoundChoice founder/operator Kyle Beller has been DJing
              professionally for over 16 years. With a resumè boasting performances at iconic venues
              like Red Rocks, Belly Up and Meow Wolf, a season as resident DJ for Club Med, and
              hundreds of satisfied couples and clients, you can count on an excellent soundtrack
              for your special event.
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;In addition to the music, Kyle is a confident and experienced
              MC and host. Your guests will be engaged and know exactly what to expect at every
              point throughout the event. Want that little something extra to really wow your
              guests? Ask about the activities and games available to build into your itinerary!
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;A SoundChoice event includes speakers, microphones, and
              lighting to fill your venue with the exciting atmosphere you're after. Make the
              SoundChoice today!
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
