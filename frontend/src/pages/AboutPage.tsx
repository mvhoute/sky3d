export const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Over Sky3D</h1>

      <div className="max-w-3xl">
        <div className="prose prose-lg">
          <p className="text-lg text-gray-700 mb-6">
            Sky3D is een hobbyproject waar ik mijn passie voor 3D printen deel met anderen.
            Wat begon als experimenteren met mijn eerste printer is uitgegroeid tot een leuke
            manier om creatieve ideeën tot leven te brengen.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Hoe het werkt</h2>
          <p className="text-gray-700 mb-6">
            Ik print voornamelijk in mijn vrije tijd. Heb je iets leuks gezien in de collectie
            of wil je je eigen ontwerp laten printen? Stuur me dan een berichtje via het
            contactformulier. We maken dan samen afspraken over prijs en levertijd.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Wat kan ik printen?</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Decoratieve items en figuurtjes</li>
            <li>Functionele onderdelen en houders</li>
            <li>Eigen ontwerpen (STL/3MF bestanden)</li>
            <li>Prototypes en proefstukken</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p className="text-gray-700 mb-2">
            Vragen of ideeën? Neem gerust contact op:
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong>{' '}
            <a href="mailto:info@sky3d.nl" className="text-blue-600 hover:underline">
              info@sky3d.nl
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

