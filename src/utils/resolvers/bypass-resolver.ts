const bypass = (key: string, data: any) => {
  const resolveArticles = ["/new", "/relevant", "/search"].includes(data);
  return {
    apiResolveArticles: resolveArticles,
    resolveArticles: resolveArticles,
  }[key];
};

export default bypass;
