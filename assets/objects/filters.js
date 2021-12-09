const bases = [
    { name: 'Default', value: null },
    { name: 'Pochard', value: 'Pochard' },
    { name: 'Male Mallard', value: 'Male Mallard' },
    { name: 'Seaduck', value: 'Seaduck' },
    { name: 'Mandarin', value: 'Mandarin' },
    { name: 'Female Mallard', value: 'Female Mallard' },
    { name: 'Domestic Duck', value: 'Domestic Duck' },
    { name: 'Shiny Red', value: 'Shiny Red' },
    { name: 'Shiny Mandarin', value: 'Shiny Mandarin' },
    { name: 'Eider', value: 'Eider' },
    { name: 'Shiny Rubber Ducky', value: 'Shiny Rubber Ducky' },
    { name: 'Goldeneye', value: 'Goldeneye' },
    { name: 'Shiny Merganser', value: 'Shiny Merganser' },
    { name: 'Shiny Male Mallard', value: 'Shiny Male Mallard' },
    { name: 'Shiny Domestic', value: 'Shiny Domestic' },
    { name: 'Hulk', value: 'Hulk' },
    { name: 'Shiny Female Mallard', value: 'Shiny Female Mallard' },
    { name: 'Shiny Pochard', value: 'Shiny Pochard' },
    { name: 'Merganser', value: 'Merganser' },
    { name: 'Rubber Ducky', value: 'Rubber Ducky' },
    { name: 'Red', value: 'Red' },
    { name: 'Shiny Goldeneye', value: 'Shiny Goldeneye' },
    { name: 'Shiny Eider', value: 'Shiny Eider' },
    { name: 'Shiny Seaduck', value: 'Shiny Seaduck' },
    { name: 'Shiny Hulk', value: 'Shiny Hulk' }
]

const beaks = [
    { name: 'Default', value: null },
    { name: 'Braces Beak', value: 'Braces Beak' },
    { name: 'Green Open Beak', value: 'Green Open Beak' },
    { name: 'Green Beak', value: 'Green Beak' },
    { name: 'Normal Beak', value: 'Normal Beak' },
    { name: 'Orange Cracked Beak', value: 'Orange Cracked Beak' },
    { name: 'Open Beak', value: 'Open Beak' },
    { name: 'Sax Beak', value: 'Sax Beak' },
    { name: 'Lipstick Beak', value: 'Lipstick Beak' },
    { name: 'Blue Open Beak', value: 'Blue Open Beak' },
    { name: 'Orange Open Beak', value: 'Orange Open Beak' },
    { name: 'Broken Smile', value: 'Broken Smile' },
    { name: 'Smile Beak', value: 'Smile Beak' },
    { name: 'Orange Beak', value: 'Orange Beak' },
    { name: 'Moustache Beak', value: 'Moustache Beak' },
    { name: 'Blue Cracked Beak', value: 'Blue Cracked Beak' },
    { name: 'Blue Beak', value: 'Blue Beak' },
    { name: 'Daffy Beak', value: 'Daffy Beak' },
    { name: 'Pipe Beak', value: 'Pipe Beak' },
    { name: 'Toucan Beak', value: 'Toucan Beak' },
    { name: 'Tongue Beak', value: 'Tongue Beak' },
    { name: 'Green Cracked Beak', value: 'Green Cracked Beak' },
    { name: 'Cigarette Beak', value: 'Cigarette Beak' },
    { name: 'Cracked Beak', value: 'Cracked Beak' },
    { name: 'Vampire Beak', value: 'Vampire Beak' },
    { name: 'Drooling Beak', value: 'Drooling Beak' },
    { name: 'Rainbow Beak', value: 'Rainbow Beak' }
]

const eyes = [
    { name: 'Default', value: null },
    { name: 'Angry Eyes', value: 'Angry Eyes' },
    { name: 'Red Eyes', value: 'Red Eyes' },
    { name: 'Monocle', value: 'Monocle' },
    { name: 'Eyes', value: 'Eyes' },
    { name: 'Dumb Eyes', value: 'Dumb Eyes' },
    { name: 'Hypnotized Eyes', value: 'Hypnotized Eyes' },
    { name: 'Bulging Eyes', value: 'Bulging Eyes' },
    { name: 'Surprised Eyes', value: 'Surprised Eyes' },
    { name: 'Smug Eyes', value: 'Smug Eyes' },
    { name: 'Eyepatch', value: 'Eyepatch' },
    { name: 'Nerdy Glasses', value: 'Nerdy Glasses' },
    { name: 'Tired Eyes', value: 'Tired Eyes' },
    { name: 'Censorbar', value: 'Censorbar' },
    { name: 'Sunglasses', value: 'Sunglasses' },
    { name: 'Crying Eyes', value: 'Crying Eyes' },
    { name: 'Terminator Eyes', value: 'Terminator Eyes' },
    { name: 'Squinty Eyes', value: 'Squinty Eyes' },
    { name: 'Shades', value: 'Shades' },
    { name: 'Groucho', value: 'Groucho' },
    { name: 'Pink Glasses', value: 'Pink Glasses' },
    { name: 'X Eyes', value: 'X Eyes' },
    { name: 'Scuba Mask', value: 'Scuba Mask' },
    { name: 'Cyclops', value: 'Cyclops' },
    { name: 'Laser Eyes', value: 'Laser Eyes' }
]

