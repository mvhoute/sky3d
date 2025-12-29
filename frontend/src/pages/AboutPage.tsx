export const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Over Ons</h1>

      <div className="max-w-3xl">
        <div className="prose prose-lg">
          <p className="text-lg text-gray-700 mb-6">
            Welkom bij Sky3D! Wij zijn gespecialiseerd in hoogwaardige 3D prints
            voor particulieren en bedrijven. Met onze moderne 3D printtechnologie
            brengen we uw ideeën tot leven.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Onze Missie</h2>
          <p className="text-gray-700 mb-6">
            Wij geloven in de kracht van 3D printing om unieke en op maat gemaakte
            producten te creëren. Of het nu gaat om prototypes, decoratieve items,
            of functionele onderdelen - wij leveren kwaliteit waar u op kunt vertrouwen.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Waarom Sky3D?</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Professionele 3D printtechnologie</li>
            <li>Snelle levertijden</li>
            <li>Persoonlijke service</li>
            <li>Concurrerende prijzen</li>
            <li>Uitstekende kwaliteit</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p className="text-gray-700 mb-2">
            Heeft u vragen of wilt u meer informatie? Neem gerust contact met ons op:
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

