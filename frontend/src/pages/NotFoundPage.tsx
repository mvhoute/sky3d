export const NotFoundPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Pagina niet gevonden</h2>
      <p className="text-gray-600 mb-8">
        De pagina die u zoekt bestaat niet of is verplaatst.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="/"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Naar Homepage
        </a>
        <a
          href="/producten"
          className="inline-block bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          Bekijk Producten
        </a>
      </div>
    </div>
  );
};