const hats = [
    { name: 'Default', value: null },
    { name: 'Bun', value: 'Bun' },
    { name: 'Sombrero', value: 'Sombrero' },
    { name: 'Cowboy Hat', value: 'Cowboy Hat' },
    { name: 'Headphones', value: 'Headphones' },
    { name: 'Yellow Hardhat', value: 'Yellow Hardhat' },
    { name: 'Halo', value: 'Halo' },
    { name: 'Police Hat', value: 'Police Hat' },
    { name: 'Rice Hat', value: 'Rice Hat' },
    { name: 'Bandana', value: 'Bandana' },
    { name: 'Baseball Cap', value: 'Baseball Cap' },
    { name: 'Top Hat', value: 'Top Hat' },
    { name: 'Rasta Hat', value: 'Rasta Hat' },
    { name: 'Hot Dog', value: 'Hot Dog' },
    { name: 'Bucket Hat', value: 'Bucket Hat' },
    { name: 'Propeller Hat', value: 'Propeller Hat' },
    { name: 'Durag', value: 'Durag' },
    { name: 'Space Helmet', value: 'Space Helmet' },
    { name: 'Fez', value: 'Fez' },
    { name: 'Brain', value: 'Brain' },
    { name: 'Bunny Ears', value: 'Bunny Ears' },
    { name: 'Egg', value: 'Egg' },
    { name: 'Axe', value: 'Axe' },
    { name: 'Horns', value: 'Horns' }
]

const outfits = [
    { name: 'Default', value: null },
    { name: 'DUPREME Shirt', value: 'DUPREME Shirt' },
    { name: 'Camo Shirt', value: 'Camo Shirt' },
    { name: 'DCDC Shirt', value: 'DCDC Shirt' },
    { name: 'Floatie', value: 'Floatie' },
    { name: 'Pepe Shirt', value: 'Pepe Shirt' },
    { name: 'Gradient Shirt', value: 'Gradient Shirt' },
    { name: 'DF1 Red', value: 'DF1 Red' },
    { name: 'Yellow Hoodie', value: 'Yellow Hoodie' },
    { name: 'Footie Jersey', value: 'Footie Jersey' },
    { name: 'Striped Hoodie', value: 'Striped Hoodie' },
    { name: 'Striped Hoodie Red', value: 'Striped Hoodie Red' },
    { name: 'Spiked Choker', value: 'Spiked Choker' },
    { name: 'Flower Lei', value: 'Flower Lei' },
    { name: 'Purple Camo', value: 'Purple Camo' },
    { name: 'Tie', value: 'Tie' },
    { name: 'Hawaiian Shirt', value: 'Hawaiian Shirt' },
    { name: 'DF1 Purple', value: 'DF1 Purple' },
    { name: 'Zebra Deezys', value: 'Zebra Deezys' },
    { name: 'Cape', value: 'Cape' },
    { name: 'Red Pondberry Scarf', value: 'Red Pondberry Scarf' },
    { name: 'Frankenstein Bolts', value: 'Frankenstein Bolts' },
    { name: 'Black Deezys', value: 'Black Deezys' },
    { name: 'DF1 White', value: 'DF1 White' },
    { name: 'Beige Deezys', value: 'Beige Deezys' },
    { name: 'Gold Chain', value: 'Gold Chain' },
    { name: 'Pondberry Scarf', value: 'Pondberry Scarf' }
]

const backgrounds = [
    { name: 'Default', value: null },
    { name: 'Peach', value: 'Peach' },
    { name: 'Pink', value: 'Pink' },
    { name: 'Orange', value: 'Orange' },
    { name: 'Teal', value: 'Teal' },
    { name: 'Blue', value: 'Blue' },
    { name: 'Lilac', value: 'Lilac' },
    { name: 'Beige', value: 'Beige' },
    { name: 'Lime', value: 'Lime' }
]

const sorts = [
    {
      name: 'Newest ducks',
      value: { sortBy: 'ID', order: 'desc' }
    },
    {
      name: 'Oldest ducks',
      value: { sortBy: 'ID', order: 'asc' }
    },
    {
      name: 'Rarity - High to Low',
      value: { sortBy: 'overallRarity', order: 'desc' }
    },
    {
      name: 'Rarity - Low to High',
      value: { sortBy: 'overallRarity', order: 'asc' }
    },
    {
      name: 'Rarest base',
      value: { sortBy: 'BaseRarity', order: 'asc' }
    },
    {
      name: 'Rarest beak',
      value: { sortBy: 'BeakRarity', order: 'asc' }
    },
    {
      name: 'Rarest eyes',
      value: { sortBy: 'EyesRarity', order: 'asc' }
    },
    {
      name: 'Rarest hats',
      value: { sortBy: 'HatRarity', order: 'asc' }
    },
    {
      name: 'Rarest outfit',
      value: { sortBy: 'OutfitRarity', order: 'asc' }
    }
  ]

export default {
    bases,
    beaks,
    eyes,
    hats,
    outfits,
    backgrounds,
    sorts
}
