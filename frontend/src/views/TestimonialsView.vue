<script setup lang="ts">
  const testimonials = [
    {
      stars: 5,
      starsLabel: 'Five Stars',
      message:
        'Kyle B was absolutely wonderful to work with. He read the crowd and played music that was upbeat and fun- our guests didn’t want to leave when the reception was over! He was flexible, professional, and fun and I would highly recommend him Thank you!!',
      author: 'Beth, married 8/9/2014',
    },
    {
      stars: 5,
      starsLabel: 'Five Stars',
      message:
        'Our DJ Kyle was awesome! He kept the reception lively and entertaining, had great instincts, and made everyone happy. We are still gushing compliments on him from our guests. I couldn’t be happier…!',
      author: 'Jacob, married 10/4/2014',
    },
    {
      stars: 4.9,
      starsLabel: '4.9 Stars',
      message: 'Kyle created a fun atmosphere and was very much a professional.',
      author: 'Maria, married 10/11/2014',
    },
    {
      stars: 5,
      starsLabel: 'Five Stars',
      message:
        'These guys knocked it out of the park. From… DJ Kyle performing the DJ duties, absolutely no complaints! Almost didn’t do a DJ and can’t imagine our wedding without one. Kyle is extremely responsive to your input, adept at managing requests, and a wiz on the tables. If you’re in doubt, don’t sweat it. …DJ Kyle will take care of you on the big day!',
      author: 'MKandDL',
    },
    {
      stars: 5,
      starsLabel: 'Five Stars',
      message:
        'We chose [DJ Kyle] because they were one of the few DJ’s we could find who used actual turntables… Kyle was our DJ for the night and we have nothing but the highest praise for him. He was wonderful on our wedding day- we used him for ceremony and reception. Kyle was professional, fun, and extremely flexible which made our night the dancing party I always wanted. The music was perfect, he really worked with and read the crowd to keep the energy high and he was on point with all of the key elements of the night (speeches, cake cutting, etc). And from the beginning the planning process… was so smooth, he is super easy to communicate with and will work with you every step of the way to make your day exactly what you want.',
      author: 'Dena D',
    },
    {
      stars: 5,
      starsLabel: 'Five Stars',
      message:
        'Kyle was a great DJ and kept the ceremony and reception moving. He quickly picked up on the mood we wanted to set for the event and was very professional.',
      author: 'Reynaldo C',
    },
    {
      stars: 5,
      starsLabel: '10/10',
      message:
        'Kyle our DJ was AMAZING!!!! Every single person at our wedding said it was the most fun wedding they have ever been to and Kyle was the life of the party.',
      author: 'Victoria Diamond, reviewed 11/28/2023',
    },
    {
      stars: 5,
      starsLabel: '10/10',
      message:
        'Amazing job! From the pre-wedding communication to the day of the wedding, everything went flawless and our DJ Kyle… made our day too special! We would highly recommend, and are so happy we chose',
      author: 'Christine Norton, reviewed 11/22/2023',
    },
  ];
</script>
<template>
    <div class="space-y-6">
      <div
        v-for="(testimonial, index) in testimonials"
        :key="index"
        class="bg-white p-6 rounded-lg shadow divide-y divide-gray-200"
      >
        <div class="flex items-center mb-4">
          <div class="flex items-center space-x-1">
            <svg
              v-for="n in Math.floor(testimonial.stars)"
              :key="n"
              class="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.14 3.513a1 1 0 00.95.69h3.688c.969 0 1.371 1.24.588 1.81l-2.985 2.17a1 1 0 00-.364 1.118l1.14 3.513c.3.921-.755 1.688-1.538 1.118l-2.985-2.17a1 1 0 00-1.176 0l-2.985 2.17c-.783.57-1.838-.197-1.538-1.118l1.14-3.513a1 1 0 00-.364-1.118L2.69 8.94c-.783-.57-.38-1.81.588-1.81h3.688a1 1 0 00.95-.69l1.14-3.513z"></path>
            </svg>
          </div>
          <span class="ml-2 text-sm text-gray-600">{{ testimonial.starsLabel }}</span>
        </div>
        <p class="text-gray-800 mb-2">{{ testimonial.message }}</p>
        <p class="text-sm text-gray-500">- {{ testimonial.author }}</p>
      </div>
    </div>
  </template>
<style></style>
