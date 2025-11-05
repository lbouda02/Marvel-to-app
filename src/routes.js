import AboutPage from './pages/AboutPage';
import CharactersPage from './pages/CharactersPage';
import ContactPage from './pages/ContactPage';
import Layout from './Layout';
import NotFoundPage from './pages/NotFoundPage';
import { getCharacterById, getCharacters } from './api/characters-api';
import CharacterDetailPage from './pages/CharacterDetailPage';

// routes of the application
const routes = [
  {
    path: "/",
    Component: Layout,
    children: [
      {
        // main page
        index: true,
        loader: async ({ request }) => {
          const url = new URL(request.url);
          const sort = url.searchParams.get('sort') || 'name';
          const order = url.searchParams.get('order') || 'asc';

          return {
            characters: await getCharacters({ sort, order }),
            sort,
            order
          };
        },
        Component: CharactersPage
      },
      {
          path: "/characters/:id",
          Component: CharacterDetailPage,
          loader: ({ params }) => {
            return getCharacterById(params.id);
          }
      },
      {
        // about page
        path: "/about",
        Component: AboutPage
      },
      {
        // contact page
        path: "/contact",
        Component: ContactPage
      },
      {
        // 404 page
        path: "*",
        Component: NotFoundPage
      }
    ],
  },
]

export default routes;