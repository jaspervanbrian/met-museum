const Cache = () => {
  const setFromCache = (
    key: string,
    value: any,
    options: Record<string, any> = {}
  ) => {
    if (options?.ttl) {
      value = {
        value: value,
        expiry: new Date().getTime + options.ttl,
      };
    }

    localStorage.setItem(key, JSON.stringify(value));
  };

  const getFromCache = (key: string) => {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const parsedItem = JSON.parse(item);

    if (parsedItem?.expiry) {
      if (new Date().getTime() > parsedItem.expiry) {
        removeFromCache(key);
        return null;
      } else {
        return parsedItem.value;
      }
    }

    return parsedItem;
  };

  const removeFromCache = (key: string) => {
    localStorage.removeItem(key);
  };

  const clearCache = () => localStorage.clear();

  return {
    setFromCache,
    getFromCache,
    removeFromCache,
    clearCache,
  };
};

export default Cache;
