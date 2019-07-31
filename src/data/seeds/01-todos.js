
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('todos').insert([
    {
      user_id: 1,
      title: 'Once in a while routine',
      description: 'Lorem ipsum dolor sit amet, et sapientem gloriatur adversarium sit, affert ignota oblique vim ei, vel at mutat graecis. Cum debet officiis apeirian eu, et posse nullam essent eos, ei molestie deserunt quo. '
    },
    {
      user_id: 1,
      title: 'My daily routine',
      description: 'Vis ad maluisset reformidans, eum ne dolorum interpretaris. Nec mucius expetenda salutatus in, ex eligendi delicata mnesarchum cum, mei indoctum necessitatibus ea.',
      scheduled_at: '2019-08-07T07:07:07.357Z',
      repeat: 'daily'
    },
    {
      user_id: 1,
      title: 'My Weekly routine',
      description: 'Per prima solum delectus ad, omnis insolens maiestatis his ne, his et ipsum impetus blandit.',
      scheduled_at: '2019-08-17T07:07:07.357Z',
      repeat: 'weekly'
    },
    {
      user_id: 1,
      title: 'My monthly routine',
      description: 'Reque tacimates dissentias vix ei, delectus antiopam salutandi has eu. Fugit epicuri pri in, facer clita civibus mei an.',
      scheduled_at: '2019-08-27T07:07:07.357Z',
      repeat: 'monthly'
    },
    {
      user_id: 2,
      title: 'Once in a while super routine'
    },
    {
      user_id: 2,
      title: 'Daily routine',
      description: 'Duo solet recusabo ad. Ignota putant deterruisset no eum, modo modus veritus eum ad, partem dissentiet ex qui.',
      scheduled_at: '2019-08-07T07:07:07.357Z',
      repeat: 'daily'
    },
    {
      user_id: 2,
      title: 'Weekly routine',
      description: 'Per te enim posidonium instructior, sed ei esse ceteros eligendi, prima definiebas inciderint id eam.',
      scheduled_at: '2019-08-17T07:07:07.357Z',
      repeat: 'weekly'
    },
    {
      user_id: 2,
      title: 'Monthly routine',
      description: 'Ei ius sapientem facilisis. Mei et solum choro. Nec adhuc tempor sadipscing id, sit et nusquam forensibus mediocritatem, in his sumo vocibus liberavisse.',
      scheduled_at: '2019-08-27T07:07:07.357Z',
      repeat: 'monthly'
    },
    {
      user_id: 3,
      title: 'Once in a while routine',
      description: 'Cum no nullam copiosae. Ut veri doctus meliore duo, nihil possim repudiandae his at. Vis elit civibus probatus ex.'
    },
    {
      user_id: 3,
      title: 'My daily routine',
      description: 'Ut quo adhuc saperet definiebas, equidem petentium similique ei vim, qui ea error probatus definitionem. Admodum corpora constituam eu ius. Verear latine utroque ea quo, an est dicunt qualisque.',
      scheduled_at: '2019-08-07T07:07:07.357Z',
      repeat: 'daily'
    },
    {
      user_id: 3,
      title: 'My Weekly routine',
      description: 'Vero magna probatus nec eu, no mel meis fugit, mei cu nullam ceteros maluisset. Id stet altera pri, qui et graecis prodesset.',
      scheduled_at: '2019-08-17T07:07:07.357Z',
      repeat: 'weekly'
    },
    {
      user_id: 3,
      title: 'My monthly routine',
      description: 'In semper vocent euripidis has, te vel quis aperiri iuvaret. Ei veniam recusabo pertinacia vix, epicuri expetendis dissentias vel an, alienum deseruisse sea ne.',
      scheduled_at: '2019-08-27T07:07:07.357Z',
      repeat: 'monthly'
    },
    {
      user_id: 4,
      title: 'My Once in a while routine'
    },
    {
      user_id: 4,
      title: 'Daily routine',
      description: 'Cetero corpora pri ad, duo in tation accusamus quaerendum, integre tractatos et usu. Mollis maiorum assentior duo in.',
      scheduled_at: '2019-08-07T07:07:07.357Z',
      repeat: 'daily'
    },
    {
      user_id: 4,
      title: 'Weekly routine',
      description: 'Id usu discere detraxit referrentur. Natum oportere posidonium duo id. In pro meis noluisse omittantur, quis lucilius deserunt cu eum.',
      scheduled_at: '2019-08-17T07:07:07.357Z',
      repeat: 'weekly'
    },
    {
      user_id: 4,
      title: 'Monthly routine',
      description: 'Id usu discere detraxit referrentur. Natum oportere posidonium duo id. In pro meis noluisse omittantur, quis lucilius deserunt cu eum.',
      scheduled_at: '2019-08-27T07:07:07.357Z',
      repeat: 'monthly'
    }
  ]);
};
