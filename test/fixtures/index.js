export const postsFixture = [
  {
    id: 1,
    content: "The way I see it, every life is a pile of good things and bad things...",
    authorId: 5,
    timestamp: "2020-11-09T10:21:04.012Z"
  },
  {
    id: 2,
    content: "Cosmic ocean rich in mystery vastness is bearable only through love shores of the cosmic ocean vastness is bearable only through love stirred by starlight",
    authorId: 1,
    timestamp: "2020-11-09T10:24:04.352Z"
  },
  {
    id: 3,
    content: "Preserve and cherish that pale blue dot Euclid take root and flourish hydrogen atoms something incredible is waiting to be known invent the universe",
    authorId: 4,
    timestamp: "2020-11-09T12:01:24.099Z"
  },
  {
    id: 4,
    content: "Extraordinary claims require extraordinary evidence.",
    authorId: 3,
    timestamp: "2020-11-09T12:12:14.064Z"
  },
  {
    id: 5,
    content: "Astonishment Tunguska event network of wormholes the ash of stellar alchemy the sky calls to us hundreds of thousands.",
    authorId: 2,
    timestamp: "2020-11-09T12:21:04.182Z"
  },
];

export const postFixture = postsFixture[0];

export const usersFixture = [
  { id: 1, name: 'Bruce Wayne', following: [3,5] },
  { id: 2, name: 'Susan Storm', following: [1,3] },
  { id: 3, name: 'Peter Parker', following: [2,4,5] },
  { id: 4, name: 'Tony Stark', following: [2,3] },
  { id: 5, name: 'Ororo Munroe', following: [1,2] },
];

export const userFixture = usersFixture[0];
