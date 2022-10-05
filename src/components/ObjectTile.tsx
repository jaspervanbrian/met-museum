const ObjectTile = ({ museumObject }: any) => {
  if (!museumObject) return null;

  return (
    <a href={museumObject.href} className="group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <img
          src={museumObject.primaryImage}
          alt={museumObject.title}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
    </a>
  );
};

export default ObjectTile;
