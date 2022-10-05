import useObjects from "hooks/useObjects";
import ObjectTile from "components/ObjectTile";
import LoadingSpinner from "components/LoadingSpinner";

const ObjectList = () => {
  const {
    nextPage,
    initialLoading,
    isLoading,
    objectDictionary,
    validObjectIds,
  } = useObjects();

  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">Museum Objects</h2>

      {!initialLoading && objectDictionary && (
        <div className="grid grid-cols-1 gap-y-20 gap-x-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {validObjectIds.map((museumObjectId) => (
            <ObjectTile museumObject={objectDictionary[museumObjectId]} />
          ))}
        </div>
      )}

      {(initialLoading || isLoading) && (
        <div className="mt-12 flex justify-center items-center flex-col">
          <LoadingSpinner />

          {initialLoading && (
            <h4 className="font-semibold mt-3">
              Hang on! It takes some time on the first load.
            </h4>
          )}
        </div>
      )}
    </div>
  );
};

export default ObjectList;
