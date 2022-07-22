'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Spots', [
    {
      userId: 2,
      address: '555 Ocean Drive',
      city: 'San Diego',
      state: 'California',
      country: 'United States',
      name: 'Luxury stay in Joshua Tree',
      price: 1120,
      description: "This is the famous Kellogg Doolittle estate in Joshua Tree California. It is one of the most exclusive homes in the world, and available for the first time as an Airbnb Luxe exclusive. Created over 25 meticulous years, Kellogg Doolittle in Joshua Tree National Park is a marvel of the organic architecture movement. A residence that is so “one-of-a-kind,” nearly every element, inside and out, is handcrafted by architect Ken Kellogg and Master Craftsman John Vugrin. The masterpiece of organic architecture sits along the breathtaking landscape of Joshua Tree National Park, the location that lent itself as the ambitious vision and inspiration behind the design. Kellogg, a former protege of Frank Lloyd Wright, has taken organic architecture to new levels with this outstanding house. The Kellogg-Doolittle House contains no straight lines or rectangular spaces. Instead, the house forms around 26-winged piers composed of organic material built quietly into the natural landscape: the kitchen and living room stretch softly around an unmoved, million-year-old rock formation, while the glass panels peek into a sprawl of sunrise and sunset views. Located on a quiet edge of Joshua Tree National Park, you have your private path into an un-trafficked section of the park, just steps from the front door. Take an easy drive to the main park entrance, start your exploration with a stroll through the Cholla Cactus Gardens, snap a few photos at Skull Rock, and hike the Hidden Valley Nature Trail; or stay at home, shut the world out, sit around the fire pit and wait for a chance to see the Milky Way in your exclusive dark sky view. If you're in the mood for city life, Palm Springs is an easy hour's drive."
      ,
      url: 'https://a0.muscache.com/im/pictures/monet/Luxury-53719772/original/17b49e69-a3b4-4f80-8068-868a3892d6cc?im_w=1200'

    },
    {
      userId: 1,
      address: '8 Bridle Drive',
      city: 'Los Angeles',
      state: 'California',
      country: 'United States',
      name: 'Beautiful Luxurious Home by the Beach',
      price: 220,
      description: "Eagle's Watch is one of Malibu's most famous houses, impossible to miss while driving the Pacific Coast Highway and designed by legendary architect Harry Gesner. Perched above the Pacific Ocean, Eagle’s Watch has the best unobstructed panoramic view in Malibu. Perfect for entertaining with dramatic outdoor and indoor spaces, the views from every location are simply stunning. Stay in ultimate luxury in this one of a kind serene modern marvel.",
      url: 'https://a0.muscache.com/im/pictures/2e5ce6c9-4935-49ce-891e-e6f7251a8590.jpg'
    },
    {
      userId: 3,
      address: '17 Santa Clara Ave.',
      city: 'Santa Clara',
      state: 'California',
      country: 'United States',
      name: 'Crestone Hobbitat',
      price: 300,
      description: "The lookout is open year round with a wood fired stove to keep warm at night or heat your morning coffee. A wood fired sauna sits below to relax and rejuvenate your body after a big hike or snowshoeing adventure. What's that other little wooden building? No fire lookout is complete without an outhouse!",
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-51766660/original/4230cf88-3e59-4fbe-80ae-bd56d2350ab2.jpeg'
    },
    {
      userId: 4,
      address: '7169 Oak Meadow Rd.',
      city: 'San Jose',
      state: 'California',
      country: 'United States',
      name: 'Tiny home',
      price: 425,
      description: `Tucked away in our peaceful garden, this modern Hobbit Cottage will delight you! Although it's not the Shire of Middle Earth from LOTR, it's our little piece of paradise. We are located near Bryce Canyon, Brian Head and Zion National Park, Kannarraville Falls. Custom built by Chris and I for those who love adventure, hiking, snow boarding. Make sure to catch the world-famous Shakespeare festival. Cedar City is known as "Festival City" for a good reason!`,
      url: 'https://a0.muscache.com/im/pictures/56467892-0d23-4ab1-8302-9c3d0d5e52cd.jpg?im_w=1200'
    },
    {
      userId: 3,
      address: '142 Palms Shore Ave.',
      city: 'Santa Cruz',
      state: 'California',
      country: 'United States',
      name: 'Magnificent Entire villa',
      price: 300,
      description: "Unique 10,000 sq ft Malibu playhouse, full of architectural enchantment and imagination, with massive views of the Pacific Ocean and mountain backdrops. This house will bring out the child within, full of nooks and crannies to explore the vast gardens on the estate.",
      url: 'https://a0.muscache.com/im/pictures/e1599128-cdb4-4324-ba8e-d1893475c0bb.jpg'
    },
    {
      userId: 3,
      address: '142 Palms Shore Ave.',
      city: 'Santa Cruz',
      state: 'California',
      country: 'United States',
      name: 'Magnificent Entire villa',
      price: 300,
      description: "Unique 10,000 sq ft Malibu playhouse, full of architectural enchantment and imagination, with massive views of the Pacific Ocean and mountain backdrops. This house will bring out the child within, full of nooks and crannies to explore the vast gardens on the estate.",
      url: 'https://a0.muscache.com/im/pictures/e1599128-cdb4-4324-ba8e-d1893475c0bb.jpg'
    }
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Spots', null, {});
  }
};
