export async function GET(request) {
  const news = [
    {
      id: 1,
      title: 'Article Title 1',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 2,
      title: 'Article Title 2',
      content:
        'Cras ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta.',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 3,
      title: 'Article Title 3',
      content:
        'Pellentesque in ipsum id orci porta dapibus. Curabitur aliquet quam id dui posuere blandit.',
      image: 'https://via.placeholder.com/100',
    },
  ];
  return new Response(JSON.stringify(news), {
    headers: { 'Content-Type': 'application/json' },
  });
}
